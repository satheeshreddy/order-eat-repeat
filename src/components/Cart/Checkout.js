import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import classes from "./Checkout.module.css";

const TextInput = ({ label, ...props }) => {
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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        props.onConfirm(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder="123-456-7890"
          />
          <TextInput
            label="Address Line 1"
            name="addressLine1"
            type="text"
            placeholder="123 Main St"
          />
          <TextInput
            label="City"
            name="city"
            type="text"
            placeholder="Anytown"
          />
          <TextInput label="State" name="state" type="text" placeholder="CA" />
          <TextInput label="Zip" name="zip" type="text" placeholder="12345" />
          <div className={classes.actions}>
            <button disabled={isSubmitting}>Confirm</button>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Checkout;
