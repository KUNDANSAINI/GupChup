'use client'

import { useState } from 'react';
import { Input } from '../ui/input';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface EmailInputProps {
  onValidEmail?: (email: string) => void;
}

const EmailInput = ({ onValidEmail }: EmailInputProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setError('Email is required');
      return false;
    }

    if (!EMAIL_REGEX.test(value)) {
      setError('Invalid email format');
      return false;
    }

    // Domain की अतिरिक्त जांच
    const domain = value.split('@')[1];
    if (!domain.includes('.')) {
      setError('Invalid domain format');
      return false;
    }

    setError('');
    onValidEmail?.(value.trim().toLowerCase());
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      />
      
      {error && (
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
    </div>
  );
};

export default EmailInput;