import ModalPortal from "@/components/Modal/ModalPortal.component";
import { IoMdClose } from "react-icons/io";

interface IModalProps {
  /**
   * Modal 구현 여부
   */
  open: boolean;
  /**
   * Modal 닫는 함수
   */
  onClose: () => void;
  /**
   * children
   */
  children: React.ReactNode;
}

/**
 * Modal 컴포넌트
 */
export default function Modal(props: IModalProps) {
  // props
  const { open, onClose, children } = props;

  return (
    open && (
      <ModalPortal>
        <div className="z-1000 fixed left-0 top-0 flex h-full w-full flex-col items-center lg:flex-row lg:justify-center">
          <section
            className="absolute z-0 h-full w-full bg-[rgba(0,0,0,0.3)]"
            onClick={onClose}
          />
          {/* 닫기 버튼 */}
          <div className="flex w-full justify-end p-2 lg:hidden">
            <button onClick={onClose}>
              <IoMdClose className="h-[20px] w-[20px] rounded-full bg-gray-400" />
            </button>
          </div>
          <section className="z-1 relative">{children}</section>
        </div>
      </ModalPortal>
    )
  );
}
