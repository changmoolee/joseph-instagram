"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import { IRefinedUserData } from "@/typescript/user.interface";
import React from "react";
import Link from "next/link";
import SkeletonCard from "@/components/ProfileCard/SkeletonCard.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetFollowUser } from "@/hooks/user/useGetFollowUser";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";

/**
 * 회원의 팔로워/팔로잉 유저 확인 페이지
 */
export default function UserFollow({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { type: string };
}) {
  const tabs = ["follower", "following"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(searchParams.type);

  const { isLoading, data: followInfo } = useGetFollowUser(params.userId);

  /**
   * 유저 프로필 데이터 호출
   */
  const {
    isLoading: userLoading,
    data: userData,
    error: userError,
    message: userMessage,
  } = useGetUserData(params.userId);

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-[600px] flex-col items-center">
        <div className="flex h-[100px] w-[300px] items-center justify-center">
          {/* 유저 프로필 이미지 */}
          {userLoading ? (
            <SkeletonUI isActive={userLoading} className="h-[60px] w-[120px]" />
          ) : (
            <ProfileAndName
              src={userData?.image || "/"}
              name={userData?.name || ""}
            />
          )}
        </div>
        <Tab
          className="mt-5"
          tabArr={tabs}
          defaultTab={searchParams.type}
          onChange={(selectedTab) => {
            setClickedTab(selectedTab);
          }}
        />
        <section className="flex h-[auto] w-full flex-col gap-3 p-5">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : clickedTab === "follower" ? (
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
          ) : clickedTab === "following" ? (
            followInfo?.following.map((user: IRefinedUserData) => (
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
            <div className="flex h-[200px] w-full items-center justify-center">
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
