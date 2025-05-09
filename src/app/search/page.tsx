"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import { useSearchUser } from "@/hooks/user/search/useSearchUser";
import { ISearchUserInfo } from "@/typescript/user.interface";
import React from "react";
import Link from "next/link";
import SkeletonCard from "@/components/ProfileCard/SkeletonCard.component";

/**
 * 검색 페이지
 */
export default function Search() {
  const [searchWord, setSearchWord] = React.useState<string>("");

  const {
    data: userInfo,
    isLoading,
    message,
    mutate,
  } = useSearchUser(searchWord);

  const handleKeyDown = () => {
    mutate && mutate();
  };

  return (
    <main className="flex h-full w-full justify-center">
      <div className="mt-[10px] flex w-full max-w-[600px] flex-col px-[20px]">
        <SearchInput
          onChange={(word) => setSearchWord(word)}
          handleKeyDown={handleKeyDown}
        />
        <section className="flex w-full flex-col gap-[10px] overflow-auto py-[10px]">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : userInfo ? (
            userInfo.map((user: ISearchUserInfo) => (
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
              검색된 회원이 없습니다.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
