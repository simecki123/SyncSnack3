"use client";
import { Box, useToast } from "@chakra-ui/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../context/GroupContext";

/**
 * TODO: Test on  websocket
 */
export default function NotificationBell() {
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const [isBellNotified, setIsBellNotified] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const activeUser: any = session.user;
      console.log("====================");
      console.log(activeUser.userProfileId);
      console.log(localStorage.getItem("GroupId"));
      console.log("====================");
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
              const eventNotification = JSON.parse(message.body);
              eventNotification.notificationType = "EVENT";
              const event = JSON.stringify(eventNotification);
              console.log("new event: ", message.body);
              if (
                eventNotification.userProfileId !== activeUser.userProfileId
              ) {
                setIsBellNotified(true);
                toast({
                  title: "Event",
                  description: "New event in your group",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                });
              }
            },
          );
        },
        onDisconnect: () => {},
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

  return (
    <Box
      className={clsx(
        "md:fixed md:top-4 md:right-4 md:py-2 md:px-4 rounded-md md:shadow-md",
        {
          "md:bg-blue-2 shadow-md bg-blue-2 animate-[wiggle_0.3s_ease-in-out_infinite]":
            isBellNotified,
        },
      )}
    >
      <BellIcon className="size-8" />
    </Box>
  );
}
