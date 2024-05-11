"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import { useGetUser } from "@/hooks/user/search/useGetUser";
import { IUserData } from "@/typescript/user.interface";
import React from "react";
import Loading from "@/components/Loading/Loading.component";

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
      <div className="w-[600px] h-full flex flex-col items-center mt-5">
        <SearchInput
          onChange={(word) => setSearchWord(word)}
          handleKeyDown={handleKeyDown}
        />
        <section className="w-full h-[auto] flex flex-col p-5 gap-3">
          {isLoading ? (
            <Loading isActive={isLoading} className="mx-auto mt-5" />
          ) : userInfo ? (
            userInfo.map((user: IUserData) => (
              <ProfileCard
                key={user._id.toString()}
                name={user.name}
                image={user.image}
                // followersNum={user.follwers?.length || 0}
                // followingNum={user.following?.length || 0}
              />
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
