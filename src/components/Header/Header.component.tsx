"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { useLoginStore } from "@/store/useLoginStore";
import apiClient from "@/utils/axios";
import { useCheckLogin } from "@/hooks/auth/useCheckLogin";
import React from "react";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  /** router */
  const router = useRouter();

  const isLogin = useLoginStore((state) => state.isLogin);

  const excuteLogout = useLoginStore((state) => state.excuteLogout);

  /**
   * 로그아웃 함수
   */
  const signOut = async () => {
    const response: ICommonResponse =
      await apiClient.post("/api/auth/sign-out");

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

  // 로그인 여부 체크
  // const { data } = useCheckLogin();

  // React.useEffect(() => {
  //   if (!data.isLogin) {
  //     excuteLogout();
  //   }
  // }, [data, excuteLogout]);

  return (
    <header className="flex h-[100px] w-full justify-center border-b-[1px] border-solid border-black px-5">
      <section className="flex h-full w-full justify-between">
        <Link href={"/"} className="flex h-full items-center justify-center">
          Instargram
        </Link>

        <ul className="flex h-full items-center gap-x-5">
          <li>
            <Link href={"/"}>
              <AiOutlineHome className="hidden h-[25px] w-[25px] lg:block" />
            </Link>
          </li>
          <li>
            <Link href={"/search"}>
              <FiSearch className="h-[25px] w-[25px]" />
            </Link>
          </li>
          {isLogin && (
            <li>
              <Link href={"/post/new"}>
                <BsPlusSquare className="h-[25px] w-[25px]" />
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
