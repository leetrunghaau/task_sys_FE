// app/layout.tsx
import React from "react";
import { Providers } from "./providers";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import { Flex, Box } from "@chakra-ui/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Flex
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <Header></Header>
            <Box minH="100vh">{children}</Box>
            <Footer></Footer>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
