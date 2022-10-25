import {
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
  title?: string;
  isOpen: boolean;
  isCentered?: boolean;
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
  isCentered = true,
}) => {
  return (
    <ChakraModal
      isCentered={isCentered}
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      motionPreset="scale"
      size={"2xl"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent mx={{ base: "10px", sm: "20px" }}>
        {title && (
          <>
            <ModalHeader>
              <Heading size={"lg"}>{title}</Heading>
            </ModalHeader>
            <ModalCloseButton />
          </>
        )}

        <ModalBody className={className}>{children}</ModalBody>

        {ModalFooterChildren && (
          <ModalFooter>
            <ModalFooterChildren />
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
