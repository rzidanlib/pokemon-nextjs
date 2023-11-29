"use client";

import { useFetchUser } from "@/app/hooks/useUser";
import { getCurrentPosition } from "@/services/location";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function LocationPage() {
  const { data: session }: { data: any } = useSession();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
  } | null>(null);

  const { user, error, loading } = useFetchUser(session?.user._id as string);

  const handleGetLocation = async () => {
    try {
      const location = await getCurrentPosition();
      setLocation(location);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCurrentLocation = async () => {
    const userId = session.user._id;
    const currentLocation = {
      latitude: location?.latitude,
      longitude: location?.longitude,
      address: location?.address,
      city: location?.city,
      country: location?.country,
    };

    try {
      const res = await axios.post("/api/location/save", {
        userId,
        ...currentLocation,
      });
      if (res.status === 200) {
        console.log("ok", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="px-6 py-2 bg-black rounded-md text-white"
          onClick={handleGetLocation}
        >
          Get Location
        </button>

        <button
          className="px-6 py-2 bg-black rounded-md text-white"
          onClick={saveCurrentLocation}
        >
          Save Location
        </button>
      </div>

      {location ? (
        <div className="mt-3">
          <h3>Get your current location:</h3>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {location.address}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              City
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {location.city}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Country
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {location.country}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Coordinates
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>Latitude : {location.latitude}</p>
              <p>Longitude : {location.longitude}</p>
            </dd>
          </div>
        </div>
      ) : (
        <h1>Notfound</h1>
      )}

      {user?.locations !== null && (
        <div className="mt-3">
          <h3>Your current location:</h3>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.locations?.address}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              City
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.locations?.city}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Country
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.locations?.country}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Coordinates
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>Latitude : {user?.locations?.latitude}</p>
              <p>Longitude : {user?.locations?.longitude}</p>
            </dd>
          </div>
        </div>
      )}
    </div>
  );
}
