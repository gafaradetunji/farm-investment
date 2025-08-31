"use client"
import { Stack } from "@mui/material";
import { Header } from "../Header";
import { Footer } from "../Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />
      {children}
      <Footer />
    </Stack>
  )
}
