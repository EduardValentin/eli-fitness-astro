import { useEffect, useRef } from 'preact/hooks'

export default function usePrevious<T>(value: T) {
    const previousValue = useRef(value)

    useEffect(() => {
        previousValue.current = value
    }, [value])

    return previousValue.current
}
