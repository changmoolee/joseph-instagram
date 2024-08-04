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
    <button className="flex h-[50px] w-[auto] items-center justify-center rounded-[10px] bg-gradient-to-tr from-[#ffe17d] from-30% via-[#eb4141] via-[#fa9137] via-[#ffcd69] to-[#c33cbe] to-95%">
      <div className="box-border flex h-[90%] w-[90%] items-center justify-center rounded-[10px] border-solid bg-white p-5">
        <span>{text}</span>
      </div>
    </button>
  );
}
