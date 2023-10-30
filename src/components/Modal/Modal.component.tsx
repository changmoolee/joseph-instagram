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
        <div className="flex justify-center items-center">
          <section className="" onClick={onClose} />
          <section>{children}</section>
        </div>
      </ModalPortal>
    )
  );
}
