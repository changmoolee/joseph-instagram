interface IBorderButtonProps {
  text?: string;
}

/**
 * 프로필 이미지 컴포넌트
 */
export default function BorderButton(props: IBorderButtonProps) {
  // props
  const { text = "Button" } = props;

  return (
    <button className="w-[auto] h-[50px] flex justify-center items-center bg-gradient-to-tr from-[#ffe17d] from-30% via-[#ffcd69] via-[#fa9137] via-[#fa9137] via-[#eb4141] to-[#c33cbe] to-95% rounded-[10px]">
      <div className="w-[90%] h-[90%] flex justify-center items-center p-5 border-solid rounded-[10px] box-border  bg-white">
        <span>{text}</span>
      </div>
    </button>
  );
}
