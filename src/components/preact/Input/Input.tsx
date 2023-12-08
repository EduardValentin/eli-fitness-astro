import clsx from "clsx";
import { useId, useRef, useState } from "preact/hooks";
import { Close } from "../icons";
import type { HTMLAttributes } from "preact/compat";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
	// type?: "text" | "email" | "password" ;
	label?: string;
	placeholder?: string;
	fullWidth?: boolean;
	clearable?: boolean;
	multiline?: boolean;
	rows?: number;
	error?: string | undefined;
	initialValue?: string;
	onClear?: () => void;
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
	error,
	onChange,
	onClear,
	...rest
}: InputProps) => {
	const id = useId();
	const [hasValue, setHasValue] = useState(false);

	const ref = useRef<any>(null);

	const inputClasses = clsx(
		"border-b outline-none flex-1 peer text-[0.85rem]/[150%] pr-5",
		{
			"border-red-600/40 focus:border-red-600 hover:border-red-600": error,
			"border-black/60 focus:border-black hover:border-black": !error,
		}
	);
	return (
		<div>
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
					class={clsx("mr-5 -mb-0.5 text-[0.85rem]/[150%] font-semibold", {
						"text-red-600 group-hover:text-red-600/60 group-focus-within:text-red-600/60 ":
							error,
						"text-black group-hover:text-black/60 group-focus-within:text-black/60 ":
							!error,
					})}
				>
					{label}
				</label>
				{multiline ? (
					<textarea
						onChange={(e) => {
							if (!ref.current) return;
							setHasValue(ref.current.value.length > 0);
							// @ts-ignore
							onChange?.(e);
						}}
						// @ts-ignore
						ref={ref}
						name={name}
						rows={rows}
						class={inputClasses}
						{...rest}
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
							onChange?.(e);
						}}
						class={inputClasses}
						{...rest}
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
							onClear?.();
						}}
					>
						<Close width={16} />
					</button>
				)}
			</div>
			{error && <div class="text-red-600 text-[0.65rem]/[150%]">{error}</div>}
		</div>
	);
};

export default Input;
