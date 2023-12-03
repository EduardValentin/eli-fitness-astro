import { useCallback, useState } from "preact/hooks";

interface RequestBody {
	email: string;
}

export default function useSubmitApplication() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isError, setIsError] = useState(false);

	const submitApplication = useCallback(
		async (body: RequestBody) => {
			setIsSubmitting(true);
			setIsSubmitted(false);
			setIsError(false);

			try {
				await fetch(import.meta.env.PUBLIC_EMAIL_API_HOST, {
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
                    mode: 'no-cors', // 'cors' by default
					method: "POST",
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

	return { isSubmitting, isSubmitted, isError, submitApplication };
}
