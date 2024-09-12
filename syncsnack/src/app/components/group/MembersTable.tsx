"use client";
import { useMembersData } from "@/commons/custom-hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useColorModeValue, TableContainer, Image } from "@chakra-ui/react";
import { Button, Spinner, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/**
 * Table component that displays group members.
 * Includes pagination buttons.
 */
export default function MembersTable({ session }: any) {
  const jwtToken: any = session.user.accessToken;
  const [members, setMembers]: any = useState();
  const [loading, setLoading] = useState(true);
  const textRoleColor = useColorModeValue("black", "white");
  const outlineRoleColor = useColorModeValue("xorange.200", "xorange.600");
  const [currentPage, setCurrentPage] = useState(0);
  const [disableForward, setDisableForward] = useState(false);
  const [transformRoles, setTransformRoles]: any = useState();
  const pageSize = 4;
  useMembersData(
    currentPage,
    jwtToken,
    pageSize,
    setCurrentPage,
    setDisableForward,
    setLoading,
    setMembers,
    session,
    setTransformRoles,
  );

  useEffect(() => {
    if (transformRoles) {
      console.log("transformed roles  in the effe", transformRoles);
    }
  }, [transformRoles]);

  if (loading) {
    return (
      <Box className="flex h-full w-full border justify-center items-center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <TableContainer>
        <Table
          variant="unstyled"
          colorScheme="xblue"
          className="shadow-lg"
          borderWidth="2px"
          borderColor="xblue.400"
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member: any, index: any) => (
              <Tr key={index} className="border">
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
                <Td>
                  {member.roles.map((role: any, index: any) => (
                    <Text
                      key={index}
                      className="px-3 py-2 inline rounded-xl font-semibold mr-1"
                      color={textRoleColor}
                      borderColor={outlineRoleColor}
                      borderWidth="1px"
                    >
                      {transformRoles
                        ? role === "USER"
                          ? transformRoles.user
                          : role === "ADMIN"
                            ? transformRoles.admin
                            : role === "PRESIDENT"
                              ? transformRoles.president
                              : role
                        : role}
                    </Text>
                  ))}
                </Td>
                <Td className="space-x-1">
                  <Button variant="outline" colorScheme="xred">
                    Kick user
                  </Button>
                  <Button variant="outline">Give Role</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={4} className="mr-4 mb-2 grow flex justify-center items-end">
        <Box className="flex space-x-2 items-center">
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            colorScheme="xblue"
            size="sm"
            isDisabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <Text>Page {currentPage + 1}</Text>
          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            size="sm"
            colorScheme="xblue"
            isDisabled={disableForward}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Box>
      </Box>
    </>
  );
}
