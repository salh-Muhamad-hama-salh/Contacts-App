import { deleteDoc, doc } from "firebase/firestore";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useHook from "../hooks/useHook";
import { toast } from "react-toastify";

function Cart({ name, email, id }) {
  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "Contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const contact = { name, email, id };

  const { isOpen, onOpen, onClose } = useHook();

  return (
    <>
      <div>
        <div
          key={id}
          className="bg-yellow flex justify-between items-center p-2 rounded-lg mb-3"
        >
          <div className="flex gap-1">
            <RxAvatar className="text-orange text-4xl" />
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm">{email}</p>
            </div>
          </div>
          <div className="flex items-center text-2xl ">
            <FaRegEdit onClick={onOpen} className="cursor-pointer" />
            <FaTrash
              onClick={() => {
                deleteHandler(id);
              }}
              className="cursor-pointer text-orange ml-1"
            />
          </div>
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Cart;
