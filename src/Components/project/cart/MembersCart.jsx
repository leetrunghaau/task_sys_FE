import {
  Box,
  Heading,
  Flex,
  Text,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import moment from "moment";
import "moment-timezone";
import {useEffect } from "react"
import { useRouter } from "next/navigation";
export default function MembersCart({ pid, members }) {

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${pid}/members`);
  };
  useEffect(() => {
    console.log("cart", members) 
}, []);

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
                    Members
                </Heading>
            </Flex>
      <Flex mt={4} gap="2" justify="center">
        <AvatarGroup size="sm" max={3}>
          {members && members.length > 0 && members.map(item => <Avatar key={item.id} name={item.User.name} size="xs" />)}
        </AvatarGroup>
      </Flex>
    </Box>
  );
}
