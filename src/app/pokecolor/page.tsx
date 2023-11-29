"use client";

import PokemonCard from "./PokemonCard";

export default function PokeColor() {
  const pokemonData = [
    {
      name: "Pikachu",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pikachu.svg/250px-Pikachu.svg.png",
      type: "Electric",
    },
    {
      name: "Charmander",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Charmander.png/250px-Charmander.png",
      type: "Fire",
    },
    {
      name: "Bulbasaur",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bulbasaur.png/250px-Bulbasaur.png",
      type: "Grass",
    },
  ];

  return (
    <div>
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
