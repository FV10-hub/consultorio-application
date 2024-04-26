"use client";
import { logout } from "@/actions/auth/logout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoBagAddOutline,
  IoBodyOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import Logo from "../ui/Logo";

export default function Sidebar() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  return (
    <div>
        <Logo name={session?.user.name!}/>
        <nav className="mt-10 ml-5">
          <Link
            href="/personas"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoBodyOutline size={30} />
            <span className="ml-5 text-xl">Pacientes</span>
          </Link>
          <Link
            href="/fichas"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoBagAddOutline size={30} />
            <span className="ml-5 text-xl">Fichas</span>
          </Link>
          {isAuthenticated && (
            <button
              className="flex w-full items-center p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => logout()}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-5 text-xl">Salir</span>
            </button>
          )}
        </nav>
    </div>
  );
}
