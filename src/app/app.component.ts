import { IPokemonInfo } from './interfaces/IPokemon';
import { PokemonService } from './services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pokemonList: IPokemonInfo[]; // oficial

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: pokemons => {
        this.pokemonList = [];
        pokemons.forEach(pokemon => this.getPokemonInfo(pokemon.url));
      },
    });
  }

  getPokemonInfo(url: string): void {
    this.pokemonService.getPokemonInfo(url).subscribe({
      next: pokemon => this.pokemonList.push(pokemon),
      complete: () => console.log(this.pokemonList),
    });
  }
}
