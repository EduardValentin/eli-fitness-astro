import { clsx } from "clsx";
import type { ComponentChildren } from "preact";
import Spinner from "../Spinner/Spinner";

export interface Props {
	children?: ComponentChildren;
	href?: string;
	onClick?: () => void;
	class?: string;
	size?: "small" | "medium" | "large" | "xl";
	color?: "white" | "black" | "pink";
	type?: "button" | "submit" | "reset";
	loading?: boolean;
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
		loading,
	} = props;
	const classes = {
		"block transition-all": true,
		[className]: true,
		"px-16 py-5 text-xl": size === "xl",
		"px-5 py-2": size === "small",
		"bg-white hover:bg-black hover:text-white text-black": color === "white",
		"bg-black hover:bg-white hover:text-black text-white": color === "black",
		"bg-purple-800 hover:bg-purple-900 text-white": color === "pink",
	};

	if (loading) {
		<Spinner />;
	}

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
