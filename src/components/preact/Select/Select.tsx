import { useCallback, useState } from 'react'
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';

export interface Option {
	value: string;
	label: string;
}

export interface SelectProps {
	label?: string;
	options: Option[];
	onSelect?: (selected: Option) => void;
}

export default function Select({ options, onSelect, label }: SelectProps) {
	const [selected, setSelected] = useState<Option | null>(null)

	const onSelectInternal = useCallback((sel: Option) => {
		setSelected(sel);
		onSelect?.(sel);
	}, [setSelected, onSelect]);

	return (
		<Field
			className={clsx('flex items-end gap-5 text-[0.85rem]/[150%] font-semibold hover:text-black', {
				'text-black': !!selected,
				'text-black/60': !selected
			})}
		>
			<Label>{label}</Label>
			<Listbox value={selected} onChange={onSelectInternal}>
				<div className="relative mt-2 flex-1">
					<ListboxButton className="relative w-full cursor-default bg-white py-1.5 text-left text-black border-black/60 border-b focus:outline-none focus:border-black">
						{selected === null
							? <div className='flex justify-between'>
								<span className='text-black/60'>Please select...</span>

								<ChevronDownIcon className='h-5 w-5' />
							</div>
							:
							<>
								<span className="flex items-center">
									<span className="ml-3 block truncate">{selected?.label ?? ''}</span>
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center">
									<ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-black/60" />
								</span>

							</>

						}
					</ListboxButton >

					<ListboxOptions
						transition
						className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
					>
						{options.map((opt) => (
							<ListboxOption
								key={opt.value}
								value={opt}
								className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
							>
								<div className="flex items-center">
									<span className="ml-3 block text-xs md:text-[0.85rem] group-data-[selected]:font-semibold">
										{opt.label}
									</span>
								</div>

								<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
									<CheckIcon aria-hidden="true" className="h-5 w-5" />
								</span>
							</ListboxOption>
						))}
					</ListboxOptions>
				</div >
			</Listbox >
		</ Field >

	)
}

