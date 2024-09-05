"use client";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";

export default function SidebarGroupDrawer({ isOpen, onClose, group }: any) {
  if (!group) {
    return null;
  }
  const { name, groupId, description } = group;

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{name}</DrawerHeader>
        <DrawerBody className="flex flex-col">
          <NavLinks onClose={onClose} groupId={groupId} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
