import { useField } from 'formik'
import Input, { type InputProps } from './Input'

interface FormikInputProps extends InputProps {
    name: string
}
const FormikInput = ({ name, ...rest }: FormikInputProps) => {
    const [inputProps, { error }, { setError, setValue }] = useField({ name })
    return (
        <Input
            error={error}
            {...inputProps}
            {...rest}
            onClear={() => {
                setError(undefined)
                setValue('')
            }}
        />
    )
}

export default FormikInput
