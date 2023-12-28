import Button, { type Props as ButtonProps } from "../Button/Button.tsx";
import { useState } from "preact/hooks";
import Modal from "../Modal/Modal.tsx";
import { Form, Formik } from "formik";
import schema from "./schema.ts";
import FormikInput from "../Input/FormikInput.tsx";
import useSubmitApplication from "./useSubmitApplication.ts";

interface Props {
	title: string;
	buttonText: string;
	items: string[];
	price: number;
	important?: boolean;
}

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	details: string;
}
const ServicesCard = (props: Props) => {
	const { title, buttonText, items, price, important } = props;
	const [modalOpen, setModalOpen] = useState(false);
	const { isError, isSubmitted, isSubmitting, submitApplication } =
		useSubmitApplication();
	const buttonProps: ButtonProps = important
		? {
				color: "pink",
				class:
					"border-pink mt-auto from-purple-300 bg-gradient-to-r to-purple-700 hover:from-purple-400 hover:to-purple-800",
		  }
		: {
				color: "white",
				class: "border-2 border-black mt-auto",
		  };

	const handleFormSubmit = (values: FormValues) => {
		return submitApplication(values);
	};

	return (
		<div class="bg-white relative flex flex-col gap-5 p-5 text-black md:w-96 w-full">
			<h2 class="mb-3 font-semibold text-xl text-center">{title}</h2>
			<div class="text-center">
				<span class="text-lg mr-2">€</span>
				<span class="text-4xl font-semibold font-sans text-black/80">
					{price}
				</span>
			</div>

			<ul>
				{items.map((item) => (
					<li class="border-b last-of-type:border-none text-slate-700 p-2 text-sm">
						{item}
					</li>
				))}
			</ul>
			<Button
				class="border-2 mt-auto border-black"
				color="black"
				onClick={() => {
					setModalOpen(true);
				}}
				{...buttonProps}
			>
				{buttonText}
			</Button>
			<Modal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			>
				<div class="p-10">
					<h4 class="text-xl font-semibold text-center mb-5 text-black/80">
						Great choice!
					</h4>
					<p class="text-[0.85rem]/[150%] text-center mb-6">
						In order to apply for the <span class="font-bold">{title}</span>{" "}
						plan, please fill in the information bellow and I'll reach out to
						you as soon as possible
					</p>
					<Formik
						validationSchema={schema}
						onSubmit={handleFormSubmit}
						initialValues={{
							details: "",
							email: "",
							firstName: "",
							lastName: "",
						}}
						validateOnChange={false}
						class="flex flex-col gap-2"
					>
						{() => {
							return (
								<Form>
									<FormikInput name="firstName" label="First Name" fullWidth />

									<FormikInput name="lastName" fullWidth label="Last Name" />
									<FormikInput name="email" fullWidth label="Email" />
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
						}}
					</Formik>
				</div>
			</Modal>
		</div>
	);
};

export default ServicesCard;
