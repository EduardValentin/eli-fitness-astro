import { useCallback, useState } from 'preact/hooks';

export interface SubmitApplicationBody {
    altcha: string;
    name?: string;
    email: string;
}

export default function useEBookRequest() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const doRequest = useCallback(
        async (body: SubmitApplicationBody) => {
            setIsSubmitting(true);
            setIsSubmitted(false);
            setIsError(false);

            try {
                const res = await fetch('/api/ebook-requests', {
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });
                setIsSubmitted(true);
                if (res.status < 200 || res.status >= 300) {
                    setIsError(true);
                }
            } catch (e) {
                setIsError(true);
            } finally {
                setIsSubmitting(false);
            }
        },
        [setIsSubmitting, setIsSubmitted, setIsError]
    );

    return { isSubmitting, isSubmitted, isError, doRequest };
}
