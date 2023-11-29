"use client";

import { useFetchUser } from "@/app/hooks/useUser";
import { useSession } from "next-auth/react";

export default function MyPokemonsPage() {
  const { data: session }: { data: any } = useSession();

  const { user, error, loading } = useFetchUser(session?.user._id as string);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Pokemon
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Total Pokemons :
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {user?.pokemons?.map((pokemon) => (
              <li
                key={pokemon.id}
                className="border border-gray-200 shadow-md rounded-md p-2 flex items-center"
              >
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {pokemon.name.toUpperCase()}
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
