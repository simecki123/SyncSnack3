"use client";

import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import GroupEventCard from "./GroupEventCard";
import { GroupEventsContext } from "../Providers";

export default function GroupEvents() {
  const groupEventContext = useContext(GroupEventsContext);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { data: session, status }: any = useSession();
  useGroupEvents(groupId, groupEventContext.setGroupEvents, status, session);

  return (
    <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 md:m-20 gap-4">
      {groupEventContext.groupEvents.length > 0 ? (
        groupEventContext.groupEvents.map((groupEvent, indx) => {
          return <GroupEventCard groupEvent={groupEvent} key={indx} />;
        })
      ) : (
        <p>No events in this group...</p>
      )}
    </Box>
  );
}

function useGroupEvents(
  groupId: any,
  setGroupEvents: any,
  status: any,
  session: any,
) {
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
          if (data) {
            setGroupEvents(data);
          }
        })
        .catch((e) => console.info(e.message));
    }
  }, [groupId, status]);
}
