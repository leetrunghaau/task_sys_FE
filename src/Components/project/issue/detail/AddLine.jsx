import { useState } from "react";
import { ButtonGroup, Flex, IconButton, Input, Text, Button } from "@chakra-ui/react";
import { Check, X, Edit } from "lucide-react";

export default function AddLine({ value, onFinish, onCancel }) {
    const [inputValue, setInputValue] = useState("");


    const handleCancelClick = () => {
        setInputValue(""); 
        onCancel()
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
                    fontSize="2xl"
                    mr={2}
                />
                <ButtonGroup size="sm">
                    <IconButton
                        icon={<Check />}
                        onClick={handleSubmitClick}
                        aria-label="Submit"
                    />
                    <IconButton
                        icon={<X />}
                        onClick={handleCancelClick} // Cancel 
                        aria-label="Cancel"
                    />
                </ButtonGroup>
            </>
        </Flex>
    );
}
