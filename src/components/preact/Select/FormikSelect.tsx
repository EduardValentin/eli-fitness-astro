import type { ReactElement } from "preact/compat";
import Select, { type SelectProps } from "./Select";
import { useField } from "formik";

export interface FormikSelectProps extends SelectProps {
	name: string;
}

export default function FormikSelect({ name, ...props }: FormikSelectProps): ReactElement {
	const [{ onChange }] = useField(name);

	return <Select
		{...props}
		onSelect={sel => {
			onChange(name)(sel.value);
		}}
	/>
}
