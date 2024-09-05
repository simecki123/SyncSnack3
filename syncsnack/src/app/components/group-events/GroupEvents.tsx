"use client";

import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GroupEventCard from "./GroupEventCard";

export default function GroupEvents() {
  const [groupEvents, setGroupEvents] = useState([]);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { data: session, status }: any = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${groupId}`,
        },
        body: JSON.stringify({ status: "PENDING", eventType: null }),
      })
        .then((res) => res.json())
        .then((data: any) => {
          console.log(data);
          if (data) {
            setGroupEvents(data);
          }
        })
        .catch((e) => console.log(e.message));
    }
  }, [groupId, status]);

  return (
    <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 md:m-20 gap-4">
      {groupEvents.length > 0 ? (
        groupEvents.map((group, indx) => {
          return <GroupEventCard key={indx} />;
        })
      ) : (
        <p>No events in this group...</p>
      )}
    </Box>
  );
}
