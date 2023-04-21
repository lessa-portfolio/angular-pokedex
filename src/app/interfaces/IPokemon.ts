export interface IPokemonList {
  count:    number;
  next:     string;
  previous: string;
  results:  IPokemonInfo[];
}

export interface IPokemonView {
  id:         number;
  name:       string;
  urlImage:   string;
  types:      string[];
}

export interface IPokemonInfo {
  id:         number;
  url:        string;
  name:       string;
  height:     number;
  weight:     number;
  urlImage:   string;
  types:      string[];

  hp?:        string;
  attack?:    string;
  defense?:   string;
  spAttack?:  string;
  spDefense?: string;
  speed?:     string;
}
