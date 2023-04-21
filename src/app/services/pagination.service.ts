import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pokemonList$ = new BehaviorSubject<any[]>([]);
  numberOfPages$ = new BehaviorSubject<number>(0);
  currentPage$ = new BehaviorSubject<number>(0);
  offset$ = new BehaviorSubject<number>(0);
  limit$ = new BehaviorSubject<number>(12);

  count: number = 0;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getCount().subscribe(count => this.count = count);
    this.getPokemons();
  }

  private getPokemons() {
    this.pokemonService.getPokemonList(this.offset$.value, this.limit$.value)
    .subscribe({
      next: (pokemon: any) => this.pokemonList$.value[pokemon.id - this.offset$.value - 1] = pokemon,
      complete: () => {
        while(this.pokemonList$.value.length > this.limit$.value)
          this.pokemonList$.value.pop();
      }
    });
  }

  // sets
  public setOffset(newOffset: number): void {
    this.offset$.next(newOffset);
    this.updateCurrentPage(newOffset, this.limit$.getValue());
    this.updateNumberOfPages(this.count, this.limit$.value);
    this.getPokemons();
  }

  public setLimit(newlimit: number): void {
    this.limit$.next(newlimit);
    this.updateNumberOfPages(this.count, newlimit);
    this.getPokemons();
  }

  //gets
  public getOffset(): Observable<number> {
    return this.offset$.asObservable();
  }

  public getLimit(): Observable<number> {
    return this.limit$.asObservable();
  }

  public getPokemonList(): Observable<any> {
    return this.pokemonList$.asObservable();
  }

  public getCount(): Observable<number> {
    return this.pokemonService.count$.asObservable();
  }

  public getCurrentPage(): Observable<number> {
    return this.currentPage$.asObservable();
  }

  public getNumberOfPages(): Observable<number> {
    return this.numberOfPages$.asObservable();
  }

  // methods
  private updateCurrentPage(offset: number, limit: number): void {
    this.currentPage$.next(Math.trunc(offset / limit));
  }

  private updateNumberOfPages(count: number, limit: number): void {
    this.numberOfPages$.next(Math.trunc(count / limit));
  }
}
