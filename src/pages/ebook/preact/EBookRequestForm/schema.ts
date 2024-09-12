import { object, string } from 'yup';

export default object({
    name: string()
        .matches(/^[a-zA-Z ]*$/, {
            message: 'Only letters and spaces are allowed',
        })
        .trim()
        .required('First name is required'),
    email: string()
        .email('Email format is not valid')
        .required('Email is required'),
});
