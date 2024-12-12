"use client";

import { useParams } from "next/navigation";
import {
    readNotes,
    addNotes,
    deleteNoteContent,
    updateNoteContent,
} from "../../../../services/API/noteAPI";
import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, HStack, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { Trash2, Edit, SquarePlus } from "lucide-react";
import EditLine from '../../../utils/EditLine';
import AddLine from '../../../utils/AddLine';
export default function Notes() {
    const params = useParams();
    const { pid, id } = params;
    const [addNote, setAddNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();


    const fetchNotes = async () => {
        try {
            const response = await readNotes(pid, id);
            if (response && response.data) {
                setNotes(response.data);
            } else {
                throw new Error("No data found");
            }
        } catch (err) {
            console.error("Error fetching projects:", err); 
            setError("Failed to load projects");
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    const addNoteClick = () => {
        if (!addNote) {
            setAddNote(true)
        }
    }
    const addNoteCancel = () => {
        setAddNote(null);
    };
    const addNoteSubmit = async (value) => {
        if (value.trim()) {
            try {
                const newNote = { content: value.trim() };
                const addedNote = await addNotes(pid, id, newNote);
                fetchNotes()
                setAddNote(null);
            } catch (error) {
                console.error("Error adding note:", error);
            }
        }
    };
    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNoteContent(pid, id, noteId);
            fetchNotes()
            toast({
                title: "Note deleted.",
                description: "The note has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
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


    const updateNoteSubmit = async (noteId, value) => {
        if (value.trim()) {
            try {
                await updateNoteContent(pid, id, noteId, value.trim());
                fetchNotes()
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


    useEffect(() => {
        fetchNotes();
    }, [pid, id]);

    return (
        <Box mt={6}>
            <Flex direction="row" align="start">
                <Heading size="md" mb={2} mr={4}>
                    Notes
                </Heading>
                <SquarePlus onClick={addNoteClick} />
            </Flex>
            <VStack align="start" spacing={4}>
                {notes.map((note) => (
                    <Flex
                        justify="flex-start" 
                        align="center" 
                        width="100%" 
                        gap={2} 
                        key={note.id}
                    >
                        <EditLine
                            size="sm"
                            area={true}
                            value={note.content ?? "Missing Content"}
                            onFinish={(value) => { updateNoteSubmit(note.id,value) }}
                        />
                        <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => handleDeleteNote(note.id)}
                        >
                            <Trash2 size="16" />
                        </Button>
                    </Flex>
                ))}
                {addNote ?
                    <AddLine
                        value={"Add new note"}
                        onCancel={addNoteCancel}
                        onFinish={(value) => { addNoteSubmit(value) }}
                    /> : <></>}
            </VStack>
        </Box>
    )
}