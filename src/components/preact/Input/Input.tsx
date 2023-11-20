import clsx from "clsx";
import { useId, useRef, useState } from "preact/hooks";
import { Close } from "../icons";
import type { HTMLAttributes } from "preact/compat";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	type?: "text" | "email" | "password";
	label?: string;
	placeholder?: string;
	fullWidth?: boolean;
	clearable?: boolean;
	multiline?: boolean;
	rows?: number;
}

const Input = ({
	type = "text",
	label,
	placeholder,
	fullWidth,
	clearable = true,
	multiline = false,
	rows = 3,
	name,
}: InputProps) => {
	const id = useId();
	const [hasValue, setHasValue] = useState(false);

	const ref = useRef<any>(null);

	const inputClasses =
		"border-b outline-none flex-1 peer hover:border-black text-[0.85rem]/[150%] focus:border-bla border-black/40";
	return (
		<div
			class={clsx(
				{
					"w-full": fullWidth,
					"w-fit": !fullWidth,
				},
				"flex items-end relative mb-2 group"
			)}
		>
			<label
				htmlFor={id}
				class="mr-5 -mb-0.5 text-[0.85rem]/[150%] group-hover:text-black/60 group-focus-within:text-black/60 font-semibold"
			>
				{label}
			</label>
			{multiline ? (
				<textarea
					onChange={(e) => {
						if (!ref.current) return;
						setHasValue(ref.current.value.length > 0);
					}}
					ref={ref}
					name={name}
					rows={rows}
					class={inputClasses}
				/>
			) : (
				<input
					id={id}
					name={name}
					ref={ref}
					type={type}
					placeholder={placeholder}
					onChange={(e) => {
						if (!ref.current) return;
						setHasValue(ref.current.value.length > 0);
					}}
					class={inputClasses}
				/>
			)}

			{clearable && hasValue && (
				<button
					type="button"
					class="ml-2 absolute right-0 bottom-1/2 translate-y-1/2"
					onClick={() => {
						if (!ref.current) return;
						setHasValue(false);
						ref.current.value = "";
					}}
				>
					<Close width={16} />
				</button>
			)}
		</div>
	);
};

export default Input;
