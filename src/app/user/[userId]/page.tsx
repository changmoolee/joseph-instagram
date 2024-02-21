"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import Tab from "@/components/Tab/Tab.component";
import axios from "axios";
import React from "react";

interface IUserData {
  _id: string;
  email: string;
  name: string;
}

export default function User({ params }: { params: { userId: string } }) {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  const [userData, setUserData] = React.useState<IUserData>();

  /**
   * 유저 개인의 포스트 데이터 호출
   */
  const getUserData = async (userId: string) => {
    // 객체분해할당
    const response = await axios.get<{
      data: IUserData;
      result: string;
      message: string;
    }>(`/api/user/${userId}`);

    const { result, data, message } = response.data;
    if (result === "success") {
      setUserData(data);
    }
    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  React.useEffect(() => {
    getUserData(params.userId);
  }, [params.userId]);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="w-[500px] h-[200px] flex gap-10 p-5">
        <BigProfileImage src="/" />
        <section className="flex flex-col gap-3">
          <article className="flex gap-5 items-center">
            <span>name</span>
            <ColorButton
              text="Follow"
              className="h-[30px] p-3 bg-sky-400 rounded-md"
            />
          </article>
          <article className="flex gap-5">
            <span>
              <span className="font-bold">2</span> Posts
            </span>
            <span>
              <span className="font-bold">2</span> followers
            </span>
            <span>
              <span className="font-bold">1</span> following
            </span>
          </article>
          <article>
            <span className="font-bold">name</span>
          </article>
        </section>
      </div>
      <Tab tabArr={tabs} />
    </main>
  );
}
