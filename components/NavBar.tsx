"use client";
import Link from "next/link";

// auth
import {
  useAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/react";

// ui
import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import Logo from "./logo";
import { LogOut, User, UserCog } from "lucide-react";

const ProfileDropDown = () => {
  const { redirectToAccountPage } = useRedirectFunctions();
  const logoutFn = useLogoutFunction();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="outline">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuItem onClick={redirectToAccountPage}>
          <div className="flex items-center space-x-2">
            <UserCog />
            <span>Account</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutFn(true)}>
          <div className="flex items-center space-x-2">
            <LogOut />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function NavBar() {
  const authInfo = useAuthInfo();
  return (
    <div className="flex m-6 justify-between">
      <Link href={"/"}>
        <Logo width={100} height={24} />
      </Link>
      {authInfo.isLoggedIn && <ProfileDropDown />}
    </div>
  );
}
