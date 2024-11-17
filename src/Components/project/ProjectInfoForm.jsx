import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { Settings } from "lucide-react";

export default function ProjectInfoForm() {
  return (
    <Box mb={4}>
      <FormControl mb={4}>
        <FormLabel>Project Name</FormLabel>
        <Input id="project-name" value="Web Application Redesign" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Project Description</FormLabel>
        <Input
          id="project-description"
          value="Redesigning the web application for improved user experience"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Project Deadline</FormLabel>
        <Input id="project-deadline" type="date" value="2023-12-31" />
      </FormControl>
      <Button w="full" leftIcon={<Settings />} colorScheme="blue">
        Update Project Settings
      </Button>
    </Box>
  );
}
