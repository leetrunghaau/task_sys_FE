"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  Grid,
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
            {projects.map((project) => (
              <Box
                key={project.id}
                bg="white"
                p="4"
                rounded="md"
                shadow="sm"
                borderWidth="1px"
                onClick={() => handleCardClick(project.id)}
                _hover={{
                  cursor: "pointer",
                }}>
                <Flex gap="4">
                  <FileText size="20" />
                  <Box>
                    <Text fontWeight="medium">{project.name}</Text>
                    <Text fontSize="sm">{project.description}</Text>
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
