"use client";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import NotificationDrawer from "./NotificationDrawer";
import { NotificationType } from "@/commons/types";
import { GroupEventsContext } from "../Providers";

export default function NotificationBell() {
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const [isBellNotified, setIsBellNotified] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const groupEventContext = useContext(GroupEventsContext);
  useSubscribeToWS(
    session,
    setIsBellNotified,
    toast,
    status,
    setNotifications,
    groupEventContext.setGroupEvents,
    groupEventContext.groupEvents,
  );

  return (
    <Box
      onClick={onOpen}
      bgColor="xblue.500"
      className={clsx(
        "md:fixed md:top-4 md:right-4 md:py-2 md:px-4 rounded-md md:shadow-md",
        {
          "md:bg-blue-2 shadow-md animate-[wiggle_0.3s_ease-in-out_infinite]":
            isBellNotified,
        },
      )}
    >
      <BellIcon className="size-8" />
      <NotificationDrawer
        isOpen={isOpen}
        onClose={onClose}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </Box>
  );
}

function useSubscribeToWS(
  session: any,
  setIsBellNotified: any,
  toast: any,
  status: any,
  setNotifications: any,
  setGroupEvents: any,
  groupEvents: any,
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
              if (
                JSON.parse(message.body).userProfileId !==
                activeUser.userProfileId
              ) {
                console.log("new order: ", message.body);
                setIsBellNotified(true);
                toast({
                  title: "Order",
                  description: "New order on your event",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  colorScheme: "xblue",
                });
              }
            },
          );
          client.subscribe(
            // this is for the event
            `/topic/users/${activeUser.userProfileId}`,
            (message: any) => {
              if (
                JSON.parse(message.body).userProfileId !==
                activeUser.userProfileId
              ) {
                console.log("new event: ", message.body);
                setIsBellNotified(true);
                const bodyObject = JSON.parse(message.body);
                const groupEventObject = {
                  title: bodyObject.title,
                  eventType: bodyObject.eventType,
                  description: bodyObject.description,
                  userProfileFirstName: bodyObject.firstName,
                  userProfileLastName: bodyObject.lastName,
                  pendingUntil: bodyObject.pendingUntil,
                  createdAt: bodyObject.createdAt,
                };
                setGroupEvents((prev: any) => [...prev, groupEventObject]);
                console.log(groupEvents);
                // add message.body to be the first in the list of notifications...
                setNotifications((prev: any) => [
                  JSON.parse(message.body),
                  ...prev,
                ]);
                setNotifications((prev: any) => [
                  JSON.parse(message.body),
                  ...prev,
                ]);
                toast({
                  title: "Event",
                  description: "New event in your group",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  colorScheme: "xblue",
                });
              }
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
