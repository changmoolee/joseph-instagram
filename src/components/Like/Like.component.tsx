import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

interface ILikeProps {
  /**
   * 좋아요 체크 유무
   */
  checked: boolean;
  /**
   * 사이즈 조절
   */
  size?: number;
}

/**
 * 좋아요 컴포넌트
 */
export default function Like(props: ILikeProps) {
  // props
  const { checked, size } = props;

  return (
    <button>
      {checked ? <AiFillHeart size={size} /> : <AiOutlineHeart size={size} />}
    </button>
  );
}
