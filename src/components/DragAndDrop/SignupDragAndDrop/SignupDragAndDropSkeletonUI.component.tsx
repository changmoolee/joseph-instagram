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
      <div className="flex justify-center items-center w-[400px] h-[200px]">
        <SkeletonUI isActive={isActive} isCircle className={className} />
      </div>
      <section className="w-full h-[40px] flex justify-end m-2">
        <ColorButton
          text="사진 삭제"
          className="w-[100px] h-full bg-sky-400 text-[white] rounded-md"
        />
      </section>
    </section>
  );
}
