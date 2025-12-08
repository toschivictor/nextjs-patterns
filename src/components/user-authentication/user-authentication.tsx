'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { useInput } from '@/hooks/use-input';
import { postUserAuthentication } from '@/lib/api/user-authentication';
import { loginSchema, validateForm } from '@/lib/validations';

export const UserAuthentication = () => {
	const emailInput = useInput('');
	const passwordInput = useInput('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Validate form using Zod
		const validation = validateForm(loginSchema, {
			email: emailInput.value,
			password: passwordInput.value,
		});

		// Set field-specific error messages
		emailInput.setError(validation.errors.email || false);
		passwordInput.setError(validation.errors.password || false);

		// If validation fails, stop submission
		if (!validation.isValid) {
			setIsLoading(false);
			return;
		}

		try {
			await postUserAuthentication({
				email: emailInput.value,
				password: passwordInput.value,
			});
			router.push('/dashboard');
		} catch (error) {
			console.error(error);
			// TODO: Add error handling to the form (e.g., show API error message)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col bg-white shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
			<div className="p-4 py-6 text-white bg-blue-500 md:w-72 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
				<p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
					Here we test functionalities, tools, concepts, features and so on.
				</p>
				<p className="flex flex-col items-center justify-center mt-10 text-center">
					<span>Don't have an account?</span>
					<a href="/" className="underline">
						Get Started!
					</a>
				</p>
				<p className="mt-6 text-sm text-center text-gray-300">
					Read our
					<a href="/terms" className="underline">
						terms
					</a>
					and
					<a href="/conditions" className="underline">
						conditions
					</a>
				</p>
			</div>
			<div className="p-5 bg-white md:flex-1">
				<h3 className="my-4 text-2xl font-semibold text-gray-700">
					Account Login
				</h3>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-5">
					<Input
						type="email"
						name="email"
						label="Email address"
						{...emailInput}
					/>
					<Input
						type="password"
						name="password"
						label="Password"
						{...passwordInput}
					/>
					<a
						href="/forgot-password"
						className="text-sm text-blue-600 hover:underline focus:text-blue-800"
					>
						Forgot Password?
					</a>

					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="remember"
							className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
						/>
						<label
							htmlFor="remember"
							className="text-sm font-semibold text-gray-500"
						>
							Remember me
						</label>
					</div>
					<div>
						<Button type="submit" label="Log in" primary loading={isLoading} />
					</div>
				</form>
			</div>
		</div>
	);
};
