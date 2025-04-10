'use client'

import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

const COMMON_PASSWORDS = [
    'password', '12345678', 'qwerty123', 'letmein', 'welcome'
];

interface PasswordInputProps {
    onValidPassword?: (isValid: boolean) => void;
    onStrengthChange?: (strength: 'weak' | 'medium' | 'strong') => void;
    onChange?: (password: string) => void;
}

const PasswordInput = ({ onValidPassword, onStrengthChange, onChange }: PasswordInputProps) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
    const [showPassword, setShowPassword] = useState(false);
    const [isTouched, setIsTouched] = useState(false); // Track if field is touched

    const validatePassword = (value: string) => {
        const errors: string[] = [];

        // Basic validations
        if (value.length < 8) errors.push('At least 8 characters');
        if (!/[A-Z]/.test(value)) errors.push('One uppercase letter');
        if (!/[a-z]/.test(value)) errors.push('One lowercase letter');
        if (!/[0-9]/.test(value)) errors.push('One number');
        if (!/[!@#$%^&*]/.test(value)) errors.push('One special character');
        if (/\s/.test(value)) errors.push('No spaces allowed');

        // Check common passwords
        if (COMMON_PASSWORDS.includes(value.toLowerCase())) {
            errors.push('Password is too common');
        }

        // Calculate strength
        const passedChecks = 6 - errors.length;
        let newStrength: typeof strength = 'weak';
        if (passedChecks >= 5) newStrength = 'strong';
        else if (passedChecks >= 3) newStrength = 'medium';

        setStrength(newStrength);
        onStrengthChange?.(newStrength);

        if (errors.length > 0) {
            setError(`Requirements: ${errors.join(', ')}`);
            onValidPassword?.(false);
            return false;
        }

        setError('');
        onValidPassword?.(true);
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        onChange?.(value);
        setIsTouched(true); // Mark as touched on change
    };

    const handleBlur = () => {
        setIsTouched(true); // Mark as touched on blur
    };

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    return (
        <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur} // Add blur handler
                    placeholder="Enter a password"
                    className={error && isTouched ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm cursor-pointer"
                >
                    {showPassword ? <IconEyeOff stroke={2} size={20} /> : <IconEye stroke={2} size={20} />}
                </button>
            </div>

            {
                isTouched && (
                    <div className="flex gap-1 h-1.5">
                        <div className={`w-1/3 rounded ${strength === 'weak' ? 'bg-red-500' : 'bg-gray-200'}`} />
                        <div className={`w-1/3 rounded ${strength === 'medium' ? 'bg-yellow-500' : 'bg-gray-200'}`} />
                        <div className={`w-1/3 rounded ${strength === 'strong' ? 'bg-green-500' : 'bg-gray-200'}`} />
                    </div>
                )
            }

            {/* Only show error after touch */}
            {isTouched && error && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Only show success after touch */}
            {isTouched && !error && password.length > 0 && (
                <div className="text-green-500 text-sm flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Strong password!</span>
                </div>
            )}
        </div>
    );
};

export default PasswordInput;