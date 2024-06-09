"use client";

import ColorButton from "@/components/ColorButton/ColorButton.component";
import PostModal from "@/components/PostModal/PostModal.component";
import BigProfileImage from "@/components/ProfileImage/BigProfileImage.component";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";
import Tab from "@/components/Tab/Tab.component";
import { useGetUserPost } from "@/hooks/post/useGetUserPost";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import { useLoginStore } from "@/store/useLoginStore";
import { excuteFollow } from "@/utils/services/follow";
import Image from "next/image";
import React from "react";

/**
 * 회원 게시물 페이지
 */
export default function User({ params }: { params: { userId: string } }) {
  const tabs = ["POSTS", "SAVED", "LIKED"];

  // 클릭한 탭의 index
  const [clickedTab, setClickedTab] = React.useState<string>(tabs[0]);

  // 클릭한 Post의 id
  const [clickedId, setClickedId] = React.useState<string>();

  // PostModal 구현 여부
  const [open, setOpen] = React.useState<boolean>(false);

  /**
   * 유저 개인의 포스트 데이터 호출
   */
  const {
    isLoading: postLoading,
    data: postData,
    error: postError,
    message: postMessage,
  } = useGetUserPost(params.userId, clickedTab);

  /**
   * 유저 프로필 데이터 호출
   */
  const {
    isLoading: userLoading,
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

  /**
   * 클릭한 게시물의 데이터
   */
  const clickedPostData = React.useMemo(
    () =>
      postData &&
      postData.filter((post) => post._id.toString() === clickedId).at(0),
    [postData, clickedId]
  );

  return (
    <main className="w-full h-full">
      <div className="max-w-[1000px] min-w-[320px] flex flex-col items-center">
        <div className="w-full h-[200px] flex justify-center gap-5 items-center lg:gap-10 p-5">
          {/* 유저 프로필 이미지 */}
          {userLoading ? (
            <SkeletonUI
              isActive={userLoading}
              isCircle
              className="w-[100px] h-[100px]"
            />
          ) : (
            <BigProfileImage src={userData?.image || "/"} />
          )}
          <section className="flex flex-col gap-2 lg:gap-3">
            <article className="flex gap-5 lg:gap-5 items-center">
              {/* 유저 이름 및 팔로우 버튼 */}
              {userLoading ? (
                <SkeletonUI
                  isActive={userLoading}
                  className="w-[100px] h-[25px]"
                />
              ) : (
                <>
                  <span>{userData?.name}</span>
                  {isLogin && userInfo?._id !== userData?._id && (
                    <ColorButton
                      // TODO:  !!followDetails.find((followingId) => followingId.userId === followingId?._id)
                      text="Follow"
                      className="h-[30px] px-3 bg-sky-400 rounded-md text-white"
                      onClick={() => {
                        if (isLogin && userData) {
                          excuteFollow({
                            followerId: userData._id,
                          });
                        } else {
                          alert(
                            "페이지 오류가 발생하여 팔로우 등록/해제가 불가능합니다."
                          );
                        }
                      }}
                    />
                  )}
                </>
              )}
            </article>
            {/* 유저 게시물 수 및 팔로우, 팔로워 수 */}
            {userLoading ? (
              <SkeletonUI
                isActive={userLoading}
                className="w-[300px] h-[25px]"
              />
            ) : (
              <article className="flex flex-col gap-1 lg:flex-row lg:gap-5">
                <span>
                  <span className="font-bold">{userData?.totalPostCount}</span>{" "}
                  Posts
                </span>
                <span>
                  <span className="font-bold">{userData?.followers}</span>{" "}
                  followers
                </span>
                <span>
                  <span className="font-bold">{userData?.following}</span>{" "}
                  following
                </span>
              </article>
            )}
            <article>
              {/* 유저 이름 */}
              {userLoading ? (
                <SkeletonUI
                  isActive={userLoading}
                  className="w-[100px] h-[25px]"
                />
              ) : (
                <span className="font-bold hidden lg:inline">
                  {userData?.name}
                </span>
              )}
            </article>
          </section>
        </div>
        <Tab
          tabArr={tabs}
          onChange={(selectedTab) => {
            setClickedTab(selectedTab);
          }}
        />
        {!postData ||
          (postData?.length === 0 && (
            <div className="w-full h-[100px] flex justify-center items-center">
              데이터가 없습니다.
            </div>
          ))}
        <ul className="w-full h-full grid grid-cols-3 gap-1 lg:gap-4 mt-5">
          {/* 유저 게시물 이미지 */}
          {postLoading ? (
            <>
              <SkeletonUI
                isActive={postLoading}
                className="w-full h-auto aspect-[1/1]"
              />
              <SkeletonUI
                isActive={postLoading}
                className="w-full h-auto aspect-[1/1]"
              />
            </>
          ) : postData && postData.length > 0 ? (
            postData.map((post) => (
              <li
                key={post._id.toString()}
                className="relative w-full h-auto aspect-[1/1]"
              >
                <button
                  onClick={() => {
                    setOpen(true);
                    setClickedId(post._id.toString());
                  }}
                >
                  <Image
                    src={post.image || "/"}
                    alt="post-image"
                    fill
                    className="object-cover"
                  />
                </button>
              </li>
            ))
          ) : null}
        </ul>

        {/* 게시물 이미지 클릭시 생성되는 게시물 모달 */}
        {open && clickedPostData && (
          <PostModal
            open={open}
            onClose={() => setOpen(false)}
            PostProps={clickedPostData}
            userInfo={userInfo}
          />
        )}
      </div>
    </main>
  );
}
