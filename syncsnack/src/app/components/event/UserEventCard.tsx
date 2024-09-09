"use client";

import { Box, Button, Input, Spinner, Tag, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserEventCard({ event, orders }: any) {
  // TODO: get orderId from orders
  if (!event) {
    return (
      <Box className="mt-20 mx-2 px-40 py-16 border rounded-lg md:mt-2">
        <Spinner />
      </Box>
    );
  }
  //
  // function handleOrders(newStatus: string, orderId: string): void {
  //   const response = fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update?orderId=${orderId}&status=${newStatus}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     },
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to update order status");
  //   }
  // }
  //
  // function handleAllOrders(newStatus: string) {
  //
  // }

  return (
    <Box
      className="mt-20 mx-2 md:mt-2 border shadow-lg rounded-lg p-6 w-96"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box className="mb-4">
        <Text className="font-bold text-xl">{event.title}</Text>
      </Box>

      <Box className="mb-4">
        <Text className="text-sm">{event.description}</Text>
      </Box>

      <Box className="flex justify-center space-x-2">
        <Button colorScheme="xblue">Finish</Button>
        <Button colorScheme="xred">Cancel</Button>
      </Box>
    </Box>
  );
}
