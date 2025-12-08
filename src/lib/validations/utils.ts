import { z } from 'zod';

/**
 * Validates form data against a Zod schema and returns formatted errors
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Object with isValid flag and field-specific errors
 */
export function validateForm<T extends z.ZodTypeAny>(
	schema: T,
	data: unknown,
): {
	isValid: boolean;
	errors: Record<string, string>;
} {
	try {
		schema.parse(data);
		return { isValid: true, errors: {} };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors: Record<string, string> = {};
			error.issues.forEach((err) => {
				const path = err.path.join('.');
				errors[path] = err.message;
			});
			return { isValid: false, errors };
		}
		throw error;
	}
}
