"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import { buttonClasses } from "@/styles/tailwindUtilities";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ICommonResponse } from "../../../typescript/common/response.interface";

interface IUserData {
  _id: string;
  email: string;
  name: string;
}

/**
 * 마이 페이지
 */
export default function MyPage() {
  const [userData, setUserData] = React.useState<IUserData>();

  // router
  const router = useRouter();

  /**
   * 유저 개인 데이터 호출
   */
  const getUserData = async () => {
    // 객체분해할당

    const response: ICommonResponse<IUserData> = await axios.get(
      `/api/user/my-page`,
      {
        withCredentials: true,
      }
    );

    const { result, data, message } = response.data;
    if (result === "success" && data) {
      setUserData(data);
    }

    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  /**
   * 회원 탈퇴
   */
  const deleteUserData = async () => {
    if (!confirm("회원탈퇴를 진행하시겠습니까?")) {
      return;
    }

    const response: ICommonResponse = await axios.delete(`/api/user/my-page`, {
      withCredentials: true,
    });

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

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="w-full flex justify-center">
      <form className="w-[400px] flex flex-col gap-5">
        <section className="w-full flex justify-center my-10">
          <span className="text-xl font-[600]">마이 페이지</span>
        </section>

        <Image src="/" width={100} height={100} alt="my-page-profile-image" />
        <section className="w-full flex flex-col gap-10">
          <article className="w-full gap-5">
            {/* 이메일 */}
            <section className="w-full flex">
              <span className="w-[200px]">이메일</span>
              <span className="w-full">{userData?.email || ""}</span>
            </section>
          </article>
          <article className="w-full gap-5">
            {/* 이름 */}
            <section className="w-full flex">
              <span className="w-[200px]">이름</span>
              <span className="w-full">{userData?.name || ""}</span>
            </section>
          </article>
        </section>

        {/* 내정보 수정 페이지 이동*/}
        <Link
          className={`${buttonClasses} w-full h-[40px] mt-12 bg-sky-400`}
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
  );
}
