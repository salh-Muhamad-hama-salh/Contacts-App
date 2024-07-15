import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

function Modal({ isOpen, onClose, children }) {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed top-0 h-screen w-screen backdrop-blur z-40 grid place-items-center">
          <div className="min-h-[200px] min-w-[80%] m-auto bg-white p-4 relative  z-50">
            <div className="flex justify-end">
              <IoClose
                onClick={onClose}
                className="text-3xl self-end cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
