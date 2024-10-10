import type { ComponentChild } from 'preact'
import {
    createPortal,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'preact/compat'
import { Close } from '../icons'
import clsx from 'clsx'

interface ModalProps {
    open?: boolean
    onClose: () => void
    children: ComponentChild
}
const Modal = (props: ModalProps) => {
    const { open = false, onClose, children } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    useLayoutEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }
        return () => {
            document.body.style.overflow = 'visible'
        }
    }, [open])

    useEffect(() => {
        setIsVisible(open)
    }, [open])

    if (!open) return null

    const ModalComponent = (
        <div
            tabIndex={-1}
            ref={containerRef}
            aria-hidden={!open}
            onClick={(e) => {
                if (e.target === containerRef.current) {
                    onClose()
                }
            }}
            class="fixed flex flex-wrap items-center justify-center top-0 left-0 right-0 z-50 x w-full bg-black/40 overflow-x-hidden overflow-y-auto md:inset-0 h-screen"
        >
            <div
                class={clsx(
                    'p-10 bg-white relative transition-all duration-200 ease-in-out opacity-0 -translate-y-[100vh]',
                    {
                        'transform-none opacity-100': isVisible,
                    }
                )}
            >
                <div className="flex mb-5 justify-end">
                    <button
                        aria-label="close modal"
                        type="button"
                        className="group"
                        onClick={onClose}
                    >
                        <Close width={16} class="group-hover:fill-black/40" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
    return createPortal(
        ModalComponent,
        document.getElementById('modal-root') ?? document.body
    )
}

export default Modal
