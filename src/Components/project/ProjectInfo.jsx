"use client";
import { Flex, Heading, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Badge, Divider, Text, Area, Td, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Trash2, Edit, SquarePlus } from "lucide-react";


import ConfirmDeleteModal from "../../Components/utils/ConfirmDeleteModal"
import AddLine from "../../Components/utils/AddLine"
import EditLine from "../../Components/utils/EditLine"
import MembersCart from "../../Components/project/cart/MembersCart"
import StatusCart from "../../Components/project/cart/StatusCart"
import TrackersCart from "../../Components/project/cart/TrackersCart"
import PrioritiesCart from "../../Components/project/cart/PrioritiesCart"

import { getSingleProjectById, updateProject } from "../../services/API/projectAPI";

export default function ProjectInfo({ pId }) {
    const toast = useToast();
    const [project, setproject] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchProject = async () => {
        try {
            setLoading(false);
            const response = await getSingleProjectById(pId);
            setproject(response.data);
        } catch (err) {
            setError("Failed to load Priority");
        } finally {
            setLoading(false);
        }
    };
    const fetchUpdateProject = async (data) => {
        try {
            setLoading(false);
            const response = await updateProject(pId, data);
            fetchProject();
            toast({
                title: "project updated.",
                description: "The project has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setError("Failed to load Priority");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProject();
    }, [pId]);

    useEffect(() => {
        fetchProject();
    }, []);
    const addItemClick = () => {
        if (!addItem) {
            setAddItem(true)
        }
    }
    const addPriorityCancel = () => {
        setAddItem(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <Flex flexDir={"column"} mx="8" w="100%">
            <Flex align={"center"} gap="52" mb="8">
                <Flex direction="row" justify={"space-between"}>
                    <Heading size="md" mb={2} mr={4}>Project overview</Heading>
                </Flex>
            </Flex>
            <Box w="100%">
                <Flex flexDir={"column"}>
                    <Text fontWeight={"bold"} fontSize={"sm"}>Project: #{project.project?.id ?? ""}</Text>
                    <Flex ml={5}>
                        <EditLine
                            key={project.project?.id}
                            bold={true}
                            value={project.project?.name ?? ""}
                            size={"xl"}
                            onFinish={(rs) => { fetchUpdateProject({ name: rs.trim() }) }}
                        />
                    </Flex>
                </Flex>
                <Flex flexDir={"column"} mt={3}>
                    <Text fontSize={"sm"}>Description:</Text>
                    <Flex ml={5}>
                        <EditLine
                            area={true}
                            key={project.project?.name }
                            value={project.project?.description}
                            size={"lg"}
                            onFinish={(rs) => { fetchUpdateProject({ description: rs.trim() }) }}
                        />
                    </Flex>
                </Flex>
                <Divider mt={6} />

                <Flex flexDir={"colume"} flexWrap={"wrap"} mt={3} gap="5">

                    <StatusCart
                        key={project.project?.id}
                        pid={project.project?.id}
                        status={project.status ?? []}
                    />
                    <TrackersCart
                        key={project.project?.id}
                        pid={project.project?.id}
                        trackers={project.status ?? []}
                    />
                    <PrioritiesCart
                        key={project.project?.id}
                        pid={project.project?.id}
                        priorities={project.status ?? []}
                    />
                    <MembersCart
                        key={project.project?.id}
                        pid={project.project?.id}
                        members={project.member ?? []}
                    />
                </Flex>

            </Box>
        </Flex>
    );
}
