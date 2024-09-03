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
          <Link href={`group-events?${groupId}`}>Group events</Link>
          <Link href={`orders?${groupId}`}>Orders</Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
