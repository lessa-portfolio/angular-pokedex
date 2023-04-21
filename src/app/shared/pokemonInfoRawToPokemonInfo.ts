import { IPokemonResponse, Type } from '../interfaces/IPokeapi';
import { IPokemonInfo, IPokemonView } from './../interfaces/IPokemon';

export function pokemonInfoRawToPokemonInfo(pokemonInfoRaw: IPokemonResponse, url: string): IPokemonInfo {
  return {
    id: pokemonInfoRaw.id,
    name: pokemonInfoRaw.name,
    height: pokemonInfoRaw.height,
    weight: pokemonInfoRaw.weight,
    urlImage: pokemonInfoRaw.sprites.other?.dream_world.front_default || '',
    types: getPokemonTypes(pokemonInfoRaw.types),
    url,
  }
}

export function pokemonInfoRawToPokemonView(pokemonInfoRaw: IPokemonResponse): IPokemonView {
  return {
    id: pokemonInfoRaw.id,
    name: pokemonInfoRaw.name,
    urlImage: pokemonInfoRaw.sprites.other?.dream_world.front_default || '',
    types: getPokemonTypes(pokemonInfoRaw.types),
  }
}

function getPokemonTypes(pokemonTypes: Type[]): string[] {
  let types: string[] = [];

  pokemonTypes.forEach(type => types.push(type.type.name))

  return types;
}
