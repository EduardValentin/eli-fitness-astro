import type { APIRoute } from "astro";

const validateBody = (body: Record<string, unknown>) => {
	if (!body.firstName || !body.lastName || !body.email) {
		throw new Error("Required parameters not present");
	}
};

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();

	validateBody(body);

	return fetch(import.meta.env.EMAIL_API_HOST, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};
