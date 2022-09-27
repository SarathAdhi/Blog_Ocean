import { FormLabel } from "@chakra-ui/react";
import { Component } from "types/Page";

type Props = {
  name: string;
};

const FormFieldWrapper: React.FC<Component & Props> = ({ name, children }) => (
  <>
    {name && (
      <FormLabel fontWeight={"semibold"} fontSize={"lg"}>
        {name}
      </FormLabel>
    )}
    {children}
  </>
);

export default FormFieldWrapper;
