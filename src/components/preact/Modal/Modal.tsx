import type { ComponentChild } from "preact";
import {
	createPortal,
	useEffect,
	useLayoutEffect,
	useRef,
} from "preact/compat";
import { Close } from "../icons";

interface ModalProps {
	open?: boolean;
	onClose: () => void;
	children: ComponentChild;
}
const Modal = (props: ModalProps) => {
	const { open = false, onClose, children } = props;

	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
		return () => {
			document.body.style.overflow = "visible";
		};
	}, [open]);

	if (!open) return null;

	const ModalComponent = (
		<div
			tabIndex={-1}
			ref={containerRef}
			aria-hidden={!open}
			onClick={(e) => {
				if (e.target === containerRef.current) {
					onClose();
				}
			}}
			class="fixed flex items-center justify-center top-0 left-0 right-0 z-50 x w-full bg-black/40 overflow-x-hidden overflow-y-auto md:inset-0 h-screen"
		>
			<div class="p-5 bg-white relative">
				<div className="flex mb-5 justify-end">
					<button aria-label="close modal" type="button" onClick={onClose}>
						<Close width={16} />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
	return createPortal(ModalComponent, document.body);
};

export default Modal;
