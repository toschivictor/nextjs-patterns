interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	primary?: boolean;
	backgroundColor?: string;
	size?: 'small' | 'medium' | 'large';
	label: string;
	loading?: boolean;
	onClick?: () => void;
}

export const Button = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	loading = false,
	type = 'button',
	...props
}: ButtonProps) => {
	const mode = primary ? 'bg-blue-500 text-white' : 'bg-transparent text-gray';
	return (
		<button
			type={type}
			className={[
				'flex items-center justify-center px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4',
				`storybook-button--${size}`,
				mode,
			].join(' ')}
			{...props}
		>
			{label}
			{loading && (
				<div className="w-4 h-4 rounded-full animate-spin ml-2 border border-solid border-white border-t-transparent" />
			)}
			<style jsx>{`
				button {
					background-color: ${backgroundColor};
				}
			`}</style>
		</button>
	);
};
