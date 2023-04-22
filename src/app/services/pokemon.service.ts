import { Observable, tap, map, mergeMap, from, BehaviorSubject } from 'rxjs';
import { IPokemonListResponse, IPokemonResponse } from '../interfaces/IPokeapi';
import { pokemonInfoRawToPokemonView } from '../shared/pokemonInfoRawToPokemonInfo';
import { IPokemonView } from './../interfaces/IPokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly count: number = 1010;
  private readonly API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  public getPokemonList(offset = 0, limit = 12): Observable<IPokemonView> {

    if (offset + limit > this.count) limit = this.count - offset;

    return this.http.get<IPokemonListResponse>(`${ this.API_URL }?offset=${ offset }&limit=${ limit }`).pipe(
      map(value => value.results),
      map(value => from(value).pipe(
        mergeMap(pokemon => this.getPokemonInfo(pokemon.url))
      )),
      mergeMap(value => value),
    )
  }

  public getPokemonInfo(url: string): Observable<IPokemonView> {
    return this.http.get<IPokemonResponse>(url).pipe(
      map((pokemonInfoRaw: IPokemonResponse): IPokemonView => pokemonInfoRawToPokemonView(pokemonInfoRaw)),
    );
  }

  public getCount(): number {
    return this.count;
  }
}
