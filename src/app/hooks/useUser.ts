import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchUser = (userId: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user?id=${userId}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch user");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
