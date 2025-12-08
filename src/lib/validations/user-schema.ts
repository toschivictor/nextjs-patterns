import { z } from 'zod';

/**
 * Schema for user login form validation
 */
export const loginSchema = z.object({
	email: z.email().min(1, 'Email is required'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters'),
});
