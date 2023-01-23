import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

export default function DeleteModal({
  text,
  deleteQuote,
  isDisabled,
  isLoading,
  refresh,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (refresh) {
      onClose();
    }
  }, [refresh]);

  return (
    <>
      <Button bg="red" color="#fff" onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Quote</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>

          <ModalFooter>
            <Button
              isDisabled={isDisabled}
              isLoading={isLoading}
              bg="red"
              color="#fff"
              onClick={deleteQuote}
              mx={4}
            >
              Confirm
            </Button>
            <Button colorScheme="red" variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
