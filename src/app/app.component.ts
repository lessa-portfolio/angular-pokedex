import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dropdownState: boolean = false;

  pokemonList: any[];
  currentPage: number;
  amountPages: number;
  offset: number;
  limit: number;
  count: number;

  subs: Subscription[] = [];

  constructor(private paginationService: PaginationService) { }

  public ngOnInit(): void {
    this.subs.push(this.paginationService.getCount().subscribe(count => this.count = count));
    this.subs.push(this.paginationService.getLimit().subscribe(limit => this.limit = limit));
    this.subs.push(this.paginationService.getOffset().subscribe(offset => this.offset = offset));
    this.subs.push(this.paginationService.getCurrentPage().subscribe(currentPage => this.currentPage = currentPage));
    this.subs.push(this.paginationService.getAmountPages().subscribe(amountPages => this.amountPages = amountPages));
    this.subs.push(this.paginationService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList));
  }

  public updateOffset(value: number): void {
    this.paginationService.setOffset(value * this.limit);
  }

  public updateLimit(value: number): void {
    this.paginationService.setLimit(value);
    this.toggleDropdownState();
  }

  public toggleDropdownState(): void {
    this.dropdownState = !this.dropdownState;
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }
}
