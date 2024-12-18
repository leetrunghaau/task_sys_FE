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
import { allStatuses } from "../../../../services/API/statusAPI";
import { useParams } from "next/navigation";
import { SquarePlus } from "lucide-react";

import ConfirmDeleteModal from "../../../../Components/utils/ConfirmDeleteModal";
import AddLine from "../../../../Components/utils/AddLine";
import EditLine from "../../../../Components/utils/EditLine";
import ColorMenu from "../../../../Components/utils/ColorMenu";

import {
  updateStatus,
  deleteStatus,
  addNewStatus,
} from "../../../../services/API/statusAPI";

export default function StatusPage() {
  const params = useParams();
  const { pid } = params;
  const toast = useToast();
  const [addItem, setAddItem] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAllStatuses = async () => {
    try {
      const response = await allStatuses(pid);
      setStatuses(response.data);
    } catch (err) {
      setError("Failed to load Status");
    } finally {
      setLoading(false);
    }
  };
  const updateNameHandler = async (id, value) => {
    try {
      await updateStatus(pid, id, { name: value });

      toast({
        title: "Edit Status Successfully!",
        description: "This Status has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllStatuses();
    } catch (error) {
      console.error("Error during edit Status:", error);
      toast({
        title: "Edit Status Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsLoading(false);
    }
  };
  const deleteStatusHandler = async (id) => {
    try {
      await deleteStatus(pid, id);
      toast({
        title: "Delete Status Successfully!",
        description: "This Status has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllStatuses();
    } catch (error) {
      console.error("Error during deleting this Status:", error);
      toast({
        title: "Delete Status Failed",
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
      await updateStatus(pid, id, { color: value });
      toast({
        title: "Edit Status Successfully!",
        description: "This Status has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllStatuses();
    } catch (error) {
      console.error("Error during edit Status:", error);
      toast({
        title: "Edit Status Failed",
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
    fetchAllStatuses();
  }, []);
  const addItemClick = () => {
    if (!addItem) {
      setAddItem(true);
    }
  };
  const addStatusCancel = () => {
    setAddItem(null);
  };
  const addStatusSubmit = async (value) => {
    if (value.trim()) {
      try {
        const newStatus = { name: value.trim(), color: "gray" };
        const addedNote = await addNewStatus(pid, newStatus);
        fetchAllStatuses();
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
      <Flex align={"center"} w="100%" gap="4" mb="8">
        <Flex direction="row" align="start">
          <Heading size="md" mb={2} mr={4}>
            Manage Status
          </Heading>
          <SquarePlus cursor={"pointer"} grow="start" onClick={addItemClick} />
        </Flex>
      </Flex>
      <Box w="100%">
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Statuses</Th>
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
                        value={"Add new status"}
                        onCancel={addStatusCancel}
                        onFinish={(value) => {
                          addStatusSubmit(value);
                        }}
                      />
                    </Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {statuses.map((status) => (
                <Tr key={status.id}>
                  <Td>{status.id}</Td>
                  <Td>
                    <EditLine
                      size="xm"
                      value={status.name}
                      onFinish={(value) => {
                        updateNameHandler(status.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ColorMenu
                      color={status.color ?? false}
                      onFinish={(value) => {
                        updateColorHandler(status.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ConfirmDeleteModal
                      message={`Are you sure you want to delete status "${status.name}"?`}
                      onConfirm={() => {
                        deleteStatusHandler(status.id);
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
