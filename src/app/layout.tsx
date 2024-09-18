// app/layout.tsx
import React from "react";
import { Providers } from "./providers";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import { Flex } from "@chakra-ui/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header></Header>
          <Flex
            minH="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            {children}
          </Flex>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
