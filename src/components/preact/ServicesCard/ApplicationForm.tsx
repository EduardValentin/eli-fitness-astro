import { Form, useFormikContext } from "formik";
import FormikInput from "../Input/FormikInput.tsx";
import Button from "../Button/Button.tsx";

const ApplicationForm = () => {
	const { isSubmitting } = useFormikContext();
	return (
		<Form>
			<FormikInput required name="firstName" label="First Name" fullWidth />

			<FormikInput required name="lastName" fullWidth label="Last Name" />
			<FormikInput required name="email" fullWidth label="Email" />
			<FormikInput name="gender" fullWidth label="Gender" />
			<FormikInput name="goal" fullWidth label="Goal" />
			<FormikInput
				name="fitnessExperience"
				fullWidth
				label="Fitness Experience"
			/>
			<FormikInput name="age" type="number" fullWidth label="Age" />

			<Button
				class="border-2 w-full mt-5 border-black"
				color="white"
				type="submit"
				loading={isSubmitting}
			>
				Apply
			</Button>
		</Form>
	);
};

export default ApplicationForm;
