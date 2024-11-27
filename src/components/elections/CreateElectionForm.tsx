import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createElection } from '../../lib/api/elections';
import { CandidateForm } from './CandidateForm';
import type { Candidate } from '../../types/election';

const electionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().refine(date => new Date(date) > new Date(), {
    message: 'Start date must be in the future',
  }),
  endDate: z.string().refine(date => new Date(date) > new Date(), {
    message: 'End date must be in the future',
  }),
  allowMultipleVotes: z.boolean(),
});

type ElectionFormData = z.infer<typeof electionSchema>;

export function CreateElectionForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'candidates' | 'details'>('candidates');
  const [candidates, setCandidates] = useState<Omit<Candidate, 'id' | 'electionId'>[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ElectionFormData>({
    resolver: zodResolver(electionSchema),
    defaultValues: {
      allowMultipleVotes: false,
    },
  });

  const createElectionMutation = useMutation({
    mutationFn: async (data: ElectionFormData & { candidates: Omit<Candidate, 'id' | 'electionId'>[]; status: string }) => {
      const result = await createElection(data);
      return result;
    },
    onSuccess: (election) => {
      navigate(`/election/${election.id}`);
    },
    onError: (error) => {
      console.error('Failed to create election:', error);
      alert('Failed to create election. Please try again.');
    }
  });

  const handleAddCandidate = (candidate: Omit<Candidate, 'id' | 'electionId'>) => {
    setCandidates(prev => [...prev, candidate]);
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (candidates.length >= 2) {
      setStep('details');
    } else {
      alert('Please add at least two candidates before continuing');
    }
  };

  const onSubmit = (data: ElectionFormData) => {
    createElectionMutation.mutate({
      ...data,
      candidates,
      status: 'draft',
    });
  };

  if (step === 'candidates') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-[#050505] relative">
          Add Election Candidates
          <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
          <CandidateForm
            candidates={candidates}
            onAddCandidate={handleAddCandidate}
            onRemoveCandidate={handleRemoveCandidate}
          />
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={candidates.length < 2}
              className="px-6 py-3 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                        transform transition-all hover:scale-105 shadow-lg disabled:opacity-50 
                        disabled:hover:scale-100 disabled:hover:bg-[#050505]"
            >
              Continue to Election Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-[#050505] relative">
        Set Election Details
        <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
      </h2>
      <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                {...register('startDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                {...register('endDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('allowMultipleVotes')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Allow multiple votes per student
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep('candidates')}
              className="text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Candidates
            </button>
            <button
              type="submit"
              disabled={createElectionMutation.isPending}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {createElectionMutation.isPending ? 'Creating...' : 'Create Election'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}