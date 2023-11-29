"use client";
import React, { useState, useEffect } from "react";
import ColorExtractor from "react-color-extractor";

export default function PokemonCard({ pokemon }) {
  const [dominantColor, setDominantColor] = useState("");

  useEffect(() => {
    const extractColor = async () => {
      const color = await ColorExtractor.extractColors(pokemon.imageUrl, {
        maxColors: 1,
      });
      setDominantColor(color[0]);
    };

    extractColor();
  }, [pokemon]);

  return (
    <div style={{ backgroundColor: dominantColor }}>
      <h2>{pokemon.name}</h2>
      <p>{pokemon.type}</p>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
    </div>
  );
}
