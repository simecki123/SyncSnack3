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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import CreateGroupForm from "../forms/CreateGroupForm";

export default function JoinCreateGroupModal({
  isOpen,
  onClose,
  state,
  formAction,
}: any) {
  const t = useTranslations("GroupJoinCreateModal");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("Header")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed" colorScheme="xblue">
            <TabList mb="1em">
              <Tab>{t("Tab1")}</Tab>
              <Tab>{t("Tab2")}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <CreateGroupForm
                  state={state}
                  formAction={formAction}
                  onClose={onClose}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
