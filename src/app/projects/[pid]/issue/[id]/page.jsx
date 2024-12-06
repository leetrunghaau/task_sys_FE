"use client";
import { Box, Heading, Text, Flex, Badge, Button, VStack, HStack, Divider, Avatar, Input, Textarea, Progress, Checkbox, CheckboxGroup, Spacer, Select, Editable, EditableInput, EditablePreview, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useState } from 'react';

export default function IssueDetailPage() {
    const [comment, setComment] = useState('');
    const [progress, setProgress] = useState(40); // Tiến độ công việc
    const [checklist, setChecklist] = useState([false, false, false]); // Trạng thái các task trong checklist
    const [assignedTo, setAssignedTo] = useState("John Doe");
    const [startDate, setStartDate] = useState("Dec 1, 2024");
    const [dueDate, setDueDate] = useState("Dec 15, 2024");
    const [priority, setPriority] = useState("High");
    const [tracker, setTracker] = useState("Bug");
    const [status, setStatus] = useState("Open");

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleCheckboxChange = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index] = !newChecklist[index];
        setChecklist(newChecklist);
    };

    return (
        <Box maxW="1200px" mx="auto" p={5}>
            {/* Header with Editable Issue Title */}
            <Flex justify="space-between" align="center" mb={4}>
                <Editable defaultValue="Fix Bug in Login Form" fontSize="2xl" fontWeight="bold">
                    <EditablePreview />
                    <EditableInput />
                </Editable>
                <Badge colorScheme={status === "Open" ? "green" : "red"}>{status}</Badge>
            </Flex>

            {/* Issue Info */}
            <VStack align="start" spacing={4} mb={6}>
                <HStack>
                    <Text fontWeight="bold">Assigned to:</Text>
                    <Menu>
                        <MenuButton as={Button} bgColor="transparent" size="sm">
                            <Avatar name="John a Doe" size="sm" mr={4} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Assigned to:</Text>
                    <HStack spacing={2}>
                        <Menu>
                            <MenuButton as={Avatar} size="sm" name="John a Doe">
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                        </Menu>
                        <Text>John Doe</Text>
                    </HStack>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Start Date:</Text>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="sm" />
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Due Date:</Text>
                    <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} size="sm" />
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Priority:</Text>
                    <Select value={priority} onChange={(e) => setPriority(e.target.value)} size="sm" width="auto">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Tracker:</Text>
                    <Select value={tracker} onChange={(e) => setTracker(e.target.value)} size="sm" width="auto">
                        <option value="Bug">Bug</option>
                        <option value="Feature">Feature</option>
                        <option value="Task">Task</option>
                    </Select>
                </HStack>
            </VStack>

            {/* Progress Bar */}
            {/* <IssuceProgress percent={40} /> */}

            {/* Issue Description */}
            <Box mt={6}>
                <Heading size="md" mb={2}>Description</Heading>
                <Editable defaultValue="This bug causes the login form to freeze when the user enters incorrect credentials." fontSize="sm">
                    <EditablePreview />
                    <EditableInput as={Textarea} />
                </Editable>
            </Box>

            <Divider mt={6} />

            {/* Checklist */}
            <Box mt={6}>
                <Heading size="md" mb={2}>Checklist</Heading>
                <CheckboxGroup value={checklist} onChange={setChecklist}>
                    <VStack align="start" spacing={2}>
                        <Checkbox isChecked={checklist[0]} onChange={() => handleCheckboxChange(0)}>
                            Verify the login button functionality.
                        </Checkbox>
                        <Checkbox isChecked={checklist[1]} onChange={() => handleCheckboxChange(1)}>
                            Test edge cases with incorrect credentials.
                        </Checkbox>
                        <Checkbox isChecked={checklist[2]} onChange={() => handleCheckboxChange(2)}>
                            Fix the form freeze issue and test for performance.
                        </Checkbox>
                    </VStack>
                </CheckboxGroup>
            </Box>

            <Divider mt={6} />

            {/* Notes Section */}
            <Box mt={6}>
                <Heading size="md" mb={2}>Notes</Heading>
                <Editable defaultValue="Ensure all edge cases are covered during testing. This issue should be resolved before the upcoming release." fontSize="sm">
                    <EditablePreview />
                    <EditableInput as={Textarea} />
                </Editable>
            </Box>

            <Divider mt={6} />

            {/* Comments Section */}
            <Box mt={6}>
                <Heading size="md" mb={2}>Comments</Heading>
                <VStack align="start" spacing={4}>
                    <Box w="full" p={4} borderWidth={1} borderRadius="md">
                        <HStack>
                            <Avatar size="sm" name="Jane Smith" />
                            <Text fontWeight="bold">Jane Smith</Text>
                        </HStack>
                        <Text mt={2}>I have started working on this issue and will provide updates soon.</Text>
                    </Box>
                    {/* Input to add comment */}
                    <Box w="full" p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                        <Textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            size="sm"
                        />
                        <Button mt={2} colorScheme="blue" onClick={() => alert('Comment added!')}>
                            Add Comment
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </Box >
    );
};

