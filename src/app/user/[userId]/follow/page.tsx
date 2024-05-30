"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import { IRefinedUserData } from "@/typescript/user.interface";
import React from "react";
import Link from "next/link";
import SkeletonCard from "@/components/ProfileCard/SkeletonCard.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetFollowUser } from "@/hooks/user/useGetFollowUser";

/**
 * 회원의 팔로워/팔로잉 유저 확인 페이지
 */
export default function UserFollow({ params }: { params: { userId: string } }) {
  const tabs = ["Follower", "Following"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabs[0]);

  const { isLoading, data: followInfo } = useGetFollowUser(params.userId);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-[600px] h-full flex flex-col items-center mt-5">
        <Tab
          tabArr={tabs}
          onChange={(selectedTab) => {
            setClickedTab(selectedTab);
          }}
        />
        <section className="w-full h-[auto] flex flex-col p-5 gap-3">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : followInfo?.follower ? (
            followInfo?.follower.map((user: IRefinedUserData) => (
              <Link key={user._id.toString()} href={`/user/${user._id}`}>
                <ProfileCard
                  name={user.name}
                  image={user.image}
                  followersNum={user.followers}
                  followingNum={user.following}
                />
              </Link>
            ))
          ) : (
            <div className="w-full h-[200px] flex justify-center items-center">
              {(clickedTab === "Follower"
                ? "해당 회원의 팔로워가"
                : "해당 회원이 팔로우하는 회원이") + " 없습니다."}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
