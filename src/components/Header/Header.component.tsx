"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { useLoginStateStore } from "@/app/login/page";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  /** router */
  const router = useRouter();

  const isLogin = useLoginStateStore((state) => state.isLogin);

  const excuteLogout = useLoginStateStore((state) => state.excuteLogout);

  /**
   * 로그아웃 함수
   */
  const signOut = async () => {
    const response = await axios.post("/api/auth/sign-out");

    const { result, message } = response.data;

    if (result === "success") {
      // 로그아웃
      excuteLogout();
      // 성공 메시지
      alert(message);
      // 메인페이지로 이동
      router.push("/");
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

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
          {isLogin && (
            <li>
              <Link href={"/post/new"}>
                <BsPlusSquare className="w-[25px] h-[25px]" />
              </Link>
            </li>
          )}
          {isLogin && (
            <li>
              <Link href={"/my-page"}>Profile Image</Link>
            </li>
          )}
          <li>
            {isLogin ? (
              <button onClick={signOut}>Sign out</button>
            ) : (
              <Link href={"/login"}>Sign in</Link>
            )}
          </li>
        </ul>
      </section>
    </header>
  );
}
