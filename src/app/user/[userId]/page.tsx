"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetUserPost } from "@/hooks/post/useGetUserPost";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteFollow } from "@/utils/services/follow";
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
    error: postError,
    message: postMessage,
  } = useGetUserPost(params.userId, clickedTab);

  const {
    data: userData,
    error: userError,
    message: userMessage,
  } = useGetUserData(params.userId);

  const { isLogin, userInfo } = useLoginStore();

  React.useEffect(() => {
    if (postError) {
      alert(postMessage);
    }
    if (userError) alert(userMessage);
  }, [postError, postMessage, userError, userMessage]);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="w-[500px] h-[200px] flex gap-10 p-5">
        <BigProfileImage src={userData?.image || "/"} />
        <section className="flex flex-col gap-3">
          <article className="flex gap-5 items-center">
            <span>{userData?.name}</span>
            {isLogin && userInfo?._id !== userData?._id && (
              <ColorButton
                text="Follow"
                className="h-[30px] px-3 bg-sky-400 rounded-md text-white"
                onClick={() => {
                  if (isLogin && userData) {
                    excuteFollow({
                      followerId: userData._id,
                    });
                  } else {
                    alert("페이지 오류가 발생하여 팔로우가 불가능합니다.");
                  }
                }}
              />
            )}
          </article>
          <article className="flex gap-5">
            <span>
              <span className="font-bold">{postData?.length}</span> Posts
            </span>
            <span>
              <span className="font-bold">{userData?.followers}</span> followers
            </span>
            <span>
              <span className="font-bold">{userData?.following}</span> following
            </span>
          </article>
          <article>
            <span className="font-bold">{userData?.name}</span>
          </article>
        </section>
      </div>
      <Tab
        tabArr={tabs}
        onChange={(selectedTab) => {
          setClickedTab(selectedTab);
        }}
      />
      <ul className="max-w-[1000px] w-full h-full grid grid-cols-3 gap-4 mt-5">
        {postData && postData.length > 0 ? (
          postData.map((data) => (
            <li
              key={data._id.toString()}
              className="relative w-full h-auto aspect-[1/1]"
            >
              <Image
                src={data.image || "/"}
                alt="post-image"
                fill
                className="object-cover"
              />
            </li>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </ul>
    </main>
  );
}
