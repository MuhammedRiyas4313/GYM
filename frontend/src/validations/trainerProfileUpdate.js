import * as yup from 'yup';

// const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const trainerProfileUpdateSchema = yup.object().shape({
  fname: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),
  dob: yup.date().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  phone: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
    .required('Required')
});

