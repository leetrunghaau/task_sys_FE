"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Trash2, Edit, SquarePlus } from "lucide-react";
import { Flex, Text, HStack, Input, Button, Box, Heading, VStack, useToast, Avatar } from "@chakra-ui/react";
import ConfirmDeleteModal from "../../../../Components/utils/ConfirmDeleteModal"
import {
    readsComments,
    addNewComment,
    updateComment,
    deleteComment,
} from "../../../../services/API/commentAPI";
import { getUserProfile } from "../../../../services/API/authAPI"
import moment from "moment";

export default function Comments() {
    const params = useParams();
    const { pid, id } = params;
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState(null)
    const [newComment, setNewComment] = useState("");
    const [reply, setReply] = useState("");
    const [activeCommentId, setActiveCommentId] = useState(null);

    const [error, setError] = useState(null);
    const [repliedToCommentId, setRepliedToCommentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchComments = async () => {
        try {
            const response = await readsComments(pid, id);
            if (response && response.data) {
                setComments(response.data);
            } else {
                throw new Error("No data found");
            }
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects");
            setComments([]);
        } finally {
            setLoading(false);
        }
    };
    const fetchProfile = async () => {
        try {
            const response = await getUserProfile();
            setProfile(response.data);
        } catch (err) {
            console.error("Failed to load profile", err);
        }
    };
    //Comment
    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const newCommentReq = { value: newComment.trim() };
                await addNewComment(pid, id, newCommentReq);
                setNewComment("");
                fetchComments();
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
    const handleAddReply = async (commentId) => {
        if (reply.trim()) {
            try {
                const newReplyReq = { value: reply.trim(), parentId: commentId };
                await addNewComment(pid, id, newReplyReq);
                setReply("");
                setActiveCommentId(null)
                fetchComments();
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
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(pid, id, commentId);
            fetchComments();
            toast({
                title: "Comment deleted.",
                description: "Your comment has been successfully deleted.",
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
    const handleReplyClick = (commentId) => {
        setRepliedToCommentId(commentId);
    };

    useEffect(() => {
        fetchProfile();
        fetchComments();
    }, [pid, id]);


    return (
        <Box w="100%" p={4} border="1px solid #ddd" borderRadius="md" boxShadow="md">
            {/* Main Comment Input */}
            <VStack align="stretch" spacing={4}>
                <HStack spacing={3} w="100%">
                    <Avatar size="sm" name={profile?.name ?? ""} />
                    <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        size="md"
                        w="100%"
                    />
                    <Button colorScheme="blue" size="sm" onClick={handleAddComment}>
                        Comment
                    </Button>
                </HStack>

                {/* Display Comments */}
                <VStack align="stretch" spacing={4}>
                    {comments.map((comment) => (
                        <Box key={comment.id} p={3} border="1px solid #ddd" borderRadius="md">
                            <Flex flexDir={"row"} justify={"space-between"}>
                                <Flex align="center" gap={3}>
                                    <Avatar size="sm" name={comment.User.name} />
                                    <Box>
                                        <Flex flexDir='row'>
                                            <Text fontWeight="bold">{comment.User.name}</Text>
                                            <Text color='GrayText' fontSize='sm' ml={5}>{moment(comment.created).format("DD-MM-YYYY")}</Text>
                                        </Flex>
                                        <Text>{comment.value}</Text>
                                    </Box>
                                </Flex>
                                {comment.User.email == profile.email ?
                                    <ConfirmDeleteModal
                                        message={`Are you sure you want to delete this comment ?`}
                                        onConfirm={() => { handleDeleteComment(comment.id) }}
                                    /> : <></>
                                }
                            </Flex>
                            <Button
                                size="xs"
                                colorScheme="gray"
                                mt={2}
                                onClick={() => setActiveCommentId(comment.id)}
                            >
                                Reply
                            </Button>


                            {/* Reply Input Field */}
                            {activeCommentId === comment.id && (
                                <HStack spacing={3} mt={2} w="100%">
                                    <Avatar size="sm" name={profile?.name ?? ""} />
                                    <Input
                                        placeholder="Write a reply..."
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        size="sm"
                                        w="100%"
                                    />
                                    <Button colorScheme="blue" size="sm" onClick={() => handleAddReply(comment.id)}>
                                        Reply
                                    </Button>

                                </HStack>
                            )}

                            {/* Display Replies */}
                            <VStack align="stretch" spacing={2} mt={3} pl={5}>
                                {comment.Chillrend.map((reply) => (
                                    <Box key={reply.id}>
                                        <Flex flexDir={"row"} justify={"space-between"}>
                                            <Flex align="center" gap={3}>
                                                <Avatar size="sm" name={reply.User.name} />
                                                <Box>
                                                    <Flex flexDir='row'>
                                                        <Text fontWeight="bold">{reply.User.name}</Text>
                                                        <Text color='GrayText' fontSize='sm' ml={5}>{moment(reply.created).format("DD-MM-YYYY")}</Text>
                                                    </Flex>
                                                    <Text>{reply.value}</Text>
                                                </Box>

                                            </Flex>
                                            {reply.User.email == profile.email ?
                                                <ConfirmDeleteModal
                                                    message={`Are you sure you want to delete this reply ?`}
                                                    onConfirm={() => { handleDeleteComment(reply.id) }}
                                                /> : <></>
                                            }
                                        </Flex>

                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );

}
