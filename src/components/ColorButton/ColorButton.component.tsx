import { buttonClasses } from "@/styles/tailwindUtilities";

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
  const { text = "Button", className } = props;

  return (
    <button className={`${buttonClasses}${className}`} {...props}>
      {text}
    </button>
  );
}
