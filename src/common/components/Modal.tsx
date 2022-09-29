import {
  Button,
  Heading,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Component } from "types/Page";

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  ModalFooterChildren?: React.FC;
};

const Modal: React.FC<Props & Component> = ({
  title,
  isOpen,
  setIsOpen,
  children,
  ModalFooterChildren,
  className,
}) => {
  return (
    <ChakraModal
      isCentered
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      motionPreset="scale"
      size={"2xl"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent mx={{ base: "10px", sm: "20px" }}>
        <ModalHeader>
          <Heading size={"lg"}>{title}</Heading>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody className={className}>{children}</ModalBody>

        <ModalFooter>
          {ModalFooterChildren && <ModalFooterChildren />}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
