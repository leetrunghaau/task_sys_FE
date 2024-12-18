import {
  Badge,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import { ScanEye, Calendar, Flag, User, Users, Lightbulb } from "lucide-react";
export default function DetailIssueModal({
  pid,
  id,
  isOpen,
  onClose,
  selectedIssue,
}) {
  if (!selectedIssue) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <Text maxW="258px" noOfLines={1} fontSize="2xl" fontWeight="bold">
              {selectedIssue.name}
            </Text>
            <Badge
              px={4}
              py={2}
              borderRadius="md"
              colorScheme="teal"
              cursor="pointer">
              {selectedIssue.status}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={6} align="start">
            <HStack spacing={4} w="full">
              <Icon as={User} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Owner
                </Text>
                <Text fontWeight="medium">{selectedIssue.owner}</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w="full">
              <Icon as={Users} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Assignee
                </Text>
                <Text fontWeight="medium">{selectedIssue.assignee}</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w="full">
              <Icon as={Calendar} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Start Date
                </Text>
                <Text fontWeight="medium">
                  {new Date(selectedIssue.start).toLocaleDateString()}
                </Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w="full">
              <Icon as={Flag} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  End Date
                </Text>
                <Text fontWeight="medium">
                  {selectedIssue.end
                    ? new Date(selectedIssue.end).toLocaleDateString()
                    : "N/A"}
                </Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w="full">
              <Icon as={Lightbulb} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Status
                </Text>
                <Text fontWeight="medium">{selectedIssue.status}</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w="full">
              <Icon as={ScanEye} w={4} h={4} color="gray.500" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.500">
                  Tracker
                </Text>
                <Text fontWeight="medium">{selectedIssue.tracker}</Text>
              </VStack>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Flex gap="4">
            <Link href={`/projects/${pid}/issue/${selectedIssue.id}`}>
              <Button variant={"outline"} colorScheme="blue" onClick={onClose}>
                Issue Detail
              </Button>
            </Link>

            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
