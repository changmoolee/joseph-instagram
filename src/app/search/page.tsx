"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import { useGetUser } from "@/hooks/user/search/useGetUser";
import { IUserData } from "@/typescript/user.interface";
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
    mutate("/api/user/search");
  };

  React.useEffect(() => {
    if (error) {
      alert(message);
    }
  }, [error, message]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="max-w-[600px] min-w-[320px] w-full h-full flex flex-col items-center px-5 mt-5">
        <SearchInput
          onChange={(word) => setSearchWord(word)}
          handleKeyDown={handleKeyDown}
        />
        <section className="w-full h-[auto] flex flex-col gap-3 mt-5">
          {isLoading ? (
            <>
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
              <SkeletonCard isActive={isLoading} />
            </>
          ) : userInfo ? (
            userInfo.map((user: IUserData) => (
              <Link key={user._id.toString()} href={`/user/${user._id}`}>
                <ProfileCard
                  name={user.name}
                  image={user.image}
                  // followersNum={user.followers?.length || 0}
                  // followingNum={user.following?.length || 0}
                />
              </Link>
            ))
          ) : (
            <div className="w-full h-[200px] flex justify-center items-center">
              검색된 회원이 없습니다.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
