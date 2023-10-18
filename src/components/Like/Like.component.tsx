import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

interface ILikeProps {
  /**
   * 좋아요 체크 유무
   */
  checked: boolean;
}

/**
 * 좋아요 컴포넌트
 */
export default function Like({ checked }: ILikeProps) {
  return <button>{checked ? <AiFillHeart /> : <AiOutlineHeart />}</button>;
}
