"use client";
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Divider,
  Badge,
  Heading,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react"; // Import Edit icon
import { getSingleIssueById } from "../../../../../services/API/issueAPI";
import StatusBadge from "../../../../../Components/project/issue/detail/StatusBadge";
import AssigneeModal from "../../../../../Components/project/issue/detail/AssigneeModal";
import DateUpdateForm from "../../../../../Components/project/issue/detail/DateUpdateForm";
import {
  addNewComment,
  updateComment,
  deleteComment,
} from "../../../../../services/API/commentAPI";
import {
  addNotes,
  deleteNoteContent,
  updateNoteContent,
} from "../../../../../services/API/noteAPI";
import { createSingleChecklist } from "../../../../../services/API/checkListAPI";

export default function IssueDetailPage() {
  const params = useParams();
  const { pid, id } = params;
  const [issueData, setIssueData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [repliedToCommentId, setRepliedToCommentId] = useState(null);
  const [newChecklistInput, setNewChecklistInput] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const toast = useToast();

  const fetchIssue = async () => {
    try {
      const data = await getSingleIssueById(pid, id);
      setIssueData(data.data);
      setNotes(data.data?.Note || []);
      setChecklistItems(data.data?.Checklist || []);

      setComments(data.data?.Comment || []);
      console.log(data.data.CheckList);
    } catch (err) {
      console.error("Error fetching issue:", err);
      setError(err.message || "Failed to fetch issue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [pid, id]);

  //Note
  const handleAddNote = async () => {
    if (noteInput.trim()) {
      try {
        const newNote = { content: noteInput.trim() };
        const addedNote = await addNotes(pid, id, newNote);
        setNotes([...notes, addedNote]);
        setNoteInput("");
        fetchIssue();
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNoteContent(pid, id, noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
      toast({
        title: "Note deleted.",
        description: "The note has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchIssue();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error deleting note.",
        description: "There was an issue deleting the note. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditNote = (noteId, content) => {
    setEditingNoteId(noteId);
    setEditingContent(content);
  };

  const handleUpdateNote = async () => {
    if (editingContent.trim()) {
      try {
        await updateNoteContent(pid, id, editingNoteId, editingContent.trim());

        setNotes(
          notes.map((note) =>
            note.id === editingNoteId
              ? { ...note, content: editingContent.trim() }
              : note
          )
        );
        setEditingNoteId(null);
        setEditingContent("");

        toast({
          title: "Note updated.",
          description: "The note has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating note:", error);

        toast({
          title: "Error updating note.",
          description:
            "There was an issue updating the note. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  //Comment
  const handleAddComment = async () => {
    if (commentInput.trim()) {
      try {
        const newComment = { value: commentInput.trim() };
        await addNewComment(pid, id, newComment);
        setCommentInput("");
        fetchIssue();
        toast({
          title: "Comment added.",
          description: "Your comment has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error adding comment:", error);
        toast({
          title: "Error adding comment.",
          description:
            "There was an issue adding your comment. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  //Add Reply
  const handleAddReply = async () => {
    if (replyInput.trim()) {
      try {
        const newReply = { value: replyInput.trim() };
        await addNewComment(pid, id, newReply, repliedToCommentId);
        setReplyInput("");
        setRepliedToCommentId(null);
        fetchIssue();
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };
  const handleReplyClick = (commentId) => {
    setRepliedToCommentId(commentId);
  };
  // Handle Edit Comment
  const handleEditComment = (commentId, commentValue) => {
    setEditingCommentId(commentId);
    setEditingComment(commentValue);
  };

  const handleUpdateComment = async () => {
    if (editingComment.trim()) {
      try {
        const updatedComment = await updateComment(pid, id, editingCommentId, {
          value: editingComment.trim(),
        });
        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, value: editingComment.trim() }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditingComment("");
        toast({
          title: "Comment updated.",
          description: "Your comment has been updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating comment:", error);
        toast({
          title: "Error updating comment.",
          description:
            "There was an issue updating your comment. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(pid, id, commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast({
        title: "Comment deleted.",
        description: "The comment has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error deleting comment.",
        description:
          "There was an issue deleting the comment. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  //Check list
  const handleAddChecklist = async () => {
    if (newChecklistInput.trim()) {
      try {
        const newChecklistItem = {
          name: newChecklistInput.trim(),
          checked: false,
        };
        await createSingleChecklist(pid, id, newChecklistItem);
        setNewChecklistInput("");
        fetchIssue();
        toast({
          title: "Checklist item added.",
          description: "The checklist item has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error adding checklist item:", error);
        toast({
          title: "Error adding checklist item.",
          description:
            "There was an issue adding the checklist item. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  if (loading) return <p>Loading issue details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!issueData) return <p>No issue data found.</p>;

  const { Issue } = issueData;
  const issue = Issue || {};
  const formattedCreatedDate = issue.created
    ? new Date(issue.created).toISOString().split("T")[0]
    : "";
  const formattedStartDate = issue.start
    ? new Date(issue.start).toISOString().split("T")[0]
    : "";
  const formattedEndDate = issue.end
    ? new Date(issue.end).toISOString().split("T")[0]
    : "";

  return (
    <Box w="100%" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading fontSize="2xl" fontWeight="bold">
          {issue.name || "Unknown"}
        </Heading>
        <Flex align="center" gap="4">
          <StatusBadge status={issue.Status} pid={pid} issueId={id} />
          <Badge px={4} py={2} borderRadius="md" colorScheme="orange">
            {issue.Priority?.name || "N/A"}
          </Badge>
          <Badge px={4} py={2} borderRadius="md" colorScheme="red">
            {issue.Tracker?.name || "N/A"}
          </Badge>
        </Flex>
      </Flex>
      <VStack align="start" spacing={4} mb={6}>
        <HStack>
          <AssigneeModal
            Assignee={issue.Assignee}
            pid={pid}
            id={id}
            fetchIssue={fetchIssue}
          />
        </HStack>
        <DateUpdateForm
          formattedCreatedDate={formattedCreatedDate}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
          issueId={id}
          pid={pid}
        />
      </VStack>
      {/* <IssuceProgress percent={issue.progress || 0} /> */}

      <Divider mt={6} />

      {/* <Box mt={6}>
        <Heading size="md" mb={2}>
          Checklist
        </Heading>
        {checklistItems.map((checklist, index) => (
          <Checkbox key={index} isChecked={checklist.checked}>
            {checklist.name}
          </Checkbox>
        ))}
        {checklistItems.map((checklist, index) => (
          <Text key={index} isChecked={checklist.checked}>
            {checklist.name}
          </Text>
        ))}
        <Input
          placeholder="Add a new checklist item"
          value={newChecklistInput}
          onChange={(e) => setNewChecklistInput(e.target.value)}
        />
        <Button mt={2} colorScheme="blue" onClick={handleAddChecklist}>
          Add Checklist
        </Button>
      </Box> */}

      <Divider mt={6} />

      <Box mt={6}>
        <Heading size="md" mb={2}>
          Notes
        </Heading>

        <VStack align="start" spacing={4}>
          {notes.map((note) => (
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              key={note.id}>
              {editingNoteId === note.id ? (
                <Input
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <Text fontSize="sm">{note?.content || "Missing Content"}</Text>
              )}
              <HStack>
                <Button
                  size="xs"
                  colorScheme="red"
                  leftIcon={<Trash2 size="16" />}
                  onClick={() => handleDeleteNote(note.id)}>
                  Delete Note
                </Button>
                {editingNoteId === note.id ? (
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={handleUpdateNote}>
                    Save
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    colorScheme="yellow"
                    leftIcon={<Edit size="16" />}
                    onClick={() => handleEditNote(note.id, note.content)}>
                    Edit
                  </Button>
                )}
              </HStack>
            </Flex>
          ))}

          <Input
            placeholder="Add a new note"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
          <Button mt={2} colorScheme="blue" onClick={handleAddNote}>
            Add Note
          </Button>
        </VStack>
      </Box>
      <Box mt={6}>
        <Heading size="md" mb={2}>
          Comments
        </Heading>
        <VStack align="start" spacing={4}>
          {comments.map((comment) => (
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              key={comment.id}>
              {editingCommentId === comment.id ? (
                <Input
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                />
              ) : (
                <Text fontSize="sm">{comment.value || "Missing Content"}</Text>
              )}
              <HStack>
                {editingCommentId === comment.id ? (
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={handleUpdateComment}>
                    Save
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    colorScheme="yellow"
                    leftIcon={<Edit size="16" />}
                    onClick={() =>
                      handleEditComment(comment.id, comment.value)
                    }>
                    Edit
                  </Button>
                )}
                <Button
                  size="xs"
                  colorScheme="red"
                  leftIcon={<Trash2 size="16" />}
                  onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </Button>
              </HStack>
            </Flex>
          ))}

          <Input
            placeholder="Add a new comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button mt={2} colorScheme="blue" onClick={handleAddComment}>
            Add Comment
          </Button>
        </VStack>
      </Box>

      <Divider mt={6} />
    </Box>
  );
}
