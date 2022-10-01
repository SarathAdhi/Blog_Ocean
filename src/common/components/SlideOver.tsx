import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Component } from "types/Page";

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const SlideOver: React.FC<Props & Component> = ({
  title,
  isOpen,
  setIsOpen,
  children,
}) => {
  const btnRef = React.useRef(null);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => setIsOpen(false)}
      finalFocusRef={btnRef}
      size={{ base: "sm", lg: "md" }}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        {/* <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};
