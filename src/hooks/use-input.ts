import { useState } from 'react';

export const useInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string | false>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		// Clear error when user starts typing
		if (error) {
			setError(false);
		}
	};

	return {
		value,
		error,
		onChange: handleChange,
		setError,
	};
};
