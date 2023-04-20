export interface IPokemonList {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  IPokemonInfo[];
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
