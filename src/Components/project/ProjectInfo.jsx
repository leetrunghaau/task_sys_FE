import {
  Flex,
  Heading,
  Box,
  Divider,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import {
  Lightbulb,
  User,
  BadgeAlert,
  ScanEye,
  ChartNoAxesGantt,
} from "lucide-react";
import { useState, useEffect } from "react";
import EditLine from "../../Components/utils/EditLine";
import DangerZone from "./DangerZone";
import {
  getSingleProjectById,
  updateProject,
} from "../../services/API/projectAPI";
import { useRouter } from "next/navigation";

export default function ProjectInfo({ pId }) {
  const toast = useToast();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await getSingleProjectById(pId);
      setProject(response.data);
    } catch (err) {
      setError("Failed to load project.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdateProject = async (data) => {
    try {
      setLoading(true);
      await updateProject(pId, data);
      fetchProject();
      toast({
        title: "Project updated.",
        description: "The project has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error.",
        description: "Failed to update project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [pId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Flex flexDir={"column"} mx="8" w="100%">
      <Flex align={"center"} gap="52" mb="8">
        <Flex
          flexDir={"column"}
          justify={"space-between"}
          alignItems={"center"}>
          <Heading size="md" mb={2} mr={4}>
            Project Overview
          </Heading>
        </Flex>
      </Flex>
      <Box w="100%">
        <Flex flexDir={"column"}>
          <Flex gap="2" alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Project:
            </Text>
            <EditLine
              key={project.project?.id}
              bold={true}
              value={project.project?.name ?? ""}
              size={"xl"}
              onFinish={(rs) => {
                fetchUpdateProject({ name: rs.trim() });
              }}
            />
          </Flex>
        </Flex>

        <Flex my="2" gap="2" alignItems={"center"}>
          <Text fontSize={"md"}>Description:</Text>
          <EditLine
            area={true}
            key={project.project?.name}
            value={project.project?.description}
            size={"md"}
            onFinish={(rs) => {
              fetchUpdateProject({ description: rs.trim() });
            }}
          />
        </Flex>
        <Flex gap="2" align={"center"} my="8">
          <Stat
            maxW="20%"
            borderWidth={"1px"}
            borderRadius={"4"}
            boxShadow={"lg"}
            cursor={"pointer"}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            onClick={() => router.push(`/projects/${pId}/issue`)}>
            <Flex p="4" flexDir={"column"}>
              <StatLabel>Total Issuses</StatLabel>
              <Flex align={"center"} gap="2">
                <Lightbulb size="22" />
                <StatNumber>{project.issues.length}</StatNumber>
              </Flex>
            </Flex>
          </Stat>
          <Stat
            maxW="20%"
            borderWidth={"1px"}
            borderRadius={"4"}
            boxShadow={"lg"}
            cursor={"pointer"}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            onClick={() => router.push(`/projects/${pId}/members`)}>
            <Flex p="4" flexDir={"column"}>
              <StatLabel>Total Members</StatLabel>
              <Flex align={"center"} gap="2">
                <User size="22" />
                <StatNumber>{project.member.length}</StatNumber>
              </Flex>
            </Flex>
          </Stat>
          <Stat
            maxW="20%"
            borderWidth={"1px"}
            borderRadius={"4"}
            boxShadow={"lg"}
            cursor={"pointer"}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            onClick={() => router.push(`/projects/${pId}/status`)}>
            <Flex p="4" flexDir={"column"}>
              <StatLabel>Total Statuses</StatLabel>
              <Flex align={"center"} gap="2">
                <BadgeAlert size="22" />
                <StatNumber>{project.status.length}</StatNumber>
              </Flex>
            </Flex>
          </Stat>
          <Stat
            maxW="20%"
            borderWidth={"1px"}
            borderRadius={"4"}
            boxShadow={"lg"}
            cursor={"pointer"}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            onClick={() => router.push(`/projects/${pId}/tracker`)}>
            <Flex p="4" flexDir={"column"}>
              <StatLabel>Total Trackers</StatLabel>
              <Flex align={"center"} gap="2">
                <ScanEye size="22" />
                <StatNumber>{project.tracker.length}</StatNumber>
              </Flex>
            </Flex>
          </Stat>
          <Stat
            maxW="20%"
            borderWidth={"1px"}
            borderRadius={"4"}
            boxShadow={"lg"}
            cursor={"pointer"}
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            onClick={() => router.push(`/projects/${pId}/priority`)}>
            <Flex p="4" flexDir={"column"}>
              <StatLabel>Total Priorities</StatLabel>
              <Flex align={"center"} gap="2">
                <ChartNoAxesGantt size="22" />
                <StatNumber>{project.priority.length}</StatNumber>
              </Flex>
            </Flex>
          </Stat>
        </Flex>
        <Divider mt={6} />
        {/* <Flex flexWrap={"wrap"} justifyContent={"space-around"} mt={3}>
          <StatusCart
            key={project.project?.id}
            pid={project.project?.id}
            status={project.status ?? []}
          />
          <TrackersCart
            key={project.project?.id}
            pid={project.project?.id}
            trackers={project.tracker ?? []}
          />
          <PrioritiesCart
            key={project.project?.id}
            pid={project.project?.id}
            priorities={project.priority ?? []}
          />
          <MembersCart
            key={project.project?.id}
            pid={project.project?.id}
            members={project.member ?? []}
          />
        </Flex> */}
        <Flex
          my="8"
          minW="100%"
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Flex gap="2" flexDir={"column"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Delete this project.
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Once you delete a project, there is no going back. Please be
              certain.
            </Text>
          </Flex>
          <DangerZone id={pId} />
        </Flex>
        <Flex
          my="8"
          minW="100%"
          alignItems={"center"}
          justifyContent={"space-between"}>
          {" "}
          <Flex gap="2" flexDir={"column"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Change project active status.
            </Text>
            <Flex gap="1">
              <Text fontSize={"sm"} color={"gray.500"}>
                This repository is currently{" "}
              </Text>
              <Text
                fontSize={"sm"}
                color={project.project?.active === 1 ? "teal" : "red"}>
                {project.project?.active === 1 ? "Active" : "Inactive"}.
              </Text>
            </Flex>
          </Flex>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme={project.project?.active === 1 ? "teal" : "red"}>
              {project.project?.active === 1 ? "Active" : "Inactive"}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => fetchUpdateProject({ active: 1 })}
                isDisabled={project.project?.active === 1}>
                Set Active
              </MenuItem>
              <MenuItem
                onClick={() => fetchUpdateProject({ active: 0 })}
                isDisabled={project.project?.active === 0}>
                Set Inactive
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
}
