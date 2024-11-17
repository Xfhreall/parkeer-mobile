import React from "react";
import Loading from "./ui/loading";

const LoadingProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Loading />
      {children}
    </>
  );
};

export default LoadingProvider;
