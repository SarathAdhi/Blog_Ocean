import {
  FormControl,
  Textarea as ChakraTextArea,
  TextareaProps,
} from "@chakra-ui/react";
import FormFieldWrapper from "@layouts/FormFieldWrapper";
import React from "react";

type Props = {
  isRequired?: boolean;
  label?: string;
} & TextareaProps;

const TextArea: React.FC<Props> = ({
  isRequired = false,
  label = "",
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormFieldWrapper name={label}>
        <ChakraTextArea
          p={2}
          _disabled={{
            color: "gray.600",
            bgColor: "gray.100",
            cursor: "not-allowed",
          }}
          {...rest}
        />
      </FormFieldWrapper>
    </FormControl>
  );
};

export default TextArea;
