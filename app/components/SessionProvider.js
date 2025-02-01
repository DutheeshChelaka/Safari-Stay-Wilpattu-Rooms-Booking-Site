"use client"; // Mark this as a Client Component

import { SessionProvider as Provider } from "next-auth/react";

export default function SessionProvider({ children }) {
  return <Provider>{children}</Provider>;
}
