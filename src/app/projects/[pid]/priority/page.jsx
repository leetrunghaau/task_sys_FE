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
  updatePriority,
  deletePriority,
  addNewPriority,
  allPriorities,
} from "../../../../services/API/priorityAPI";

export default function PrioritiesPage() {
  const params = useParams();
  const { pid } = params;
  const toast = useToast();
  const [addItem, setAddItem] = useState(null);
  const [priorities, setPrioriries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAllPriority = async () => {
    try {
      const response = await allPriorities(pid);
      setPrioriries(response.data);
    } catch (err) {
      setError("Failed to load Priority");
    } finally {
      setLoading(false);
    }
  };
  const updateNameHandler = async (id, value) => {
    try {
      await updatePriority(pid, id, { name: value });

      toast({
        title: "Edit Priority Successfully!",
        description: "This Priority has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllPriority();
    } catch (error) {
      console.error("Error during edit Priority:", error);
      toast({
        title: "Edit Priority Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsLoading(false);
    }
  };
  const deletePriorityHandler = async (id) => {
    try {
      await deletePriority(pid, id);
      toast({
        title: "Delete Priority Successfully!",
        description: "This Priority has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllPriority();
    } catch (error) {
      console.error("Error during deleting this Priority:", error);
      toast({
        title: "Delete Priority Failed",
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
      await updatePriority(pid, id, { color: value });
      toast({
        title: "Edit Priority Successfully!",
        description: "This Priority has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchAllPriority();
    } catch (error) {
      console.error("Error during edit Priority:", error);
      toast({
        title: "Edit Priority Failed",
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
    fetchAllPriority();
  }, []);
  const addItemClick = () => {
    if (!addItem) {
      setAddItem(true);
    }
  };
  const addPriorityCancel = () => {
    setAddItem(null);
  };
  const addPrioritySubmit = async (value) => {
    if (value.trim()) {
      try {
        const newPriority = { name: value.trim(), color: "gray" };
        const addedNote = await addNewPriority(pid, newPriority);
        fetchAllPriority();
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
      <Flex direction="row" align="start" w="100%">
        <Heading size="md" mb={2} mr={4}>
          Manage Priority
        </Heading>
        <SquarePlus cursor={"pointer"} grow="start" onClick={addItemClick} />
      </Flex>

      <Box w="100%">
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Priorities</Th>
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
                        value={"Add new priority name"}
                        onCancel={addPriorityCancel}
                        onFinish={(value) => {
                          addPrioritySubmit(value);
                        }}
                      />
                    </Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {priorities.map((priority) => (
                <Tr key={priority.id}>
                  <Td>{priority.id}</Td>
                  <Td>
                    <EditLine
                      size="xm"
                      value={priority.name}
                      onFinish={(value) => {
                        updateNameHandler(priority.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ColorMenu
                      color={priority.color ?? false}
                      onFinish={(value) => {
                        updateColorHandler(priority.id, value);
                      }}
                    />
                  </Td>
                  <Td>
                    <ConfirmDeleteModal
                      message={`Are you sure you want to delete priority "${priority.name}"?`}
                      onConfirm={() => {
                        deletePriorityHandler(priority.id);
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
