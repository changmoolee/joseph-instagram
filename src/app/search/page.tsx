"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import { ICommonResponse } from "@/typescript/common/response.interface";
import { IUserData } from "@/typescript/user.interface";
import apiClient from "@/utils/axios";
import React from "react";

/**
 * 검색 페이지
 */
export default function Search() {
  const [users, setUsers] = React.useState<IUserData[]>([]);

  const [searchWord, setSearchWord] = React.useState<string>("");

  const getUsers = async () => {
    const lowerWord = searchWord.toLowerCase();

    const response: ICommonResponse<IUserData[]> = await apiClient.get(
      "/api/user/search",
      {
        params: { searchWord: lowerWord },
      }
    );

    const { data, result, message } = response.data;

    if (result === "success" && data) {
      setUsers(data);
    }

    if (result === "fail") {
      alert(message);
    }
  };

  const handleKeyDown = () => {
    getUsers();
  };

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-[600px] h-full flex flex-col items-center mt-5">
        <SearchInput
          onChange={(word) => setSearchWord(word)}
          handleKeyDown={handleKeyDown}
        />
        <section className="w-full h-[auto] flex flex-col p-5 gap-3">
          {users?.length > 0 ? (
            users?.map((user: IUserData) => (
              <ProfileCard
                key={user._id}
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
