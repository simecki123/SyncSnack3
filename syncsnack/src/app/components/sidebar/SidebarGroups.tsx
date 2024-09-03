"use client";
import { Box, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import SidebarGroupDrawer from "./SidebarDrawer";
import { PlusIcon } from "@heroicons/react/24/outline";
import JoinCreateGroupModal from "../modals/JoinCreateGroupModal";
import { useEffect, useState } from "react";
import { useGroups } from "@/commons/custom-hooks";

/**
 * This is the sidebar where all the groups icon are shown.
 * When clicked it will open a drawer with group options.
 * Also link to profile options is here.
 * To fetch groups we use the custom hook useGroups
 * @since 9.3.2024. 9:00
 */
export default function SidebarGroups({ accessToken }: any) {
  const { groups, error } = useGroups(accessToken);

  /**
   * This is used for group links drawer and modal
   * @see https://v2.chakra-ui.com/docs/components/drawer
   */
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isGroupModalOpen,
    onOpen: onGroupModalOpen,
    onClose: onGroupModalClose,
  } = useDisclosure();

  return (
    <Box className="flex flex-col space-y-2 p-2">
      {groups.map((group: any, index: number) => (
        <Image
          key={index}
          className="rounded-full"
          objectFit="cover"
          src="/kkzadar.png"
          boxSize={14}
          onClick={onDrawerOpen}
        />
      ))}
      <IconButton
        aria-label="Search database"
        icon={<PlusIcon />}
        colorScheme="xblue"
        isRound={true}
        boxSize={14}
        onClick={onGroupModalOpen}
      />
      <SidebarGroupDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
      <JoinCreateGroupModal
        isOpen={isGroupModalOpen}
        onClose={onGroupModalClose}
      />
    </Box>
  );
}
