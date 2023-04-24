import * as yup from 'yup';

const link =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const trainerSchema = yup.object().shape({
    fname: yup
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(20)
      .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
      .required('Required'),
    dob: yup.date().required('Required'),
    gender: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
    phone: yup
      .number('Phone number must be a 10 digit number')
      .positive()
      .integer()
      .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
      .required('Required'),
    password: yup
      .string()
      .min(5)
      .max(16)
      .required('Required'),
    cpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password must match')
      .required('Required'),
    dob: yup.date().required('Required'),
    link: yup
      .string()
      .matches(link, 'Please paste a valid youtube link here')
      .required('Required')
  });