"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import Tab from "@/components/Tab/Tab.component";
import apiClient from "@/utils/axios";
import Image from "next/image";
import React from "react";

interface IPostData {
  CreateDate: string;
  description: string;
  image: string;
  like_user: string[];
  userId: string;
  _id: string;
}

export default function User({ params }: { params: { userId: string } }) {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabs[0]);

  const [postData, setPostData] = React.useState<IPostData[]>([]);

  /**
   * 유저 개인의 포스트 데이터 호출
   */
  const getPostData = async (userId: string, clickedTab: string) => {
    // 객체분해할당
    const response = await apiClient.get<{
      data: IPostData[];
      result: string;
      message: string;
    }>(`/api/user/${userId}`, {
      params: { post: clickedTab.toLocaleLowerCase() },
    });

    const { result, data, message } = response.data;
    if (result === "success") {
      setPostData(data);
    }
    if (result === "fail") {
      // 에러메시지
      alert(message);
    }
  };

  React.useEffect(() => {
    getPostData(params.userId, clickedTab);
  }, [params.userId, clickedTab]);

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
      <Tab
        tabArr={tabs}
        onChange={(selectedTab) => {
          setClickedTab(selectedTab);
        }}
      />
      <ul className="max-w-[1000px] w-full h-full grid grid-cols-3 gap-4">
        {postData.map((data) => (
          <li
            key={data._id}
            className="relative w-full h-auto aspect-[1/1] bg-red-500 mt-12"
          >
            <Image src="/" alt="post-image" fill />
          </li>
        ))}
      </ul>
    </main>
  );
}
