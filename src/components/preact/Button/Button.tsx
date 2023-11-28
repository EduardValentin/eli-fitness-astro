import { clsx } from "clsx";
import type { ComponentChildren } from "preact";

export interface Props {
	children?: ComponentChildren;
	href?: string;
	onClick?: () => void;
	class?: string;
	size?: "small" | "medium" | "large" | "xl";
	color?: "white" | "black" | "pink";
	type?: "button" | "submit" | "reset";
}

const Button = (props: Props) => {
	const {
		href,
		size = "small",
		class: className = "",
		color = "white",
		onClick,
		children,
		type,
	} = props;
	const classes = {
		"block transition-all": true,
		[className]: true,
		"px-16 py-5 text-xl": size === "xl",
		"px-5 py-2": size === "small",
		"bg-white hover:bg-black hover:text-white text-black": color === "white",
		"bg-black hover:bg-white hover:text-black text-white": color === "black",
		"bg-purple-300 hover:bg-purple-700 text-white": color === "pink",
	};

	if (href) {
		return (
			<a className={clsx(classes)} href={href}>
				{children}
			</a>
		);
	}
	return (
		<button className={clsx(classes)} onClick={onClick} type={type}>
			{children}
		</button>
	);
};

export default Button;
