import Image from "next/image";
import { type ReactNode } from "react";
import ReactModal from "react-modal";

export const Modal = ({
  isOpen,
  onRequestClose,
  children,
  modalHeader,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  modalHeader: string;
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      "background-color": "#1e293b",
      "border-radius": "12px",
      "border-color": "#1e293b",
    },
    overlay: {
      "background-color": "black",
      opacity: "100%",
      "z-index": 1000,
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className="flex justify-between gap-4">
        <h1 className="text-xl font-bold tracking-wide">{modalHeader}</h1>
        <Image
          src="/assets/close.svg"
          alt="close"
          width={20}
          height={20}
          onClick={onRequestClose}
        />
      </div>
      <div className="my-4 text-sm md:text-lg">{children}</div>
    </ReactModal>
  );
};
