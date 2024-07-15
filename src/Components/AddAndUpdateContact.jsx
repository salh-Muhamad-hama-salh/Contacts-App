import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

function AddAndUpdateContact({ isOpen, onClose, isUpdate, contact }) {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Add Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={validationSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? UpdateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border pl-2" />
              <div>
                <p className="text-red-500">
                  <span className="text-red-500">
                    <ErrorMessage name="name" />
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border pl-2" />
              <div>
                <p className="text-red-500">
                  <span className="text-red-500">
                    <ErrorMessage name="email" />
                  </span>
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange px-3 py-1.5 border self-end"
            >
              {isUpdate ? "Update" : "Add"} contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddAndUpdateContact;
