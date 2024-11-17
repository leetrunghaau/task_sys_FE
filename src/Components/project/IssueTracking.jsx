"use client";
import { useState } from "react";
import {
  Heading,
  Input,
  Button,
  VStack,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import IssueItem from "./IssueItem";

export default function IssueTracking() {
  const [issues, setIssues] = useState([
    { id: 1, title: "Login page not responsive", status: "open" },
    { id: 2, title: "API rate limiting", status: "closed" },
  ]);
  const [newIssue, setNewIssue] = useState("");

  const addIssue = (e) => {
    e.preventDefault();
    if (newIssue.trim()) {
      setIssues([
        ...issues,
        { id: Date.now(), title: newIssue.trim(), status: "open" },
      ]);
      setNewIssue("");
    }
  };

  const toggleIssueStatus = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? { ...issue, status: issue.status === "open" ? "closed" : "open" }
          : issue
      )
    );
  };

  return (
    <Flex
      shadow="xl"
      flexDir="column"
      p="4"
      borderColor="gray.200"
      borderWidth={"1px"}
      rounded={"lg"}
      gap="6">
      <Heading>Issue Tracking</Heading>
      <FormControl isRequired>
        <Flex gap="4">
          <Input placeholder="Add new task" />
          <Button type="submit" leftIcon={<PlusIcon />} onClick={addIssue}>
            Add Issue
          </Button>
        </Flex>
      </FormControl>

      <VStack spacing={4}>
        {issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            toggleIssueStatus={toggleIssueStatus}
          />
        ))}
      </VStack>
    </Flex>
  );
}
