interface IButtonProps {
  /**
   * 버튼에 들어갈 텍스트
   */
  text?: string;
  /**
   * className
   */
  className?: string;
}

/**
 * Button 컴포넌트
 */
export default function ColorButton(props: IButtonProps) {
  // props
  const { text = "Button", className } = props;

  return (
    <button
      className={`flex justify-center items-center text-white font-bold ${className}`}
    >
      {text}
    </button>
  );
}
