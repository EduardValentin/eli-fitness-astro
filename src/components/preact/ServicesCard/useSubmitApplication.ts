import { useCallback, useState } from 'preact/hooks';

export interface SubmitApplicationBody {
    altcha: string;
    plan: string;
    firstName: string;
    lastName: string;
    gender?: string;
    age?: number;
    fitnessExperience?: string;
    goal?: string;
    email: string;
}

export default function useSubmitApplication() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const reset = useCallback(() => {
        setIsSubmitting(false);
        setIsSubmitted(false);
        setIsError(false);
    }, []);

    const submitApplication = useCallback(
        async (body: SubmitApplicationBody) => {
            setIsSubmitting(true);
            setIsSubmitted(false);
            setIsError(false);

            try {
                await fetch('/api/appointments', {
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });
                setIsSubmitted(true);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsSubmitting(false);
            }
        },
        [setIsSubmitting, setIsSubmitted, setIsError]
    );

    return { isSubmitting, isSubmitted, isError, submitApplication, reset };
}
