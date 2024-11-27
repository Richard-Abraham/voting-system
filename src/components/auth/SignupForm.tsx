import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  studentId: z.string().min(1, 'Student ID is required'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    // Handle invite flow
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    
    if (token && type === 'invite') {
      handleInviteSignup(token);
    }
  }, [searchParams]);

  const handleInviteSignup = async (token: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'invite',
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      console.error('Invite error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred processing the invite');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;

      // 2. Create the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData?.user?.id,
            role: 'student',
            student_id: data.studentId,
          }
        ]);

      if (profileError) throw profileError;

      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            {...register('studentId')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.studentId && (
            <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
} 