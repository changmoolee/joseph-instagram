interface ISkeletonUIProps {
  /**
   * 로딩 스피터 활성 유무
   */
  isActive: boolean;
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
  const { isActive, className, children } = props;

  const skeletonEffect = isActive ? "animate-pulse bg-gray-400" : "";

  const invisibleEffect = isActive ? "invisible" : "";

  return (
    <section className={`${skeletonEffect}  ${className}`}>
      <div className={invisibleEffect}>{children}</div>
    </section>
  );
}
