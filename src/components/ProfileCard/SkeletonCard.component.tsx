import ProfileImage from "@/components/ProfileImage/ProfileImage.component";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";

interface ISkeletonCardProps {
  /**
   * 로딩 스피터 활성 유무
   */
  isActive: boolean;
}

/**
 * 프로필 카드
 */
export default function SkeletonCard(props: ISkeletonCardProps) {
  // props
  const { isActive } = props;

  return (
    <article className="flex items-center gap-3 p-5 border-solid border-[2px] border-gray-200">
      <SkeletonUI isCircle isActive={isActive}>
        <div className="w-[50px] h-[50px]" />
      </SkeletonUI>
      <section className="w-full flex flex-col gap-3">
        <SkeletonUI isActive={isActive}>
          <div className="w-[100px] h-[15px]" />
        </SkeletonUI>
        <SkeletonUI isActive={isActive}>
          <div className="w-[300px] h-[15px]" />
        </SkeletonUI>
      </section>
    </article>
  );
}
