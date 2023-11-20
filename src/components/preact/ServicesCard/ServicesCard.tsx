import Button, { type Props as ButtonProps } from "../Button/Button.tsx";
import { useState } from "preact/hooks";
import Modal from "../Modal/Modal.tsx";
import Input from "../Input/Input.tsx";

export const prerender = true;

interface Props {
	title: string;
	buttonText: string;
	items: string[];
	price: number;
	important?: boolean;
}
const ServicesCard = (props: Props) => {
	const { title, buttonText, items, price, important } = props;
	const [modalOpen, setModalOpen] = useState(false);

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

	return (
		<div class="bg-white relative flex flex-col gap-5 p-5 text-black w-96">
			<h2 class="mb-3 text-center">{title}</h2>
			<div class="text-center">
				<span class="text-lg mr-2">€</span>
				<span class="text-4xl font-semibold">{price}</span>
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
				<div>
					<h4 class="text-xl font-semibold text-center mb-3 text-black/80">
						Great choice!
					</h4>
					<p class="text-[0.85rem]/[150%] text-center mb-6">
						In order to apply for the <span class="font-bold">{title}</span>{" "}
						plan, please fill in the information bellow and I'll reach out to
						you as soon as possible
					</p>
					<form class="flex flex-col gap-2">
						<Input fullWidth label="First Name" />
						<Input fullWidth label="Last Name" />
						<Input fullWidth label="Email" />
						<Input fullWidth label="Additional Details" multiline />

						<Button class="border-2 mt-5 border-black" color="white">
							Apply
						</Button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default ServicesCard;
