"use client";
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
  Avatar,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  useEditableControls,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { updateIssue } from "../../../../../services/API/issueAPI";
import { updateComment } from "../../../../../services/API/commentAPI";
import { useState, useEffect } from "react";
import IssuceProgress from "../../../../../Components/project/issue/detail/Progress";
import { Pencil, Check, X } from "lucide-react";
import { getSingleIssueById } from "../../../../../services/API/issueAPI";
export default function IssueDetailPage() {
  const params = useParams();
  const { pid, id } = params;
  const [issue, setIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [progress, setProgress] = useState(issue.progress || 0);
  const [assignedTo, setAssignedTo] = useState(
    issue.Owner?.name || "Not assigned"
  );
  const [startDate, setStartDate] = useState(issue.start || "");
  const [dueDate, setDueDate] = useState(issue.end || "");
  const [priority, setPriority] = useState(issue.Priority?.name || "Medium");
  const [tracker, setTracker] = useState(issue.Tracker?.name || "Task");
  const [status, setStatus] = useState(issue.Status || "Open");
  const fetchIssueById = async () => {
    try {
      const response = await getSingleIssueById(pid, id);
      const issueData = response.data.Issue;

      const commentsData = response.data.Comment;
      console.log(issueData);

      setIssue(issueData);
      setComments(commentsData);
      setAssignedTo(issueData.Owner?.name || "Not assigned");
      setStartDate(issueData.start || "");
      setDueDate(issueData.end || "");
      setPriority(issueData.Priority?.name || "Medium");
      setTracker(issueData.Tracker?.name || "Task");
      setStatus(issueData.Status || "Open");
      setProgress(issueData.progress || 0);
    } catch (err) {
      console.error("Failed to fetch issue:", err);
    }
  };

  useEffect(() => {
    fetchIssueById();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedIssue = await updateIssue(pid, id, "status", newStatus);
      console.log("Updated Issue:", updatedIssue);
      setIssue(updatedIssue);
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: comments.length + 1,
      author: "Current User",
      content: comment,
      parentCommentId: replyingTo,
    };
    setComments([...comments, newComment]);
    setComment("");
    setReplyingTo(null);
  };
  const handleEditComment = async (commentId, updatedContent) => {
    try {
      await updateComment(pid, id, commentId, updatedContent);

      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, content: updatedContent } : c
      );
      setComments(updatedComments);
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
    const parentComment = comments.find((c) => c.id === commentId);
    setComment(parentComment.content);
  };

  const [checklist, setChecklist] = useState([false, false, false]);

  const handleCheckboxChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup
        justifyContent="center"
        alignContent={"center"}
        mx="4"
        size="sm">
        <IconButton icon={<Check />} {...getSubmitButtonProps()} />
        <IconButton icon={<X />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <ButtonGroup
        justifyContent="center"
        alignContent={"center"}
        mx="4"
        size="sm">
        <IconButton size="sm" icon={<Pencil />} {...getEditButtonProps()} />
      </ButtonGroup>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Editable
          defaultValue={issue.name || "Untitled Issue"}
          fontSize="2xl"
          fontWeight="bold"
          isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls />
        </Editable>
        <Badge colorScheme={status === "Open" ? "green" : "red"}>
          {status}
        </Badge>
      </Flex>

      {/* Issue Info */}
      <VStack align="start" spacing={4} mb={6}>
        <HStack>
          <Text fontWeight="bold">Assigned to: </Text>
          <HStack spacing={2}>
            <Menu>
              <MenuButton as={Avatar} bgColor="transparent" size="sm" mr={4}>
                <Avatar name={assignedTo} size="sm" mr={4} />
              </MenuButton>
              <Text>{assignedTo}</Text>
            </Menu>
          </HStack>
        </HStack>
        <Flex w="100%" gap="4">
          <Flex alignItems={"start"} flexDir={"column"} minW="50%" gap="4">
            <HStack w="100%">
              <Text fontWeight="bold">Start Date:</Text>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="sm"
                w="50%"
              />
            </HStack>
            <HStack>
              <Text fontWeight="bold">Due Date:</Text>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                size="sm"
                w="60%"
              />
            </HStack>
          </Flex>
          <Flex alignItems={"start"} flexDir={"column"} minW="50%" gap="4">
            <HStack>
              <Text fontWeight="bold">Priority:</Text>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                size="sm"
                width="auto">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Tracker:</Text>
              <Select
                value={tracker}
                onChange={(e) => setTracker(e.target.value)}
                size="sm"
                width="auto">
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="Task">Task</option>
              </Select>
            </HStack>
          </Flex>
        </Flex>
      </VStack>

      {/* Progress Bar */}
      <IssuceProgress percent={progress} />

      {/* Issue Description */}
      <Box mt={6}>
        <Heading size="md" mb={2}>
          Description
        </Heading>
        <Editable
          defaultValue={issue.description || "No description available."}
          fontSize="sm"
          isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls />
        </Editable>
      </Box>

      <Divider mt={6} />

      {/* Checklist */}
      <Box mt={6}>
        <Heading size="md" mb={2}>
          Checklist
        </Heading>
        <CheckboxGroup value={checklist} onChange={setChecklist}>
          <VStack align="start" spacing={2}>
            <Checkbox
              isChecked={checklist[0]}
              onChange={() => handleCheckboxChange(0)}>
              Verify the login button functionality.
            </Checkbox>
            <Checkbox
              isChecked={checklist[1]}
              onChange={() => handleCheckboxChange(1)}>
              Test edge cases with incorrect credentials.
            </Checkbox>
            <Checkbox
              isChecked={checklist[2]}
              onChange={() => handleCheckboxChange(2)}>
              Fix the form freeze issue and test for performance.
            </Checkbox>
          </VStack>
        </CheckboxGroup>
      </Box>

      <Divider mt={6} />

      {/* Notes Section */}
      <Box mt={6}>
        <Heading size="md" mb={2}>
          Notes
        </Heading>
        <Editable
          defaultValue="Ensure all edge cases are covered during testing. This issue should be resolved before the upcoming release."
          fontSize="sm"
          isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls />
        </Editable>
      </Box>

      <Divider mt={6} />

      {/* Comments Section */}
      <Box mt={6}>
        <VStack align="start" spacing={4}>
          {comments
            .filter((c) => c.parentCommentId === null)
            .map((comment) => (
              <Box
                key={comment.id}
                w="full"
                p={4}
                borderWidth={1}
                borderRadius="md"
                boxShadow="md">
                <Text fontWeight="bold">{comment.author}</Text>
                <Text>{comment.content}</Text>
                <Button
                  variant="link"
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleReplyClick(comment.id)}>
                  Reply
                </Button>
                <Button
                  variant="link"
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </Button>

                {/* If replying to this comment, show the reply input */}
                {replyingTo === comment.id && (
                  <Box mt={4}>
                    <Textarea
                      placeholder="Write a reply..."
                      value={comment}
                      onChange={handleCommentChange}
                      size="sm"
                    />
                    <Button
                      mt={2}
                      onClick={handleAddComment}
                      colorScheme="blue">
                      Reply
                    </Button>
                  </Box>
                )}

                {/* Render nested replies if they exist */}
                {comments
                  .filter((c) => c.parentCommentId === comment.id) // Filter replies to this comment
                  .map((reply) => (
                    <Box
                      key={reply.id}
                      ml={6}
                      mt={4}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      boxShadow="md">
                      <Text fontWeight="bold">{reply.author}</Text>
                      <Text>{reply.content}</Text>
                      <Button
                        variant="link"
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteComment(reply.id)}>
                        Delete
                      </Button>
                    </Box>
                  ))}
              </Box>
            ))}
        </VStack>

        <Divider mt={6} />

        {/* Main Comment Input */}
        <Box mt={6}>
          {/* If replying, set the parent comment's content in the textarea */}
          <Textarea
            placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
            value={comment}
            onChange={handleCommentChange}
            size="sm"
          />
          <Button mt={2} onClick={handleAddComment} colorScheme="blue">
            {replyingTo ? "Reply" : "Add Comment"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
