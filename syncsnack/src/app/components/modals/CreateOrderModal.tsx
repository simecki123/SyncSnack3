import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import CreateOrderForm from "../forms/CreateOrderForm";

export default function CreateOrderModal({ isOpen, onClose }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateOrderForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
