"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import React from "react";
import Link from "next/link";
import SkeletonCard from "@/components/ProfileCard/SkeletonCard.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetFollowUser } from "@/hooks/user/useGetFollowUser";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { IUserInfo } from "@/typescript/user.interface";

/**
 * 회원의 팔로워/팔로잉 유저 확인 페이지
 */
export default function UserFollowPage({
  params,
  searchParams,
}: {
  params: { user_id: string };
  searchParams: { type: string };
}) {
  const tabs = ["follower", "following"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(searchParams.type);

  const { isLoading, data: followInfo } = useGetFollowUser(
    parseInt(params.user_id)
  );

  /**
   * 유저 프로필 데이터 호출
   */
  const {
    isLoading: userLoading,
    data: userData,
    error: userError,
    message: userMessage,
  } = useGetUserInfo(params.user_id);

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-[600px] flex-col items-center">
        <div className="flex h-[100px] w-[300px] items-center justify-center">
          {/* 유저 프로필 이미지 */}
          {userLoading ? (
            <SkeletonUI isActive={userLoading} className="h-[60px] w-[120px]" />
          ) : (
            <ProfileAndName
              src={userData?.image_url || "/"}
              name={userData?.username || ""}
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
        <section className="flex h-auto w-full flex-col gap-3 p-5">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : clickedTab === "follower" ? (
            followInfo?.follower.map((user: IUserInfo) => (
              <Link key={user.id} href={`/user/${user.id}`}>
                <ProfileCard
                  name={user.username}
                  image={user.image_url}
                  followersNum={user.followers.length}
                  followingNum={user.followings.length}
                />
              </Link>
            ))
          ) : clickedTab === "following" ? (
            followInfo?.following.map((user: IUserInfo) => (
              <Link key={user.id} href={`/user/${user.id}`}>
                <ProfileCard
                  name={user.username}
                  image={user.image_url}
                  followersNum={user.followers.length}
                  followingNum={user.followings.length}
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
