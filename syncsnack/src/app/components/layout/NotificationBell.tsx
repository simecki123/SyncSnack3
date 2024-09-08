"use client";
import { Box, useToast } from "@chakra-ui/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function NotificationBell() {
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const [isBellNotified, setIsBellNotified] = useState(false);
  useSubscribeToWS(session, setIsBellNotified, toast, status);

  return (
    <Box
      className={clsx(
        "md:fixed md:top-4 md:right-4 md:py-2 md:px-4 rounded-md md:shadow-md",
        {
          "md:bg-blue-2 shadow-md bg-blue-500 animate-[wiggle_0.3s_ease-in-out_infinite]":
            isBellNotified,
        },
      )}
    >
      <BellIcon className="size-8" />
    </Box>
  );
}

function useSubscribeToWS(
  session: any,
  setIsBellNotified: any,
  toast: any,
  status: any,
) {
  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    if (status === "authenticated") {
      const activeUser: any = session.user;
      const client = new Client({
        brokerURL: `ws://localhost:8080/ws`,
        onConnect: () => {
          client.subscribe(
            `/topic/orders/${activeUser.userProfileId}`,
            (message: any) => {
              console.log("new order: ", message.body);
              setIsBellNotified(true);
              toast({
                title: "Order",
                description: "New order on your event",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            },
          );
          client.subscribe(
            // this is for the event
            `/topic/groups/${localStorage.getItem("GroupId")}`,
            (message: any) => {
              console.log("new event: ", message.body);
              setIsBellNotified(true);
              toast({
                title: "Event",
                description: "New event in your group",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            },
          );
        },
        onDisconnect: () => {
          console.log("Disconnected");
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });

      clientRef.current = client;
      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [status]);
}
