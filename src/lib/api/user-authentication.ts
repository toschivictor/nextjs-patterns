export const postUserAuthentication = async (formData: {
	email: string;
	password: string;
}): Promise<void> => {
	const response = await fetch('/api/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({
			message: `HTTP error! status: ${response.status}`,
		}));
		throw new Error(
			errorData.message || `HTTP error! status: ${response.status}`
		);
	}

	// Handle response if necessary
	const data = await response.json();
};

