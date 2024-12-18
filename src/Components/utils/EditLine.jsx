import { useState } from "react";
import { ButtonGroup, Flex, IconButton, Input, Text, Button, Textarea } from "@chakra-ui/react";
import { Check, X, Edit } from "lucide-react";

export default function EditLine({ value, onFinish, size, bold, area }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setInputValue(value);
    };

    const handleSubmitClick = () => {
        setIsEditing(false);
        onFinish(inputValue);
    };

    return (
        <Flex direction="row" align="center" justify='space-between' width='100%'>
            {!isEditing ? (
                <>
                    <Text fontSize={size ?? "2xl"} mr={2} fontWeight={bold ? "bold" : "normal"}>{inputValue} </Text>
                    <Button
                    variant='ghost'
                        size="xs"
                        onClick={handleEditClick}
                        aria-label="Edit"
                    >
                        <Edit size="16" />
                    </Button>
                </>
            ) : (
                <>
                    {area ?
                        <Textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Update input state
                            fontSize={size ?? "2xl"}
                            mr={2}
                        />
                        :
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Update input state
                            fontSize={size ?? "2xl"}
                            mr={2}
                        />
                    }
                    <ButtonGroup size="xs">
                        <IconButton
                        variant='ghost'
                            icon={<Check />}
                            onClick={handleSubmitClick}
                            aria-label="Submit"
                        />
                        <IconButton
                        variant='ghost'
                            icon={<X />}
                            onClick={handleCancelClick} // Cancel editing
                            aria-label="Cancel"
                        />
                    </ButtonGroup>
                </>
            )}
        </Flex>
    );
}
