import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pokemonList$ = new BehaviorSubject<any[]>([]);
  offset$ = new BehaviorSubject<number>(0);
  limit$ = new BehaviorSubject<number>(12);
  count$ = new BehaviorSubject<number>(0);

  constructor(private pokemonService: PokemonService) {
    this.getPokemons();
  }

  private getPokemons() {
    this.pokemonService.getPokemonList(this.offset$.value, this.limit$.value).subscribe({
      next: pokemon => {
        this.pokemonList$.value[pokemon.id - this.offset$.value - 1] = {
          urlImage: pokemon.sprites.other.dream_world.front_default,
          number: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((t: any) => t.type.name),
        }
      },
      complete: () => {
        while(this.pokemonList$.value.length > this.limit$.value)
          this.pokemonList$.value.pop();
      }
    });
  }

  public setOffset(newOffset: number) {
    this.offset$.next(newOffset);
    this.getPokemons();
  }

  public getOffset(): Observable<number> {
    return this.offset$.asObservable();
  }

  public setLimit(newlimit: number) {
    this.limit$.next(newlimit);
    this.getPokemons();
  }

  public getLimit(): Observable<number> {
    return this.limit$.asObservable();
  }

  public getPokemonList(): Observable<any> {
    return this.pokemonList$.asObservable();
  }

  public getCount(): Observable<any> {
    return this.count$.asObservable();
  }
}