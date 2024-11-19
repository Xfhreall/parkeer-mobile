import Navbar from "@/components/ui/navbar";
import React from "react";

const layoutService = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layoutService;
