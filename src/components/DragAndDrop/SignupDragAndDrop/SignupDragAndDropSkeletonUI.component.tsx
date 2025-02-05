import ColorButton from "@/components/ColorButton/ColorButton.component";
import SkeletonUI from "@/components/SkeletonUI/SkeletonUI.component";

interface ISignupDragAndDropSkeletonUIProps {
  /**
   * 로딩 스피터 활성 유무
   */
  isActive: boolean;
  /**
   * className
   */
  className?: string;
}

/**
 * 게시물 이미지 드래그엔드랍 컴포넌트
 */
export default function SignupDragAndDropSkeletonUI(
  props: ISignupDragAndDropSkeletonUIProps
) {
  // props
  const { isActive, className } = props;

  return (
    <section className="flex flex-col">
      <div className="flex h-[200px] w-full max-w-[400px] items-center justify-center">
        <SkeletonUI isActive={isActive} isCircle className={className} />
      </div>
      <section className="m-2 flex h-[40px] w-full justify-end">
        <ColorButton
          text="사진 삭제"
          className="h-full w-[100px] rounded-md bg-sky-400 text-[white]"
        />
      </section>
    </section>
  );
}
