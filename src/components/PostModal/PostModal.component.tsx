import Bookmark from "@/components/Bookmark/Bookmark.component";
import Comment from "@/components/Comment/Comment.component";
import CommentInput from "@/components/CommentInput/CommentInput.component";
import Like from "@/components/Like/Like.component";
import Modal from "@/components/Modal/Modal.component";
import { IPostProps } from "@/components/Post/Post.component";
import ProfileAndName from "@/components/ProfileAndName/ProfileAndName.component";
import Image from "next/image";

interface IPostModalProps {
  /**
   * PostModal 구현 여부
   */
  open: boolean;
  /**
   * PostModal 닫는 함수
   */
  onClose: () => void;
  /**
   * Post 컴포넌트의 props
   */
  PostProps: IPostProps;
}

/**
 * 포스트 모달
 * @description 게시물 클릭시 구현되는 모달
 */
export default function PostModal(props: IPostModalProps) {
  // props
  const { open, onClose, PostProps } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <section className="w-[800px] h-[500px] flex bg-white">
        <div className="relative w-[60%] h-full bg-black">
          <Image src={PostProps.postSrc || "/"} alt="post-image" fill />
        </div>
        <div className="relative w-[40%] h-full">
          <section className="flex">
            <ProfileAndName
              src={PostProps.profileSrc}
              name={PostProps.username}
            />
          </section>
          <section>
            <Comment />
            <Comment />
            <Comment />
          </section>
          <section className="absolute bottom-0 w-full flex-col">
            <div className="flex justify-between">
              <Like checked />
              <Bookmark checked />
            </div>
            <div className="flex flex-col">
              <span>{PostProps.likeNumber} Like</span>
              <span>{PostProps.createDate} hours ago</span>
            </div>
            <CommentInput />
          </section>
        </div>
      </section>
    </Modal>
  );
}
