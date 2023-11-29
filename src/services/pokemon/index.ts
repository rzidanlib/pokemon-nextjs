import { Pokemon, PokemonDetail } from "@/models/pokemon";
import axios from "axios";

const pokeApi = process.env.NEXT_PUBLIC_POKE_API_URL;

export const getPokemon = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `${pokeApi}/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonData = await Promise.all(
      response.data.results.map(async (result: any) => {
        const detailsResponse = await axios.get(result.url);
        const pokemon: Pokemon = {
          id: detailsResponse.data.id,
          name: detailsResponse.data.name,
          image: detailsResponse.data.sprites.front_default,
          types: detailsResponse.data.types.map((type: any) => type.type.name),
        };
        return pokemon;
      })
    );
    return pokemonData;
  } catch (error) {
    throw new Error("Error fetching Pokémon data");
  }
};

export const getDetailPokemon = async (
  id: number
): Promise<PokemonDetail | {}> => {
  try {
    const response = await axios.get(`${pokeApi}/pokemon/${id}`);
    const data = await response.data;

    const pokemonData: any = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      image: data.sprites.front_default,
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      types: data.types.map((type: any) => type.type.name),
    };

    return pokemonData;
  } catch (error) {
    console.log("Error fetching data....", error);
    return {};
  }
};
