export interface IPokemonList {
  count: number;
  next: string;
  preview: string;
  results: IPokemonInfo[];
}

export interface IPokemonInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  urlImage: string;
  types: string[];

  hp?: string;
  attack?: string;
  defense?: string;
  spAttack?: string;
  spDefense?: string;
  speed?: string;
}

export interface IPokemonListRaw {
  count: number;
  next: string;
  preview: string;
  results: IPokemon[];
}

export interface IPokemonInfoRaw {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      }
    }
  },
  types: {
    slot: number;
    type: {
      name: string;
      url: string
    };
  }[];
}

export interface IPokemon {
  name: string;
  url: string
}
