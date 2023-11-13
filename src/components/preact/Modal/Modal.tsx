import type { ComponentChild } from "preact";
import { createPortal } from "preact/compat";

interface ModalProps {
	open?: boolean;
	onClose: () => void;
	children: ComponentChild;
}
const Modal = (props: ModalProps) => {
	const { open = false, onClose, children } = props;

	if (!open) return null;

	const ModalComponent = (
		<div
			tabIndex={-1}
			aria-hidden={!open}
			onClick={onClose}
			class="fixed flex items-center justify-center top-0 left-0 right-0 z-50 x w-full bg-black/40 overflow-x-hidden overflow-y-auto md:inset-0 h-screen"
		>
			<div class="p-5 bg-white relative">{children}</div>
		</div>
	);
	return createPortal(ModalComponent, document.body);
};

export default Modal;
