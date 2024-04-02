import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";

interface IBookmarkProps {
  /**
   * 북마크 체크 유무
   */
  checked: boolean;
  /**
   * 사이즈 조절
   */
  size?: number;
}

/**
 * 북마크 컴포넌트
 */
export default function Bookmark(props: IBookmarkProps) {
  // props
  const { checked, size } = props;

  return (
    <button>
      {checked ? (
        <BsFillBookmarkFill size={size} />
      ) : (
        <BsBookmark size={size} />
      )}
    </button>
  );
}
