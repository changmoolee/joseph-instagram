import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

interface IProfileAboveNameProps {
  /**
   * 프로필 이미지 소스
   */
  src: string;
  /**
   * 프로필 이름
   */
  name: string;
}

/**
 * ProfileAboveName 컴포넌트
 */
export default function ProfileAboveName(props: IProfileAboveNameProps) {
  // props
  const { src, name } = props;

  return (
    <div className="flex flex-col gap-[2px] items-center">
      <ProfileImage src={src} />
      <span>{name}</span>
    </div>
  );
}
