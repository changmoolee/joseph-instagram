"use client";

import Post from "@/components/Post/Post.component";
import ProfileAboveName from "@/components/ProfileAboveName/ProfileAboveName.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import { useLoginStore } from "@/store/useLoginStore";

export default function Home() {
  /** 유저 개인 프로필 전역 상태 데이터 */
  const userInfo = useLoginStore((state) => state.userInfo);

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-[500px] h-full">
        <section className="w-full flex gap-5 border-[2px] p-5 border-gray-100 border-box">
          <ProfileAboveName src="" name="wow" />
          <ProfileAboveName src="" name="wow" />
          <ProfileAboveName src="" name="wow" />
          <ProfileAboveName src="" name="wow" />
        </section>
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
      <section className="w-[200px] h-full flex flex-col gap-5 p-5">
        <ProfileAndName src="" name="wow" />
        <div>
          {[
            "About",
            "Help",
            "Press",
            "API",
            "Jobs",
            "Privacy",
            "Terms",
            "Location",
            "Language",
          ].map((value) => (
            <span key={value} className="text-gray-500">
              {value}
            </span>
          ))}
        </div>
        <div>
          <span>@Copyright INSTANTGRAM from META</span>
        </div>
      </section>
    </main>
  );
}
