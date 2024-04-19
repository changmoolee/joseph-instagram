import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

interface IProfileCardProps {
  /** 프로필 이미지 */
  image?: string;
  /** 영어 이름 */
  name?: string;
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
  const { image, name, followersNum = 0, followingNum = 0 } = props;

  return (
    <article className="flex items-center gap-3 p-5 border-solid border-[2px] border-gray-200">
      <ProfileImage src={image} />
      <section className="flex flex-col">
        <span className="text-black fond-bold">{name}</span>
        <span className="text-gray-400 fond-bold">{`${followersNum} followers ${followingNum} following`}</span>
      </section>
    </article>
  );
}
