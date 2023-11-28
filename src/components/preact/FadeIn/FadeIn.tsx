import clsx from "clsx";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

const FadeIn = ({ children }: PropsWithChildren) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isVisible, setVisible] = useState(false);

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setVisible(entry.isIntersecting);
				});
			},
			{
				threshold: 0.01,
			}
		);

		if (ref.current) {
			intersectionObserver.observe(ref.current);
		}
		return () => ref.current && intersectionObserver.unobserve(ref.current);
	}, []);

	return (
		<div
			ref={ref}
			class={clsx("", {
				"opacity-100 transition-all duration-700 ease-in-out visible transform-none":
					isVisible,
				"opacity-0 invisible translate-x-[20vh]": !isVisible,
			})}
		>
			{children}
		</div>
	);
};

export default FadeIn;
