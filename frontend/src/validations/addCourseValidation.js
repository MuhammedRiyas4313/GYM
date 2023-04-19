import * as yup from "yup";

export const courseSchema = yup.object().shape({
  coursename: yup
    .string()
    .min(2, "Course name must be at least 2 characters")
    .max(20)
    // .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .required("Required"),
 charge: yup
      .number('required')
      .positive()
      .integer()
      .required("Required"),
description: yup
    .string()
    .min(2, "Description must be at least 2 characters")
    .required("Required")
});
