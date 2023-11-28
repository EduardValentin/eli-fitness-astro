import { object, string } from "yup";

export default object({
	firstName: string().required("First name is required"),
	lastName: string().required("Last name is required"),
	email: string()
		.email("Email format is not valid")
		.required("Email is required"),
});
