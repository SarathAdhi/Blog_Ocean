import {
  FormControl,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";
import FormFieldWrapper from "@layouts/FormFieldWrapper";
import React from "react";

type Props = {
  isRequired?: boolean;
  label?: string;
} & InputProps;

const Input: React.FC<Props> = ({
  isRequired = false,
  label = "",
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormFieldWrapper name={label}>
        <ChakraInput
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

export default Input;
