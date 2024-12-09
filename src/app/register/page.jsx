import ResponsiveRegisterForm from "../../Components/register/ResponsiveRegisterForm";
import { Flex } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <Flex justifyContent={"center"} w="100%">
      <ResponsiveRegisterForm />
    </Flex>
  );
}
