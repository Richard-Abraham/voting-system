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

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {
      notificationPreferences: {
        email: false,
        inApp: true,
      }
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Show success message using your preferred notification system
      alert('Profile updated successfully');
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      <form onSubmit={handleSubmit(data => updateProfileMutation.mutate(data))} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            {...register('name')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            {...register('email')} 
            type="email" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <input 
            {...register('studentId')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          />
          {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('notificationPreferences.email')}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('notificationPreferences.inApp')}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">In-app notifications</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
} 