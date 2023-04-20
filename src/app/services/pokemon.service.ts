import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, mergeMap, from } from 'rxjs';
import { IPokemonListResponse } from '../interfaces/IPokeapi';
import { IPokemonList } from '../interfaces/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  pokemonList$: Observable<IPokemonList>;

  constructor(private http: HttpClient) { }

  getPokemonList(offset = 0, limit = 12): Observable<any> {
    return this.http.get<IPokemonListResponse>(`${ this.API_URL }?offset=${ offset }&limit=${ limit }`)
      .pipe(
        map(value => value.results),
        map(value => from(value).pipe(
          mergeMap(pokemon => this.http.get(pokemon.url))
        )),
        mergeMap(value => value),
      )

    // tap(pokemonList =>  this.pokemonList$ = pokemonList),
    // map(pokemonList => pokemonList.results),
    // tap(results => console.log(results)),
    // map((results: any[]) => {
    //   return from(results).pipe(
    //     mergeMap((v: any) => this.http.get(v.url)),
    //   );
    // }),
    // mergeMap(value => value),
    // tap(results => console.log(results)),
    // map(value => {
    //   return { ...this.pokemonList$, results: value }
    // }),
    // tap(results => console.log(results)),


    // mergeMap((pokemonList: any[]) => {
    //   pokemonList.forEach(element => {
    //     map
    //   });
    // })
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

  // .pipe(
  //   tap(value => console.log(value)),
  //   tap(value => this.pokemonList$ = value),
  //   map(value => value.results),
  //   tap(value => console.log(value)),
  //   map(value => from(value)
  //     .pipe(
  //       tap(value => console.log(value)),
  //       mergeMap((v: any) => this.http.get(v.url).subscribe(a => {
  //         a.
  //       })),
  //       tap(value => console.log(value)),
  //     )
  //     ),
  //     // mergeMap(value => value),
  //   tap(value => console.log(value)),
  //   tap(value => console.log(this.pokemonList$)),
  // )
  // .subscribe((result: any) => this.pokemons[result.id] = {
  //   image: result.sprites.front_default,
  //   number: result.id,
  //   name: result.name,
  //   types: result.types.map(t => t.type.name),
  // });
// return this.http.get<IPokemonListResponse>(`${ this.API_URL }/pokemon?offset=${ offset }&limit=${ limit }`)
// .pipe(
//   tap(pokemonList => console.log(pokemonList)),
//   map(pokemonList => {

//     return {
//       ...pokemonList.,
//       count: 0
//     }
//   }),
//   // map(pokemonList => pokemonList.results),
//   tap(pokemonList => console.log(pokemonList)),
// )
