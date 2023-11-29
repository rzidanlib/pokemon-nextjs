export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  weight: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}
