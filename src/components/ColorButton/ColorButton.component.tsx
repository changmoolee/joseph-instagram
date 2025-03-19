interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const { text = "Button", className, ...rest } = props;

  return (
    <button
      className={`flex items-center justify-center whitespace-nowrap rounded-md font-semibold text-white ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}
