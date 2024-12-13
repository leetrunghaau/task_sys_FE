"use client";
import { Flex, Text } from "@chakra-ui/react";
import Projects from "../../Components/dashboard/Projects/Projects";
import { allProjects } from "../../services/API/projectAPI";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "../../utils/useAuthRedirect";

export default function DashBoardPage() {
  const [projects, setProjects] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useAuthRedirect();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await allProjects();
      console.log("API Response:", response);

      // Ensure the response is in the expected format
      if (response && response.data) {
        setProjects(response.data);
      } else {
        throw new Error("No data found");
      }
    } catch (err) {
      console.error("Error fetching projects:", err); // Log the actual error
      setError("Failed to load projects");
      setProjects([]); // Set to empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  // Redirect to /projects if there's an error
  useEffect(() => {
    if (error) {
      router.push("/projects");
    }
  }, [error, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex px={{ base: 2, md: 6 }} flexDir={"column"} gap="10" w="100%">
      {projects.length > 0 ? (
        <Projects projects={projects} />
      ) : (
        <Text fontSize="lg" color="gray.500">
          You don't have any projects yet.
        </Text>
      )}
    </Flex>
  );
}
