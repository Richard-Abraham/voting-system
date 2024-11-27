import React, { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-[#050505] mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`block w-full px-4 py-2 rounded-lg border-2 border-[#BABBF3] bg-white
                     focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#050505]
                     placeholder-[#4C4C4D] transition-colors
                     disabled:bg-gray-50 disabled:border-[#4C4C4D] disabled:cursor-not-allowed
                     ${error ? 'border-red-500' : ''} 
                     ${className || ''}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput'; 