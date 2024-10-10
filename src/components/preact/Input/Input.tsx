import clsx from 'clsx'
import { useId, useRef, useState } from 'preact/hooks'
import type { HTMLAttributes } from 'preact/compat'
import { XMarkIcon } from '@heroicons/react/20/solid'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    label?: string
    placeholder?: string
    fullWidth?: boolean
    clearable?: boolean
    multiline?: boolean
    rows?: number
    error?: string | undefined
    initialValue?: string
    onClear?: () => void
    classes?: {
        root?: string
        input?: string
        label?: string
    }
}

const Input = ({
    type = 'text',
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
    required,
    classes = {},
    ...rest
}: InputProps) => {
    const id = useId()
    const [hasValue, setHasValue] = useState(false)

    const ref = useRef<any>(null)

    const inputClasses = clsx(
        'border-b outline-none flex-1 py-1.5 peer text-[0.85rem]/[150%] pr-5',
        {
            'border-red-600/40 focus:border-red-600 hover:border-red-600':
                error,
            'border-black/60 focus:border-black hover:border-black': !error,
        },
        classes.input
    )
    return (
        <div class={classes.root}>
            <div
                class={clsx(
                    {
                        'w-full': fullWidth,
                        'w-fit': !fullWidth,
                    },
                    'flex items-end relative mb-2 group'
                )}
            >
                {label && (
                    <label
                        htmlFor={id}
                        class={clsx(
                            'mr-5 text-[0.85rem]/[100%] font-semibold',
                            {
                                'text-red-600/60 group-hover:text-red-600 group-focus-within:text-red-600 ':
                                    error,
                                'text-black/60 group-hover:text-black group-focus-within:text-black ':
                                    !error,
                            },
                            classes.label
                        )}
                    >
                        {label}
                        {required && ' *'}
                    </label>
                )}
                {multiline ? (
                    <textarea
                        onChange={(e) => {
                            if (!ref.current) return
                            setHasValue(ref.current.value.length > 0)
                            // @ts-ignore
                            onChange?.(e)
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
                        required={required}
                        onChange={(e) => {
                            if (!ref.current) return
                            setHasValue(ref.current.value.length > 0)
                            onChange?.(e)
                        }}
                        class={inputClasses}
                        {...rest}
                    />
                )}

                {clearable && hasValue && (
                    <button
                        type="button"
                        class="ml-3 absolute right-0 bottom-1/2 translate-y-1/2"
                        onClick={() => {
                            if (!ref.current) return
                            setHasValue(false)
                            ref.current.value = ''
                            onClear?.()
                        }}
                    >
                        <XMarkIcon className='h-5 w-5 fill-black/60' />
                    </button>
                )}
            </div>
            {error && (
                <div class="text-red-600 text-[0.65rem]/[150%]">{error}</div>
            )}
        </div>
    )
}

export default Input
