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

export default function SidebarGroupDrawer({ isOpen, onClose }: any) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Group name here</DrawerHeader>

        <DrawerBody className="flex flex-col">
          <Link href="/group-events">Group events</Link>
          <Link href="/orders">Orders</Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
