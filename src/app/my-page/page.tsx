"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import { buttonClasses } from "@/styles/tailwindUtilities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ICommonResponse } from "@/typescript/common/response.interface";
import apiClient from "@/utils/axios";
import { IUserData } from "@/typescript/user.interface";

/**
 * 마이 페이지
 */
export default function MyPage() {
  // router
  const router = useRouter();

  const [userInfo, setUserInfo] = React.useState<IUserData>();

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

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  /**
   * 유저 개인 데이터 호출
   */
  const getUserData = async () => {
    // 객체분해할당

    const response: ICommonResponse<IUserData> = await apiClient.get(
      `/api/user/my-page`,
      {
        withCredentials: true,
      }
    );

    const { result, data, message } = response.data;

    if (result === "success" && data) {
      // 성공시 데이터 상태저장
      setUserInfo(data);
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  React.useEffect(() => {
    // 유저 프로필 데이터 호출
    getUserData();
  }, []);

  return (
    userInfo && (
      <main className="w-full flex justify-center">
        <form className="w-[400px] flex flex-col gap-5">
          <section className="w-full flex justify-center my-10">
            <span className="text-xl font-[600]">마이 페이지</span>
          </section>
          <section className="w-full flex justify-center">
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden">
              <Image
                src={userInfo.image || "/images/user.png"}
                alt="my-page-profile-image"
                fill
                className="object-cover"
              />
            </div>
          </section>

          <section className="w-full flex flex-col gap-10 my-10">
            <article className="w-full gap-5">
              {/* 이메일 */}
              <section className="w-full flex">
                <span className="w-[200px]">이메일</span>
                <span className="w-full">{userInfo.email || ""}</span>
              </section>
            </article>
            <article className="w-full gap-5">
              {/* 이름 */}
              <section className="w-full flex">
                <span className="w-[200px]">이름</span>
                <span className="w-full">{userInfo.name || ""}</span>
              </section>
            </article>
          </section>

          {/* 내정보 수정 페이지 이동*/}
          <Link
            className={`${buttonClasses} w-full h-[40px] mt-10 bg-sky-400`}
            href={"/my-page/edit"}
          >
            내정보 수정하기
          </Link>

          {/* 탈퇴 페이지 이동 */}
          <ColorButton
            text="회원탈퇴"
            type="button"
            className={`${buttonClasses} w-full h-[40px] mt-2 bg-black text-white`}
            onClick={deleteUserData}
          />
        </form>
      </main>
    )
  );
}
