"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { allProjects } from "../../../services/API/projectAPI";
export default function ExpDesktop() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await allProjects();
        let data = [];
        response.data.forEach((element, i) => {
          if (i < 4) {
            data.push(element);
          }
        });
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (id) => {
    if (id) {
      router.push(`/projects/${id}`);
    } else {
      router.push("/projects");
    }
  };

  return (
    <Flex p="6" w="100%">
      <VStack spacing="8" align="start">
        <Box w="full">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="md">Recently Projects</Heading>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handleCardClick()}>
              View all
            </Button>
          </Flex>
          <Flex flexWrap={"wrap"} w="100%" justifyContent={"space-around"}>
            {projects.map((project) => (
              <Box
                boxShadow={"lg"}
                my="4"
                mx="1"
                w="45%"
                key={project.id}
                bg="white"
                p="4"
                rounded="md"
                shadow="sm"
                borderWidth="1px"
                onClick={() => handleCardClick(project.id)}
                cursor="pointer"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl",
                }}
                transition="transform 0.2s ease, box-shadow 0.2s ease">
                <Flex alignItems={"center"} gap="4">
                  <FileText size={32} />
                  <Box>
                    <Text
                      w="300px"
                      noOfLines={1}
                      fontSize={"lg"}
                      fontWeight="bold">
                      {project.name}
                    </Text>
                    <Text fontSize="sm">{project.description}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
}
