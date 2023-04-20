import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, mergeMap, from, BehaviorSubject, of } from 'rxjs';
import { IPokemonListResponse } from '../interfaces/IPokeapi';
import { IPokemonList } from '../interfaces/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  count$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getPokemonList(offset = 0, limit = 12): Observable<any> {
    return this.http.get<IPokemonListResponse>(`${ this.API_URL }?offset=${ offset }&limit=${ limit }`)
      .pipe(
        tap(value => this.count$.next(value.count)),
        map(value => value.results),
        map(value => from(value).pipe(
          mergeMap(pokemon => this.http.get(pokemon.url))
        )),
        mergeMap(value => value),
      )
  }

  getPokemonInfo(url: string): Observable<any> {
    return this.http.get<any>(url)
    // .pipe(
    //   tap(pokemon => console.log(pokemon)),
    //   map(pokemonInfoRaw => pokemonInfoRawToPokemonInfo(pokemonInfoRaw, url)),
    //   tap(pokemon => console.log(pokemon)),
    // )
  }
}
