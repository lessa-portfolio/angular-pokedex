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

  constructor(private pokemonService: PokemonService) {
    this.updateNumberOfPages(this.pokemonService.getCount(), this.limit$.value);
    this.getPokemons();
  }

  private getPokemons() {
    this.pokemonList$.next([]);
    this.pokemonService.getPokemonList(this.offset$.value, this.limit$.value).subscribe(pokemon => {
      this.pokemonList$.value[pokemon.id - this.offset$.value - 1] = pokemon;
    });
  }

  // sets
  public setOffset(newOffset: number): void {
    this.offset$.next(newOffset);
    this.updateNumberOfPages(this.pokemonService.getCount(), this.limit$.value);
    this.updateCurrentPage(newOffset, this.limit$.value);
    this.getPokemons();
  }

  public setLimit(newlimit: number): void {
    this.limit$.next(newlimit);
    this.updateNumberOfPages(this.pokemonService.getCount(), newlimit);
    this.updateCurrentPage(this.offset$.value, this.limit$.value);
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

  public getCount(): number {
    return this.pokemonService.getCount();
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
    this.numberOfPages$.next(Math.trunc(count / limit) + 1);
  }
}
