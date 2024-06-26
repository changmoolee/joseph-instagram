import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";

interface ISkeletonCommentProps {
  /**
   * 로딩 스피너 활성 유무
   */
  isActive: boolean;
}
/**
 * 댓글 컴포넌트 스켈레톤 UI
 */
export default function SkeletonComment(props: ISkeletonCommentProps) {
  // props
  const { isActive } = props;

  return (
    <article className="flex items-center gap-2 p-2">
      <SkeletonUI isCircle isActive={isActive}>
        <div className="w-[50px] h-[50px]" />
      </SkeletonUI>
      <SkeletonUI isActive={isActive}>
        <div className="w-[140px] h-[20px]" />
      </SkeletonUI>
    </article>
  );
}
