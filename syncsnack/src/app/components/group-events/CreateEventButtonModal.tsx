"use client";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

/**
 * This component is responsible for displaying
 * the Modal(create event) when button is clicked.
 */
export default function CreateEventButtonModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="flex justify-center">
      <Button colorScheme="xblue" onClick={onOpen}>
        Create Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
