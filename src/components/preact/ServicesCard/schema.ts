import { number, object, string } from 'yup';

export default object({
    firstName: string()
        .matches(/^[a-zA-Z]*$/, { message: 'Only letters are allowed' })
        .trim()
        .required('First name is required'),
    lastName: string()
        .matches(/^[a-zA-Z]*$/, { message: 'Only letters are allowed' })
        .trim()
        .required('Last name is required'),
    age: number()
        .nullable()
        .min(1, 'Age must be greater than 1')
        .max(100, 'Age must be lower than 100'),
    email: string()
        .email('Email format is not valid')
        .required('Email is required'),
});
