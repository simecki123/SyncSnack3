import { useState, useEffect } from "react";

interface Group {
  id: string;
  name: string;
  imageUrl: string;
}

export function useGroups(accessToken: string, state: any, joinState: any) {
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
  }, [accessToken, state, joinState]);

  return { groups, error };
}

export function useMembersData(
  currentPage: any,
  jwtToken: any,
  pageSize: any,
  setCurrentPage: any,
  setDisableForward: any,
  setLoading: any,
  setMembers: any,
  session: any,
) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/members?page=${currentPage}&size=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
        if (data.length === 0) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((error) => {
        console.log("Error fetching group data:", error);
      });
  }, [session, currentPage]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/members?page=${currentPage + 1}&size=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("members", data);
        if (data.length === 0) {
          setDisableForward(true);
        } else {
          setDisableForward(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching group data:", error);
      });
  }, [session, currentPage]);
}
