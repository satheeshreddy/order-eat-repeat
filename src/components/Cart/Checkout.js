import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import classes from "./Checkout.module.css";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div
      className={`${classes.control} ${
        meta.touched && meta.error ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Checkout = (props) => {
  return (
    <Formik
      initialValues={{
        name: "",
        phoneNumber: "",
        addressLine1: "",
        city: "",
        state: "",
        zip: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Name is required")
          .max(50, "Name is too long"),
        phoneNumber: Yup.string()
          .required("Phone number is required")
          .max(10, "Phone number is too long"),
        addressLine1: Yup.string()
          .required("Address is required")
          .max(50, "Address is too long"),
        city: Yup.string()
          .required("City is required")
          .max(50, "City is too long"),
        state: Yup.string()
          .required("State is required")
          .max(50, "State is too long"),
        zip: Yup.string().required("Zip is required").max(5, "Zip is too long"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <MyTextInput
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
        />
        <MyTextInput
          label="Phone Number"
          name="phoneNumber"
          type="text"
          placeholder="123-456-7890"
        />
        <MyTextInput
          label="Address Line 1"
          name="addressLine1"
          type="text"
          placeholder="123 Main St"
        />
        <MyTextInput
          label="City"
          name="city"
          type="text"
          placeholder="Anytown"
        />
        <MyTextInput label="State" name="state" type="text" placeholder="CA" />
        <MyTextInput label="Zip" name="zip" type="text" placeholder="12345" />
        <div className={classes.actions}>
          <button>Confirm</button>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

// return (
//   <form className={classes.form} onSubmit={submitHandler}>
//     <div className={classes.control}>
//       <label htmlFor="name">Name</label>
//       <input type="text" id="name" placeholder="Enter name" ref={nameRef} />
//     </div>
//     <div className={classes.control}>
//       <label htmlFor="phone">Phone number</label>
//       <input
//         type="text"
//         id="phone"
//         placeholder="Enter phone number"
//         ref={phoneNumberRef}
//       />
//     </div>
//     <div className={classes.control}>
//       <label htmlFor="line1">Address line1</label>
//       <input
//         type="text"
//         id="line1"
//         placeholder="Enter street name and apt/unit #"
//         ref={addressLine1Ref}
//       />
//     </div>
//     <div className={classes.control}>
//       <label htmlFor="city">City</label>
//       <input type="text" id="city" placeholder="Enter city" ref={cityRef} />
//     </div>
//     <div className={classes.control}>
//       <label htmlFor="state">State</label>
//       <input
//         type="text"
//         id="state"
//         placeholder="Enter state"
//         ref={stateRef}
//       />
//     </div>
//     <div className={classes.control}>
//       <label htmlFor="zip">Zip</label>
//       <input
//         type="text"
//         id="zip"
//         placeholder="Enter zip code"
//         ref={zipCodeRef}
//       />
//     </div>
//     <div className={classes.actions}>
//       <button>Confirm</button>
//       <button type="button" onClick={props.onCancel}>
//         Cancel
//       </button>
//     </div>
//   </form>
// );
// };

export default Checkout;
