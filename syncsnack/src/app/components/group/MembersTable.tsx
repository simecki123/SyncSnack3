"use client";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function MembersTable({ session }: any) {
  const jwtToken: any = session.user.accessToken;
  const [members, setMembers]: any = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("group id: ", localStorage.getItem("GroupId"));
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/members?page=1&size=2`,
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
      })
      .catch((error) => {
        console.log("Error fetching group data:", error);
      });
  }, [session]);

  if (loading) {
    return (
      <Box className="flex h-full w-full border justify-center items-center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="p-10">
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="xblue"
          className="border rounded-xl shadow-lg"
          borderWidth="2px"
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member: any, index: any) => (
              <Tr key={index}>
                <Td className="flex space-x-1 items-center">
                  <Image
                    key={index}
                    borderRadius="full"
                    border="solid 1px"
                    objectFit="cover"
                    src={member.photoUrl}
                    fallbackSrc="/fallback-group.png"
                    boxSize={14}
                  />
                  <Text className="font-semibold">{member.firstName}</Text>
                  <Text className="font-semibold">{member.lastName}</Text>
                </Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box className="w-full flex justify-center">
          <Button>click</Button>
        </Box>
      </TableContainer>
    </Box>
  );
}
