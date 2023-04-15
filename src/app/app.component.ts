import { IPokemon } from './interfaces/IPokemon';
import { PokemonService } from './services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pokemons: IPokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemonList().subscribe(pokemonsList => {
      this.pokemons = pokemonsList.results
    });
  }
}
