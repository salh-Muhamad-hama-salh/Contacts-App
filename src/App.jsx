import Navbar from "./Components/Navbar";
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./config/firebase";
import Cart from "./Components/Cart";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useHook from "./hooks/useHook";
import NotFound from "./Components/NotFound";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useHook();

  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getcontacts();
  }, []);

  const filterContacts = (e) => {
    const Value = e.target.value;

    const contactsRef = collection(db, "Contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      const filteredContacts = contactsList.filter((contact) => {
        return contact.name.toLowerCase().includes(Value.toLowerCase());
      });

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex items-center gap-2">
          <div className="flex relative items-center flex-grow">
            <CiSearch className="text-white text-3xl absolute ml-1" />
            <input
              onChange={filterContacts}
              type="text"
              className=" text-white pl-10  bg-transparent border border-white rounded-md h-10 flex-grow"
            />
          </div>
          <FaPlusCircle
            onClick={onOpen}
            className="text-white text-5xl cursor-pointer"
          />
        </div>
        <div className="mt-4">
          {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <Cart
                key={contact.id}
                id={contact.id}
                name={contact.name}
                email={contact.email}
              />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
