"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full h-[100px] flex justify-center border-solid border-b-[1px] border-black">
      <section className="w-[1200px] h-full flex justify-between">
        <Link href={"/"} className="h-full flex justify-center items-center">
          Instargram
        </Link>

        <ul className="h-full flex items-center gap-x-5">
          <li>
            <Link href={"/"}>
              <AiOutlineHome className="w-[25px] h-[25px]" />
            </Link>
          </li>
          <li>
            <Link href={"/search"}>
              <FiSearch className="w-[25px] h-[25px]" />
            </Link>
          </li>
          <li>
            <Link href={"/new"}>
              <BsPlusSquare className="w-[25px] h-[25px]" />
            </Link>
          </li>
          {session && (
            <li>
              <button>Profile Image</button>
            </li>
          )}
          <li>
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn()}>Sign in</button>
            )}
          </li>
        </ul>
      </section>
    </header>
  );
}
