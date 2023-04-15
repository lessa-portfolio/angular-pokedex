export interface IPokemonList {
  count: number;
  next: string;
  preview: string;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string
}

export interface IPokemonInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  urlImage: string;
  types: string[];

//   hp: string;
//   attack: string;
//   defense: string;
//   spAttack: string;
//   spDefense: string;
//   speed: string;
}
