import { IPokemonInfo, IPokemonInfoRaw } from './../interfaces/IPokemon';

export function pokemonInfoRawToPokemonInfo(pokemonInfoRaw: IPokemonInfoRaw): IPokemonInfo {
  let types: string[] = [];

  pokemonInfoRaw.types.forEach(type => types.push(type.type.name));

  return {
    id: pokemonInfoRaw.id,
    name: pokemonInfoRaw.name,
    height: pokemonInfoRaw.height,
    weight: pokemonInfoRaw.weight,
    urlImage: pokemonInfoRaw.sprites.other.dream_world.front_default,
    types,
  }
}
