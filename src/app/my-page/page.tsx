"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import { buttonClasses } from "@/styles/tailwindUtilities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { useLoginStore } from "@/store/useLoginStore";

/**
 * 마이 페이지
 */
export default function MyPage() {
  // router
  const router = useRouter();

  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  /**
   * 회원 탈퇴
   */
  const deleteUserData = async () => {
    if (!confirm("회원탈퇴를 진행하시겠습니까?")) {
      return;
    }

    const response: ICommonResponse = await apiClient.delete(
      `/api/user/my-page`,
      {
        withCredentials: true,
      }
    );

    const { result, data, message } = response.data;

    if (result === "success") {
      alert(message);

      // 메인페이지 이동
      router.push("/");
    }

    if (result === "failure") {
      // 에러메시지
      alert(message);
    }
  };

  return (
    <main className="flex w-full justify-center">
      <form className="flex w-full max-w-[400px] flex-col gap-5 px-[20px] pb-[20px]">
        <section className="my-10 flex w-full justify-center">
          <span className="text-xl font-[600]">마이 페이지</span>
        </section>
        <section className="flex w-full justify-center">
          {/* 유저 프로필 이미지 */}
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full">
            <Image
              src={userInfo?.image_url || "/images/user.png"}
              alt="my-page-profile-image"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="my-10 flex w-full flex-col gap-10">
          {/* 유저 이메일 */}

          <article className="w-full gap-5">
            {/* 이메일 */}
            <section className="flex w-full">
              <span className="w-[200px]">이메일</span>
              <span className="w-full">{userInfo?.email || ""}</span>
            </section>
          </article>

          {/* 유저 이름 */}

          <article className="w-full gap-5">
            {/* 이름 */}
            <section className="flex w-full">
              <span className="w-[200px]">이름</span>
              <span className="w-full">{userInfo?.username || ""}</span>
            </section>
          </article>
        </section>

        {/* 내정보 수정 페이지 이동*/}
        <Link
          className={`${buttonClasses} mt-10 h-[40px] w-full bg-sky-400`}
          href={"/my-page/edit"}
        >
          내정보 수정하기
        </Link>

        {/* 탈퇴 페이지 이동 */}
        <ColorButton
          text="회원탈퇴"
          type="button"
          className={`${buttonClasses} h-[40px] w-full bg-black text-white`}
          onClick={deleteUserData}
        />
      </form>
    </main>
  );
}
