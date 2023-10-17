import ProfileImage from "@/components/ProfileImage/ProfileImage.component";
import Image from "next/image";

export default function Post() {
  return (
    <div>
      <section>
        <ProfileImage src="/" />
        사용자 이름
      </section>
      <Image src="/" alt="" width={100} height={100} />
      <section>
        <article>
          좋아요 / 북마크
          <span>좋아요 개수</span>
        </article>

        <article>작성자 이름 / 내용</article>
        <span>생성된 시간</span>
        <article>
          <input></input>
          <button></button>
        </article>
      </section>
    </div>
  );
}
