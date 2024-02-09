"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

    const response = await axios.get<{
      data: IUserData;
      result: string;
      message: string;
    }>(`/api/user/my-page`, {
      withCredentials: true,
    });

    const { result, data, message } = response.data;

    setUserData(data);

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
        <ColorButton
          text="내정보 수정하기"
          type="button"
          onClick={() => router.push("/my-page/edit")}
          className="w-full h-[40px] mt-10 bg-sky-400 text-[white]"
        />
      </form>
    </main>
  );
}
