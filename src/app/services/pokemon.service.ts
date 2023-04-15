import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemonList } from '../interfaces/IPokemon';
import { Observable } from 'rxjs';

const API_URL: string = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<IPokemonList> {
    return this.http.get<IPokemonList>(`${ API_URL }/pokemon`);
  }
}
