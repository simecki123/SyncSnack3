"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Spinner, Image, Tag } from "@chakra-ui/react";

export default function GroupData({ session }: any) {
  const jwtToken = session.user.accessToken;
  const [group, setGroup]: any = useState();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  useGroupData(jwtToken, setGroup, setLoading, session);
  const [userRoles, setUserRoles]: any = useState();
  const [transfromRoles, setTransfromRoles] = useState();
  useMemberRole(
    jwtToken,
    setUserRoles,
    session,
    setIsLoadingRoles,
    setTransfromRoles,
  );

  useEffect(() => {
    if (transfromRoles) {
      console.log("transformed roles", transfromRoles);
      setUserRoles(transformingRoles(userRoles, transfromRoles));
    }
  }, [transfromRoles]);

  if (isLoading && isLoadingRoles) {
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
        <Box className="flex space-x-2 mt-2 justify-center">
          <Text className="font-bold italic">Your roles:</Text>
          {userRoles &&
            userRoles.map((role: any, index: any) => {
              return (
                <Box key={index}>
                  <Tag colorScheme="xorange">{role}</Tag>
                </Box>
              );
            })}
        </Box>
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
function useMemberRole(
  jwtToken: any,
  setUserRoles: any,
  session: any,
  setIsLoadingRoles: any,
  setTransfromRoles: any,
) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/roles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user roles: ", data.roles);
        setUserRoles(data.roles);
        setIsLoadingRoles(false);
      })
      .catch((error) => {
        console.error("Error fetching user roles:", error);
      });
    fetch(`http://localhost:3000/api/roles/${localStorage.getItem("GroupId")}`)
      .then((res) => res.json())
      .then((data) => {
        setTransfromRoles(data[0]);
      })
      .catch((error) => console.log("FAILED TO GET NEW ROLES", error.message));
  }, [session, jwtToken]);
}

function transformingRoles(userRoles: any, transfromObject: any): string[] {
  const newRoles = userRoles.map((role: any) => {
    if (role === "USER") {
      return transfromObject.user;
    } else if (role === "ADMIN") {
      return transfromObject.admin;
    } else if (role === "PRESIDENT") {
      return transfromObject.president;
    } else {
      return role;
    }
  });
  return newRoles;
}
