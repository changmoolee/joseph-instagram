interface ISkeletonUIProps {
  /**
   * 로딩 스피터 활성 유무
   */
  isActive: boolean;
  /**
   * 원 모양 유무
   */
  isCircle?: boolean;
  /**
   * className
   */
  className?: string;
  /**
   * children
   */
  children?: React.ReactNode;
}

/**
 * 스켈레톤 UI 컴포넌트
 */
export default function SkeletonUI(props: ISkeletonUIProps) {
  // props
  const { isActive, isCircle, className = "", children } = props;

  const shape = isCircle ? "rounded-full" : "";

  const skeletonEffect = isActive ? "animate-pulse bg-gray-400" : "";

  return (
    <section className={`${skeletonEffect} ${shape} ${className}`}>
      {children}
    </section>
  );
}
