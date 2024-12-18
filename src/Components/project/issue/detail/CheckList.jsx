"use client";

import { useParams } from "next/navigation";
import {
  readChecklists,
  createSingleChecklist,
  updateChecklistItem,
  deleteChecklistItem,
} from "../../../../services/API/checkListAPI";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Checkbox,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Trash2, SquarePlus } from "lucide-react";
import EditLine from "../../../utils/EditLine";
import AddLine from "../../../utils/AddLine";
export default function CheckList({ onFinish }) {
  const params = useParams();
  const { pid, id } = params;
  const [addCheckList, setAddCheckList] = useState(null);
  const [checkLists, setCheckLists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchCheckLists = async () => {
    try {
      const response = await readChecklists(pid, id);
      onFinish();
      if (response && response.data) {
        setCheckLists(response.data);
      } else {
        throw new Error("No data found");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      setCheckLists([]);
    } finally {
      setLoading(false);
    }
  };

  const addCheckListClick = () => {
    if (!addCheckList) {
      setAddCheckList(true);
    }
  };
  const addCheckListCancel = () => {
    setAddCheckList(null);
  };
  const addCheckListSubmit = async (value) => {
    if (value.trim()) {
      try {
        const newCheckList = { name: value.trim() };
        const addedCheckList = await createSingleChecklist(
          pid,
          id,
          newCheckList
        );
        fetchCheckLists();
        setAddCheckList(null);
      } catch (error) {
        console.error("Error adding CheckList:", error);
      }
    }
  };
  const handleDeleteCheckList = async (checkListId) => {
    try {
      await deleteChecklistItem(pid, id, checkListId);
      fetchCheckLists();
      toast({
        title: "CheckList deleted.",
        description: "The CheckList has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting CheckList:", error);
      toast({
        title: "Error deleting CheckList.",
        description:
          "There was an issue deleting the CheckList. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateCheckListSubmit = async (checkListId, value) => {
    if (value.trim()) {
      try {
        await updateChecklistItem(pid, id, checkListId, { name: value.trim() });
        fetchCheckLists();
        toast({
          title: "CheckList updated.",
          description: "The CheckList has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating CheckList:", error);
        toast({
          title: "Error updating CheckList.",
          description:
            "There was an issue updating the CheckList. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  const checkedClick = async (checkListId, value) => {
    try {
      await updateChecklistItem(pid, id, checkListId, { checked: value });
      fetchCheckLists();
      toast({
        title: "CheckList updated.",
        description: "The CheckList has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating CheckList:", error);
      toast({
        title: "Error updating CheckList.",
        description:
          "There was an issue updating the CheckList. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchCheckLists();
  }, [pid, id]);

  return (
    <Box mt={6}>
      <Flex direction="row" align="start">
        <Heading size="md" mb={2} mr={4}>
          CheckLists
        </Heading>
        <SquarePlus cursor={"pointer"} onClick={addCheckListClick} />
      </Flex>
      <VStack align="start" spacing={4}>
        {checkLists.map((checkList) => (
          <Flex
            justify="flex-start"
            align="center"
            width="100%"
            gap={2}
            key={checkList.id}>
            <Checkbox
              defaultChecked={checkList.checked ?? false}
              onChange={(e) => {
                checkedClick(checkList.id, e.target.checked);
              }}
            />
            <EditLine
              size="sm"
              area={true}
              value={checkList.name ?? "Missing Content"}
              onFinish={(value) => {
                updateCheckListSubmit(checkList.id, value);
              }}
            />
            <Button
              variant="ghost"
              size="xs"
              colorScheme="red"
              onClick={() => handleDeleteCheckList(checkList.id)}>
              <Trash2 size="16" />
            </Button>
          </Flex>
        ))}
        {addCheckList ? (
          <AddLine
            size="lg"
            value={"Add new CheckList"}
            onCancel={addCheckListCancel}
            onFinish={(value) => {
              addCheckListSubmit(value);
            }}
          />
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  );
}
