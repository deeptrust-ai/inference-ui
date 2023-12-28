"use client";
import { Loading } from "@/components/loading";
// auth
import { RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";

import { Loader2 } from "lucide-react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return process.env.NEXT_PUBLIC_AUTH_URL ? (
    <RequiredAuthProvider
      authUrl={process.env.NEXT_PUBLIC_AUTH_URL}
      displayWhileLoading={<Loading />}
      displayIfLoggedOut={<RedirectToLogin />}
    >
      {children}
    </RequiredAuthProvider>
  ) : (
    <div>Server Error: NEXT_PUBLIC_AUTH_URL not found. Needed to set auth.</div>
  );
}
