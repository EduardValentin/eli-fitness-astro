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
				await fetch("/api/send-email", {
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
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
