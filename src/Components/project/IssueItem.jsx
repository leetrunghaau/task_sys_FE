import { Flex, Button, Text } from "@chakra-ui/react";
import { CheckIcon, AlertCircleIcon } from "lucide-react";

export default function IssueItem({ issue, toggleIssueStatus }) {
  return (
    <Flex
      p={2}
      bg="gray.100"
      borderRadius="md"
      alignItems="center"
      justifyContent="space-between"
      w="100%">
      <Flex alignItems="center">
        {issue.status === "open" ? (
          <AlertCircleIcon className="h-4 w-4" color="red" />
        ) : (
          <CheckIcon className="h-4 w-4" color="green" />
        )}
        <Text ml={2}>{issue.title}</Text>
      </Flex>
      <Button size="sm" onClick={() => toggleIssueStatus(issue.id)}>
        {issue.status === "open" ? "Close" : "Reopen"}
      </Button>
    </Flex>
  );
}
