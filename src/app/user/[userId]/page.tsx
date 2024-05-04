"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetMyPost } from "@/hooks/post/useGetMyPost";
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

  /**
   * 유저 개인의 포스트 데이터 호출
   */

  const {
    data: postData,
    error,
    message,
  } = useGetMyPost(params.userId, clickedTab);

  React.useEffect(() => {
    if (error) {
      alert(message);
    }
  }, [error, message]);

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
        {postData ? (
          postData.map((data) => (
            <li
              key={data._id.toString()}
              className="relative w-full h-auto aspect-[1/1]"
            >
              <Image src={data.image || "/"} alt="post-image" fill />
            </li>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </ul>
    </main>
  );
}
