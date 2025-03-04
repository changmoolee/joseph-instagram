"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import { useGetUser } from "@/hooks/user/search/useGetUser";
import { IUser } from "@/typescript/user.interface";
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
    error,
    isLoading,
    message,
    mutate,
  } = useGetUser(searchWord);

  const handleKeyDown = () => {
    mutate();
  };

  React.useEffect(() => {
    if (error) {
      alert(message);
    }
  }, [error, message]);

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="mt-5 flex h-full w-full max-w-[600px] flex-col items-center px-[20px]">
        <SearchInput
          onChange={(word) => setSearchWord(word)}
          handleKeyDown={handleKeyDown}
        />
        <section className="mt-5 flex h-[auto] w-full flex-col gap-3">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : userInfo ? (
            userInfo.map((user: IUser) => (
              <Link key={user.id.toString()} href={`/user/${user.id}`}>
                <ProfileCard
                  name={user.username}
                  image={user.image_url}
                  // followersNum={user.followers?.length || 0}
                  // followingNum={user.following?.length || 0}
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
