import React from "react";

interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    variant = 'primary',
    children,
    onClick,
    disabled = false,
    className = ''
}: ButtonProps) => {
    const baseStyles = 'w-full h-12 rounded-lg text-lg transition-colors duration-300 flex items-center justify-center';

    const variantStyles = {
        primary: `${disabled ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`,
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;