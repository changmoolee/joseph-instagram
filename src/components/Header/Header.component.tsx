"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { useLoginStore } from "@/store/useLoginStore";
import apiClient from "@/utils/axios";
import React from "react";
import ProfileImage from "@/components/ProfileImage/ProfileImage.component";
import Image from "next/image";

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
    const response: ICommonResponse = await apiClient.post(
      `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/auth/signout`
    );

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

  return (
    <header className="fixed top-0 z-10 flex h-[100px] w-full min-w-[320px] justify-center border-b-[1px] border-solid border-black bg-white px-5">
      <section className="flex h-full w-full justify-between">
        <Link
          href={"/"}
          className="relative flex h-full w-[100px] items-center justify-center lg:w-[150px]"
        >
          <Image
            src="/images/logo-image.png"
            alt="app-logo"
            fill
            objectFit="contain"
            sizes="100px ,(max-width: 1200px) 150px"
          />
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
