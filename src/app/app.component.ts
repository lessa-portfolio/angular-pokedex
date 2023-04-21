import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationService } from './services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public dropdownState: boolean = false;

  public numberOfPages: number;
  public currentPage: number;
  public offset: number;
  public limit: number;
  public count: number;
  public pokemonList: any[];

  private subs: Subscription[] = [];

  constructor(private paginationService: PaginationService) { }

  public ngOnInit(): void {
    this.subs.push(this.paginationService.getCount().subscribe(count => this.count = count));
    this.subs.push(this.paginationService.getLimit().subscribe(limit => this.limit = limit));
    this.subs.push(this.paginationService.getOffset().subscribe(offset => this.offset = offset));
    this.subs.push(this.paginationService.getCurrentPage().subscribe(currentPage => this.currentPage = currentPage));
    this.subs.push(this.paginationService.getNumberOfPages().subscribe(numberOfPages => this.numberOfPages = numberOfPages));
    this.subs.push(this.paginationService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList));

    this.debug();
  }

  public updateOffset(value: number): void {
    this.paginationService.setOffset(value * this.limit);
    this.debug();
  }

  public updateLimit(value: number): void {
    this.paginationService.setLimit(value);
    this.toggleDropdownState();
    this.debug();
  }

  public toggleDropdownState(): void {
    this.dropdownState = !this.dropdownState;
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  private debug(): void {
    console.log('numberOfPages: ', this.numberOfPages);
    console.log('currentPage: ', this.currentPage);
    console.log('offset: ', this.offset);
    console.log('limit: ', this.limit);
    console.log('count: ', this.count);
  }
}
