import { useState } from "react";
import { ButtonGroup, Flex, IconButton, Input } from "@chakra-ui/react";
import { Check, X } from "lucide-react";

export default function AddLine({ value, size, onFinish, onCancel }) {
  const [inputValue, setInputValue] = useState("");

  const handleCancelClick = () => {
    setInputValue("");
    onCancel();
  };

  const handleSubmitClick = () => {
    onFinish(inputValue); // Send the updated value to the parent
  };

  return (
    <Flex direction="row" align="center" w="100%">
      <>
        <Input
          value={inputValue}
          placeholder={value}
          onChange={(e) => setInputValue(e.target.value)} // Update input state
          fontSize={size ?? "2xl"}
          mr={2}
        />
        <ButtonGroup size="sm">
          <IconButton
            variant="ghost"
            icon={<Check />}
            onClick={handleSubmitClick}
            aria-label="Submit"
          />
          <IconButton
            variant="ghost"
            icon={<X />}
            onClick={handleCancelClick} // Cancel
            aria-label="Cancel"
          />
        </ButtonGroup>
      </>
    </Flex>
  );
}
