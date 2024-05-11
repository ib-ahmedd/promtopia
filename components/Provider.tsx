"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }: providerProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

type providerProps = {
  children: React.ReactNode;
  session?: any;
};
