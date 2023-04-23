import * as yup from "yup";

export const enrollSchema = yup.object().shape({
  weight: yup
    .number()
    .positive()
    .integer()
    .test("len", "Weight should be maximum of 3 digits", (val) =>
      /^\d{2}$/.test(val)
    )
    .max(300)
    .required("Required"),
  height: yup
    .number()
    .positive()
    .integer()
    .test("len", "Height should be maximum of 3 digits", (val) =>
      /^\d{3}$/.test(val)
    )
    .max(400)
    .required("Required"),
  emergencycontact: yup
    .number("required")
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
    .required("Required"),
  slote: yup
    .string()
    .notOneOf(["Choose Slote"], 'Please choose slote')
    .required("Required"),
  healthinfo: yup
    .string()
    .min(2, "Description must be at least 2 characters")
    .required("Required"),
});
