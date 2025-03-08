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
import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  /** router */
  const router = useRouter();

  /** 로그인 유무 */
  const isLogin = useLoginStore((state) => state.isLogin);

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

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

    if (result === "failure") {
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
    <header className="fixed top-0 z-10 flex h-[100px] w-full justify-center border-b-[1px] border-solid border-black bg-white px-5">
      <section className="flex h-full w-full justify-between">
        <Link href={"/"} className="flex h-full items-center justify-center">
          Instargram
        </Link>

        <ul className="flex h-full items-center gap-x-[15px] lg:gap-x-[30px]">
          <li>
            <Link href={"/search"}>
              <FiSearch className="h-[20px] w-[20px] lg:h-[25px] lg:w-[25px]" />
            </Link>
          </li>
          {isLogin && (
            <li>
              <Link href={"/post/new"}>
                <BsPlusSquare className="h-[20px] w-[20px] lg:h-[25px] lg:w-[25px]" />
              </Link>
            </li>
          )}
          {isLogin && (
            <li>
              <Link href={"/my-page"}>
                <ProfileImage src={userInfo?.image_url} />
              </Link>
            </li>
          )}
          <li className="text-[14px]">
            {isLogin ? (
              <button onClick={signOut}>로그아웃</button>
            ) : (
              <Link href={"/login"}>로그인</Link>
            )}
          </li>
        </ul>
      </section>
    </header>
  );
}
