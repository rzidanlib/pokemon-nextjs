"use client";

import Navbar from "@/components/component/Navbar";
import { Pokemon } from "@/models/pokemon";
import { getPokemon } from "@/services/pokemon";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export default function PokemonPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsType, setPokemonsType] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [colors, setColors] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const offset = (page - 1) * limit;
    const fetchData = async () => {
      try {
        const pokemonData = await getPokemon(limit, offset);
        setPokemons(pokemonData);
      } catch (error) {
        console.log("Error fetching Pokémon data");
      }
    };

    fetchData();
  }, [page, limit]);

  useEffect(() => {
    const urlPage = searchParams.get("page");

    setPage(Number(urlPage));
    // console.log(urlPage);
  }, [searchParams]);

  const handlePagePagination = (increment) => {
    const newPage = page + increment;
    router.push(`/pokemon?page=${newPage}`, { shallow: true });
  };

  const getColors = (detectedColorCodes: string[]) => {
    if (detectedColorCodes && detectedColorCodes.length > 0) {
      setColors(detectedColorCodes[0]);
    }
  };

  // console.log(colors);

  return (
    <div className="px-[110px]">
      <Navbar />

      <h1>Pokemon page</h1>

      <div className="grid grid-cols-[30%_70%]">
        <div className="pr-16">
          <div className="border-2 border-blue-500 rounded-md p-3">
            <p className="text-lg">Category </p>
          </div>

          <div className="bg-gray-200 pl-3 py-2 mt-1">
            <p className="text-md">Fire</p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            {pokemons.length > 0 ? (
              pokemons.map((pokemon, index) => (
                <Link
                  href={`/pokemon/detail/${pokemon.id}`}
                  key={pokemon.id}
                  className={`border-2 border-blue-500 rounded-md p-2 hover:shadow-md`}
                  style={
                    {
                      // backgroundColor: colors,
                    }
                  }
                >
                  <div className="flex justify-center items-center">
                    <ColorExtractor getColors={getColors}>
                      <img
                        src={pokemon.image}
                        alt="pokeball"
                        className="h-32 "
                      />
                    </ColorExtractor>
                  </div>
                  <div className="m-2">
                    <p className="text-xl font-bold mb-3">
                      {pokemon.name.toUpperCase()}
                    </p>
                    {pokemon.types?.map((type: any) => (
                      <span
                        key={type}
                        className="text-sm px-6 py-1 bg-green-500 text-white rounded-2xl mr-2"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </Link>
              ))
            ) : (
              <h1>Data Kosong</h1>
            )}
          </div>

          <div className="flex flex-col items-center my-5">
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => handlePagePagination(-1)}
                disabled={page === 1}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s "
              >
                Prev
              </button>
              <button
                onClick={() => handlePagePagination(1)}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
