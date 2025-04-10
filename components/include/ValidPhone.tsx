'use client'

import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

type CountryRules = {
  regex: RegExp;
  example: string;
  length: number;
};

const COUNTRY_VALIDATION: Record<string, CountryRules> = {
  US: {
    regex: /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/,
    example: '+1 (555) 123-4567',
    length: 10
  },
  IN: {
    regex: /^(\+91\s?)?[6-9]\d{9}$/,
    example: '+91 9876543210',
    length: 10
  },
  UK: {
    regex: /^(\+44\s?7\d{2}|\(?07\d{2}\)?)\s?\d{3}\s?\d{4}$/,
    example: '+44 7911 123456',
    length: 10
  }
};

interface PhoneInputProps {
  defaultCountry?: keyof typeof COUNTRY_VALIDATION;
  onValidPhone?: (phone: string) => void;
}

const ValidPhone = ({ defaultCountry = 'US', onValidPhone }: PhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const validatePhoneNumber = (value: string, country: string): boolean => {
    const countryRules = COUNTRY_VALIDATION[country];
    if (!countryRules) return false;

    const sanitized = value.replace(/[^\d+]/g, '');
    
    // Check length
    if (sanitized.replace('+', '').length !== countryRules.length) {
      setError(`Must be ${countryRules.length} digits`);
      return false;
    }

    // Regex test
    if (!countryRules.regex.test(value)) {
      setError(`Invalid format. Example: ${countryRules.example}`);
      return false;
    }

    setError('');
    onValidPhone?.(sanitized);
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value, selectedCountry);
  };

  const handleCountryChange = (value: string) => {
    const country = value as keyof typeof COUNTRY_VALIDATION;
    setSelectedCountry(country);
    validatePhoneNumber(phoneNumber, country);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-full">
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(COUNTRY_VALIDATION).map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={COUNTRY_VALIDATION[selectedCountry].example}
          className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        />
      </div>
      
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

export default ValidPhone;