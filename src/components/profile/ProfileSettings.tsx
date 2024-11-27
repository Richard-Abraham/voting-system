import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../auth/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateUserProfile, getUserProfile } from '../../lib/api/profile';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  studentId: z.string().min(1, 'Student ID is required'),
  notificationPreferences: z.object({
    email: z.boolean(),
    inApp: z.boolean(),
  }),
});

export function ProfileSettings() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {},
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Show success message
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      <form onSubmit={handleSubmit(data => updateProfileMutation.mutate(data))} className="space-y-6">
        {/* Form fields */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
} 