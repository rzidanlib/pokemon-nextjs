import axios from "axios";

export const getCurrentPosition = async (): Promise<{
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
} | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            if (response.status === 200) {
              const data = response.data;
              const locationDetails = {
                latitude,
                longitude,
                address:
                  data.display_name || "Address information not available",
                city: data.address.city || "City information not available",
                country:
                  data.address.country || "Country information not available",
              };
              resolve(locationDetails);
            } else {
              reject(new Error("Failed to fetch location details"));
            }
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};
