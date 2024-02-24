"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard.component";
import SearchInput from "@/components/SearchInput/SearchInput.component";
import axios from "axios";
import React from "react";

interface ISearchProps {
  datalist: [];
}

/**
 * 검색 페이지
 */
export default function Search(props: ISearchProps) {
  const [users, setUsers] = React.useState<any[]>([]);

  const [searchWord, setSearchWord] = React.useState<string>("");

  const getUsers = async () => {
    const lowerWord = searchWord.toLowerCase();

    const response = await axios.get("/api/user/search", {
      params: { searchWord: lowerWord },
    });

    const { data } = response.data;

    setUsers(data);
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
            users?.map((user: any) => (
              <ProfileCard
                key={user.id}
                name={user.name}
                followersNum={user.follwers?.length || 0}
                followingNum={user.following?.length || 0}
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
