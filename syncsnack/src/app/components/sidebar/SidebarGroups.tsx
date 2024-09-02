"use client";
import { Box, Image, useDisclosure } from "@chakra-ui/react";
import SidebarGroupDrawer from "./SidebarDrawer";

/**
 * This is the sidebar where all the groups icon are shown.
 * When clicked it will open a drawer with group options.
 * Also link to profile options is here.
 * @todo fetch user groups and show them here
 * @todo button for creating or joining a group
 */
export default function SidebarGroups() {
  /**
   * This is used for group links drawer
   * @see https://v2.chakra-ui.com/docs/components/drawer
   */
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="flex flex-col space-y-2 p-2">
      <Image
        className="rounded-full"
        objectFit="cover"
        src="/kkzadar.png"
        boxSize={14}
        onClick={onOpen}
      />
      <SidebarGroupDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
