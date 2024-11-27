"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { FileText } from "lucide-react";
import { allProjects } from "../../../services/API/projectAPI";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ExpMobile() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await allProjects();
        setProjects(response.data);
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
    router.push(`/projects/${id}`);
  };
  return (
    <VStack>
      <Box>
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="sm">Worked on</Heading>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </Flex>
        <Flex gap="4" flexDir={"column"}>
          {projects.map((project) => (
            <Box
              w="62"
              key={project}
              bg="white"
              rounded="md"
              shadow="sm"
              borderWidth="1px"
              p="4">
              <Flex flexDir={"column"}>
                <Flex gap="4" justify={"start"} align={"center"}>
                  <FileText size="16" />
                  <Flex flexDir={"column"} gap="2">
                    <Text fontSize={"sm"} mt="2">
                      {project.name}
                    </Text>
                    <Text fontSize={"xs"}> {project.description}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
}
