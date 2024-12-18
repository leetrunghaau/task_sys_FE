"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { getSingleProjectById } from "../../services/API/projectAPI";
import { useState, useEffect } from "react";
export default function FilterDrawer({ pid, onFinish }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [owner, setOwner] = useState([]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await getSingleProjectById(pid);
      const data = response.data;
      console.log(data);

      setStatuses(
        data.status.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
      );
      setPriorities(
        data.priority.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
      );
      setTrackers(
        data.tracker.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
      );
      setAssignees(
        data.member.map((item) => {
          return {
            ...item.User,
            checked: false,
          };
        })
      );
      setOwner(
        data.member.map((item) => {
          return {
            ...item.User,
            checked: false,
          };
        })
      );
    } catch (err) {
      setError("Failed to load project.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    onFinish("log");
  }, [statuses, priorities, trackers, assignees, owner]);
  useEffect(() => {
    fetchProject();
  }, [pid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleStatusClick = (statusId) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === statusId
          ? { ...status, checked: !status.checked }
          : status
      )
    );
  };
  const handlePriorityClick = (priorityId) => {
    setPriorities((prevStatuses) =>
      prevStatuses.map((priority) =>
        priority.id === priorityId
          ? { ...priority, checked: !priority.checked }
          : priority
      )
    );
  };
  const handleTrackerClick = (trackerId) => {
    setTrackers((prevStatuses) =>
      prevStatuses.map((tracker) =>
        tracker.id === trackerId
          ? { ...tracker, checked: !tracker.checked }
          : tracker
      )
    );
  };

  const handleAssigneeClick = (assigneeId) => {
    setAssignees((prevStatuses) =>
      prevStatuses.map((assignee) =>
        assignee.id === assigneeId
          ? { ...assignee, checked: !assignee.checked }
          : assignee
      )
    );
  };
  const handleOwnerClick = (ownerId) => {
    setOwner((prevStatuses) =>
      prevStatuses.map((item) =>
        item.id === ownerId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="blue">
        Open Filter
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>

          <DrawerBody>
            <Accordion>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Status
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  gap="4"
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}>
                  {statuses.map((status) => (
                    <Badge
                      key={status.id}
                      borderRadius={"4"}
                      px="2"
                      py="1"
                      variant={status.checked ? "solid" : "outline"}
                      colorScheme={status.color ?? "gray"}
                      onClick={() => handleStatusClick(status.id)}
                      cursor={"pointer"}>
                      {status.name}
                    </Badge>
                  ))}
                  {/* <Badge borderRadius={"4"} px="2" py="1" colorScheme="green">
                    Success
                  </Badge> */}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Priority
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  gap="4"
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}>
                  {priorities.map((priority) => (
                    <Badge
                      key={priority.id}
                      borderRadius={"4"}
                      px="2"
                      py="1"
                      variant={priority.checked ? "solid" : "outline"}
                      colorScheme={priority.color ?? "gray"}
                      onClick={() => handlePriorityClick(priority.id)}
                      cursor={"pointer"}>
                      {priority.name}
                    </Badge>
                  ))}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Tracker
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  gap="4"
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}>
                  {trackers.map((tracker) => (
                    <Badge
                      key={tracker.id}
                      borderRadius={"4"}
                      px="2"
                      py="1"
                      variant={tracker.checked ? "solid" : "outline"}
                      colorScheme={tracker.color ?? "gray"}
                      onClick={() => handleTrackerClick(tracker.id)}
                      cursor={"pointer"}>
                      {tracker.name}
                    </Badge>
                  ))}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Assignee
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  gap="4"
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}>
                  <Flex>
                    {assignees.map((assignee) => (
                      <Flex
                        gap="2"
                        alignItems={"center"}
                        key={assignee.id}
                        onClick={() => handleAssigneeClick(assignee.id)}
                        cursor={"pointer"}>
                        <Avatar
                          name={assignee.name}
                          size="sm"
                          boxShadow={
                            assignee.checked
                              ? "0 0 10px 4px rgba(227, 142, 73)"
                              : ""
                          }
                          transition="box-shadow 0.2s ease"
                        />
                        <Flex flexDir={"column"}>
                          <Text fontSize={"sm"}>{assignee.name}</Text>
                          <Text fontSize={"xs"} color="gray.500">
                            {assignee.email}
                          </Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Created by
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  gap="4"
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}>
                  {owner.map((item) => (
                    <Flex
                      gap="2"
                      alignItems={"center"}
                      key={item.id}
                      onClick={() => handleOwnerClick(item.id)}
                      cursor={"pointer"}>
                      <Avatar
                        name={item.name}
                        size="sm"
                        boxShadow={
                          item.checked ? "0 0 10px 4px rgba(227, 142, 73)" : ""
                        }
                        transition="box-shadow 0.2s ease"
                      />
                      <Flex flexDir={"column"}>
                        <Text fontSize={"sm"}>{item.name}</Text>
                        <Text fontSize={"xs"} color="gray.500">
                          {item.email}
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Apply Filters</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
