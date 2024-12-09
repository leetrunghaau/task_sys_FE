"use client";
import React from "react";
import { Providers } from "./providers";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";
import { Flex, Box } from "@chakra-ui/react";
import "./globals.css";
import { usePathname } from "next/navigation";
// import SideBarMenu from "../Components/Layout/SideBarMenu";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");
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
            {isDashboardPage ? (
              <Flex minW="100vw" py="12">
                {/* <SideBarMenu /> */}
                {children}
              </Flex>
            ) : (
              <Box minW="100vw" py="12" px="4">
                {children}
              </Box>
            )}
            <Footer></Footer>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
