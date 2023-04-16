import { IPokemon, IPokemonInfo, IPokemonInfoRaw, IPokemonListRaw } from './../interfaces/IPokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { pokemonInfoRawToPokemonInfo } from '../shared/pokemonInfoRawToPokemonInfo';

const API_URL: string = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(offset = 0, limit = 20): Observable<IPokemon[]> {
    return this.http.get<IPokemonListRaw>(`${ API_URL }/pokemon?offset=${ offset }&limit=${ limit }`)
    .pipe(
      tap(a => console.log(a)),
      map(a => a.results),
      tap(a => console.log(a)),
    )
  }

  getPokemonInfo(url: string): Observable<any> {
    return this.http.get<IPokemonInfoRaw>(url)
    .pipe(
      tap(pokemon => console.log(pokemon)),
      map(pokemonInfoRaw => pokemonInfoRawToPokemonInfo(pokemonInfoRaw)),
      tap(pokemon => console.log(pokemon)),
    )
  }
}
