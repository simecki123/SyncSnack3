// hooks/useGroups.ts
import { useState, useEffect } from "react";

interface Group {
  id: string;
  name: string;
  imageUrl: string;
}

export function useGroups(accessToken: string) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      }
    };

    fetchGroups();
  }, [accessToken]);

  return { groups, error };
}
