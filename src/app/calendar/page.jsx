import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatNumber,
  Image,
} from "@chakra-ui/react";
import { CalendarRange } from "lucide-react";

// Dashboard Page Component
export default function CalendarPage() {
  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <Box mb={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2" size="md">
            Calendar
          </Heading>
          <Button colorScheme="teal" size="sm">
            <CalendarRange /> New Event
          </Button>
        </Flex>
        <Box border="1px solid" borderColor="gray.200" p={4} borderRadius="md">
          <Image src="/calendar-placeholder.png" alt="Calendar" />
        </Box>
      </Box>

      <Heading as="h2" size="md" mb={4}>
        Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            number={project.number}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

// Project Card Component
function ProjectCard({ title, description, number }) {
  return (
    <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={4}>
      <Heading as="h3" size="sm" mb={2}>
        {title}
      </Heading>
      <Box mb={4}>{description}</Box>
      <Stat>
        <Flex justify="space-between" align="center">
          <StatNumber>{number}</StatNumber>
          <CalendarRange />
        </Flex>
      </Stat>
      <Button variant="outline" size="sm" mt={4} colorScheme="teal">
        View Project
      </Button>
    </Box>
  );
}

// Example Project Data
const projects = [
  {
    id: 1,
    title: "Project A",
    description: "Description of Project A",
    number: 12,
  },
  {
    id: 2,
    title: "Project B",
    description: "Description of Project B",
    number: 8,
  },
  {
    id: 3,
    title: "Project C",
    description: "Description of Project C",
    number: 24,
  },
  {
    id: 4,
    title: "Project D",
    description: "Description of Project D",
    number: 3,
  },
];

// Clipboard Icon
function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}
