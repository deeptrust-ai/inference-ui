"use client";
import * as React from "react";

import Link from "next/link";

import { useAuthInfo, useLogoutFunction } from "@propelauth/react";

import Logo, { DLogo } from "./logo";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const logoutFn = useLogoutFunction(); // (1)
  return <Button onClick={() => logoutFn(true) /*(2)*/}>Logout</Button>;
};

export default function NavBar() {
  const authInfo = useAuthInfo();
  return (
    <div className="flex p-6 justify-between">
      <Link href={"/"}>
        <Logo width={100} height={24} />
      </Link>
      {authInfo.isLoggedIn && <LogoutButton />}
    </div>
  );
}
