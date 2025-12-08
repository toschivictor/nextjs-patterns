interface InputProps {
	type: 'text' | 'number' | 'email' | 'password';
	label: string;
	value: string | number;
	name: string;
	placeholder?: string;
	error: string | boolean;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange,
}: InputProps) => {
	return (
		<div className="flex flex-col space-y-1">
			<label htmlFor={label} className="text-sm font-semibold text-gray-500">
				{label}
			</label>
			<input
				type={type}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
				className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
			/>
			{error && (
				<p className="text-red-500 text-sm">
					{typeof error === 'string' ? error : "Input field can't be empty!"}
				</p>
			)}
		</div>
	);
};
