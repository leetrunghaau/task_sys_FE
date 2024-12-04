"use client";
import { Spinner, Box } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Spinner size="xl" color="red.500" />
    </Box>
  );
}
