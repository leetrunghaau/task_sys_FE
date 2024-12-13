import {
    Box,
    Heading,
    Flex,
    Text,
    Avatar,
    Badge,
    AvatarGroup,
} from "@chakra-ui/react";
import moment from "moment";
import "moment-timezone";
import { useEffect } from "react"
import { useRouter } from "next/navigation";
export default function StatusCart({ pid, status }) {

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/projects/${pid}/status`);
    };


    return (
        <Box
            // w="50%"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            shadow={"md"}
            onClick={() => handleCardClick()}
            _hover={{
                transform: "translateY(-5px)",
                cursor: "pointer",
                shadow: "2xl",
            }}
            transition="all 0.2s ease-in-out">
            <Flex justify="center">
                <Heading as="h3" size="md" mb={2}>
                    Status
                </Heading>
            </Flex>
            <Flex mt={4} gap="2">
                {status && status.length > 0 && status.map(item => (
                    <Badge
                        key={item.id}
                        fontSize="xs"
                        borderRadius="full"
                        colorScheme={item.color ?? "gray"}
                    >
                        {item.name}
                    </Badge>
                ))}
            </Flex>
        </Box>
    );
}