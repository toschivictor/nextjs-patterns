export const postUserAuthentication = async (formData: {
	email: string;
	password: string;
}): Promise<void> => {
	const response = await fetch('/api/submit', {
		method: 'POST',
		body: JSON.stringify(formData),
	});

	// Handle response if necessary
	const data = await response.json();
};

