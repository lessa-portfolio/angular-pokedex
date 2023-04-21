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
  private readonly API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  count$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  public getPokemonList(offset = 0, limit = 12): Observable<IPokemonView> {
    return this.http.get<IPokemonListResponse>(`${ this.API_URL }?offset=${ offset }&limit=${ limit }`)
      .pipe(
        tap(value => this.count$.next(value.count)),
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

  public getCount(): Observable<number> {
    return this.count$.asObservable();
  }
}
