import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";

interface IBookmarkProps {
  /**
   * 북마크 체크 유무
   */
  checked: boolean;
}

/**
 * 북마크 컴포넌트
 */
export default function Bookmark({ checked }: IBookmarkProps) {
  return <button>{checked ? <BsFillBookmarkFill /> : <BsBookmark />}</button>;
}
