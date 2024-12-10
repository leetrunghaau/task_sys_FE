"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { allProjects, deleteProject } from "../../services/API/projectAPI";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ProjectCard() {
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

  const handleCardClick = (id) => {
    router.push(`/projects/${id}`);
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      toast({
        title: "Project Deleted",
        description: `Project with ID ${id} has been successfully deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Remove the deleted project from the state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast({
        title: "Deletion Failed",
        description:
          error.response?.data?.message || "Unable to delete project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || projects.length === 0) {
    return (
      <Text fontSize="lg" color="gray.500" textAlign="center" mt={4}>
        You don't have any projects. Create new ones.
      </Text>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Privacy</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr key={project.id}>
              <Td>{project.id}</Td>
              <Td>{project.name}</Td>
              <Td>{project.description}</Td>
              <Td>{project.public ? "Public" : "Private"}</Td>
              <Td>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDown />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleCardClick(project.id)}>
                      View
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
