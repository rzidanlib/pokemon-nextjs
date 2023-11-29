"use client";

import { getDetailPokemon } from "@/services/pokemon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PokemonDetail } from "@/models/pokemon";
import { ColorExtractor } from "react-color-extractor";

import Navbar from "@/components/component/Navbar";

export default function PokemonDetailPage(props: any) {
  const { params } = props;
  const router = useRouter();
  const [colors, setColors] = useState("");

  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Partial<PokemonDetail>>({});

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const pokemonDetail = await getDetailPokemon(Number(params.id));
        setPokemon(pokemonDetail);
      } catch (error) {
        console.log(error);
      }
    };

    getPokemon();
  }, [params.id]);

  const getColors = (detectedColorCodes: string[]) => {
    if (detectedColorCodes && detectedColorCodes.length > 0) {
      setColors(detectedColorCodes[0]);
    }
  };

  return (
    <div className="px-[110px]">
      <Navbar />

      <div className="grid grid-cols-3 mt-10">
        <div className="p-5 rounded-sm shadow-sm border border-gray-200">
          <div
            className="flex justify-center items-center h-full"
            style={{ backgroundColor: colors }}
          >
            <ColorExtractor getColors={getColors}>
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </ColorExtractor>
          </div>
        </div>

        <div className="col-span-2 pl-10">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Pokemon Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {pokemon.name?.toUpperCase()}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Weight
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {pokemon.weight}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {pokemon.types?.map((type: any) => (
                      <span
                        key={type}
                        className="text-sm px-6 py-1 bg-green-500 text-white rounded-2xl mr-2"
                      >
                        {type}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Ability
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {pokemon.abilities?.map((ability: any, index: any) => (
                      <span
                        key={index}
                        className="text-sm px-6 py-3 rounded-md border border-gray-200 shadow-sm mr-2"
                      >
                        {ability}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   {error !== "" && (
    //     <div
    //       className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 md:flex-row md:max-w-xl"
    //       role="alert"
    //     >
    //       <span className="font-medium">Perhatian!</span> {error}
    //     </div>
    //   )}
    //   <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
    //     <img
    //       className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
    //       src={pokemon.image}
    //       alt={pokemon.name}
    //     />
    //     <div className="flex flex-col justify-between p-4 leading-normal">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         {pokemon.name}
    //       </h5>
    //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //         {pokemon.weight}
    //       </p>
    //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //         {pokemon.types?.map((type: any) => (
    //           <span key={type}>{type}, </span>
    //         ))}
    //       </p>
    //       <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
    //         {pokemon.abilities?.map((ability: any, index: any) => (
    //           <li key={index}>{ability}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    //   <button
    //     onClick={() => router.back()}
    //     className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
    //   >
    //     Back
    //   </button>
    // </>
  );
}
