import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";

interface ISkeletonCardProps {
  /**
   * 로딩 스피터 활성 유무
   */
  isActive: boolean;
}

/**
 * 프로필 카드 스켈레톤 UI
 */
export default function SkeletonCard(props: ISkeletonCardProps) {
  // props
  const { isActive } = props;

  return (
    <article className="flex items-center gap-3 border-[2px] border-solid border-gray-200 p-5">
      <SkeletonUI isCircle isActive={isActive}>
        <div className="h-[50px] w-[50px]" />
      </SkeletonUI>
      <section className="flex w-full flex-col gap-3">
        <SkeletonUI isActive={isActive} className="h-min w-min">
          <div className="h-[15px] w-[100px]" />
        </SkeletonUI>
        <SkeletonUI isActive={isActive} className="h-min w-min">
          <div className="h-[15px] w-[200px]" />
        </SkeletonUI>
      </section>
    </article>
  );
}
