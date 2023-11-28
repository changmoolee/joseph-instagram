import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

interface IProfileCardProps {
  /** 영어 이름 */
  engName?: string;
  /** 한국 이름 */
  korName?: string;
  /** 필로워 수 */
  followersNum?: number;
  /** 필로잉 수 */
  followingNum?: number;
}

/**
 * 프로필 카드
 */
export default function ProfileCard(props: IProfileCardProps) {
  // props
  const {
    engName = "Eng name",
    korName = "홍길동",
    followersNum = 0,
    followingNum = 0,
  } = props;

  return (
    <article className="flex items-center gap-3 p-5 border-solid border-[2px] border-gray-200">
      <ProfileImage src="/" />
      <section className="flex flex-col">
        <span className="text-black fond-bold">{engName}</span>
        <span className="text-gray-400 fond-bold">{korName}</span>
        <span className="text-gray-400 fond-bold">{`${followersNum} followers ${followingNum} following`}</span>
      </section>
    </article>
  );
}
