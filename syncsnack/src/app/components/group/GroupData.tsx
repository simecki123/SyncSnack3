"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Spinner, Image } from "@chakra-ui/react";

export default function GroupData({ session }: any) {
  const jwtToken = session.user.accessToken;
  const [group, setGroup]: any = useState();
  const [isLoading, setLoading] = useState(true);
  useGroupData(jwtToken, setGroup, setLoading, session);

  if (isLoading) {
    return (
      <Box className="flex h-full w-full border justify-center items-center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="flex items-center space-x-4 justify-center">
      <Image
        objectFit="cover"
        rounded="full"
        boxSize={44}
        borderRadius="full"
        border="solid"
        borderColor="xblue.400"
        borderWidth={3}
        src={group.photoUrl}
        fallbackSrc="/template-user.png"
      />
      <Box className="flex flex-col items-center">
        <Heading>{group.name}</Heading>
        <Text>{group.description}</Text>
      </Box>
    </Box>
  );
}

function useGroupData(
  jwtToken: any,
  setGroup: any,
  setLoading: any,
  session: any,
) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/${localStorage.getItem("GroupId")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, [session, jwtToken]);
}
