import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  AlertStatus,
  Stack,
} from "@chakra-ui/react";
import { Component } from "types/Page";

type Props = {
  title: string;
  status?: AlertStatus;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  showCloseBtn?: boolean;
};

export const AlertChakra: React.FC<Props & Component> = ({
  status = "error",
  isOpen,
  setIsOpen,
  title,
  children,
  showCloseBtn = false,
}) => {
  return isOpen ? (
    <Alert
      status={status}
      width="full"
      justifyContent={"space-between"}
      borderRadius="lg"
    >
      <div className="flex items-start">
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{children}</AlertDescription>
        </Box>
      </div>

      {showCloseBtn && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => setIsOpen(false)}
        />
      )}
    </Alert>
  ) : (
    <></>
  );
};
