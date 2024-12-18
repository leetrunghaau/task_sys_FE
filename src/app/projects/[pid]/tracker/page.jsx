"use client";
import {
  Flex,
  Heading,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SquarePlus } from "lucide-react";

import ConfirmDeleteModal from "../../../../Components/utils/ConfirmDeleteModal";
import AddLine from "../../../../Components/utils/AddLine";
import EditLine from "../../../../Components/utils/EditLine";
import ColorMenu from "../../../../Components/utils/ColorMenu";

import {
  updateTracker,
  deleteTracker,
  addNewTracker,
  allTrackers,
} from "../../../../services/API/trackerAPI";

export default function TrackerPage() {
  const params = useParams();
  const { pid } = params;
  const toast = useToast();
  const [addItem, setAddItem] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAllTrackers = async () => {
    try {
      const response = await allTrackers(pid);
      setTrackers(response.data);
    } catch (err) {
      setError("Failed to load Tracker");
    } finally {
      setLoading(false);
    }
  };
  const updateNameHandler = async (id, value) => {
    try {
      await updateTracker(pid, id, { name: value });

      toast({
        title: "Edit Tracker Successfully!",
        description: "This Tracker has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllTrackers();
    } catch (error) {
      console.error("Error during edit Tracker:", error);
      toast({
        title: "Edit Tracker Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsLoading(false);
    }
  };
  const deleteTrackerHandler = async (id) => {
    try {
      await deleteTracker(pid, id);
      toast({
        title: "Delete Tracker Successfully!",
        description: "This Tracker has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllTrackers();
    } catch (error) {
      console.error("Error during deleting this Tracker:", error);
      toast({
        title: "Delete Tracker Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsLoading(false);
    }
  };
  const updateColorHandler = async (id, value) => {
    try {
      await updateTracker(pid, id, { color: value });
      toast({
        title: "Edit Tracker Successfully!",
        description: "This Tracker has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllTrackers();
    } catch (error) {
      console.error("Error during edit Tracker:", error);
      toast({
        title: "Edit Tracker Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllTrackers();
  }, []);
  const addItemClick = () => {
    if (!addItem) {
      setAddItem(true);
    }
  };
  const addTrackerCancel = () => {
    setAddItem(null);
  };
  const addTrackerSubmit = async (value) => {
    if (value.trim()) {
      try {
        const newTracker = { name: value.trim(), color: "gray" };
        const addedNote = await addNewTracker(pid, newTracker);
        fetchAllTrackers();
        setAddItem(null);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Flex flexDir={"column"} mx="8" w="100%">
      <Flex align={"center"} mb="8" w="100%" gap="4">
        <Flex direction="row" align="start">
          <Heading size="md" mb={2} mr={4}>
            Manage Tracker
          </Heading>
          <SquarePlus grow="start" onClick={addItemClick} />
        </Flex>
      </Flex>
      <Box w="100%">
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Trackers</Th>
                <Th>Color</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {addItem ? (
                <>
                  <Tr key={-1}>
                    <Td>*</Td>
                    <Td colSpan="3">
                      <AddLine
                        size="sm"
                        value={"Add new tracker"}
                        onCancel={addTrackerCancel}
                        onFinish={(value) => {
                          addTrackerSubmit(value);
                        }}
                      />
                    </Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {trackers.map((tracker) => (
                <Tr key={tracker.id}>
                  <Td>{tracker.id}</Td>
                  <Td>
                    <EditLine
                      size="xm"
                      value={tracker.name}
                      onFinish={(value) => {
                        updateNameHandler(tracker.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ColorMenu
                      color={tracker.color ?? false}
                      onFinish={(value) => {
                        updateColorHandler(tracker.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ConfirmDeleteModal
                      message={`Are you sure you want to delete tracker "${tracker.name}"?`}
                      onConfirm={() => {
                        deleteTrackerHandler(tracker.id);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
