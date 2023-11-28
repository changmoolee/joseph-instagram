import ModalPortal from "@/components/Modal/ModalPortal.component";

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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-1000">
          <section
            className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] z-0"
            onClick={onClose}
          />
          <section className="relative z-1">{children}</section>
        </div>
      </ModalPortal>
    )
  );
}
