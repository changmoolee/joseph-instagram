import ProfileImage from "@/components/ProfileImage/ProfileImage.component";

interface IProfileAndNameProps {
  /**
   * 프로필 이미지 소스
   */
  src?: string;
  /**
   * 프로필 이름
   */
  name: string;
}

/**
 * ProfileAndName 컴포넌트
 */
export default function ProfileAndName(props: IProfileAndNameProps) {
  // props
  const { src, name } = props;

  return (
    <div className="flex items-center gap-5 p-2">
      <ProfileImage src={src} />
      <span className="font-bold">{name}</span>
    </div>
  );
}
