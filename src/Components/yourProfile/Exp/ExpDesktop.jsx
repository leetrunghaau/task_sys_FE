"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { FileText } from "lucide-react";

export default function ExpDesktop() {
  return (
    <Flex p="6">
      <VStack spacing="8" align="start">
        {/* Worked on Section */}
        <Box w="full">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="md">Worked on</Heading>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Flex>
          <Grid gap="4">
            {[
              "Get the most out of your software project space",
              "Template - Decision documentation",
              "Template - Meeting notes",
              "Template - Product requirements",
              "Meeting notes",
            ].map((item) => (
              <Box
                key={item}
                bg="white"
                p="4"
                rounded="md"
                shadow="sm"
                borderWidth="1px">
                <Flex gap="4">
                  <FileText size="20" />
                  <Box>
                    <Text fontWeight="medium">{item}</Text>
                    <Text fontSize="sm">
                      Software Development • Created on November 17, 2024
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
    </Flex>
  );
}
