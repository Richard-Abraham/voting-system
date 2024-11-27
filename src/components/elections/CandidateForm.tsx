import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Candidate } from '../../types/election';
import { FormInput } from '../../components/common/FormInput';

const candidateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

interface CandidateFormProps {
  candidates: Omit<Candidate, 'id' | 'electionId'>[];
  onAddCandidate: (candidate: CandidateFormData) => void;
  onRemoveCandidate: (index: number) => void;
}

export function CandidateForm({ candidates, onAddCandidate, onRemoveCandidate }: CandidateFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
  });

  const onSubmit = (data: CandidateFormData) => {
    onAddCandidate(data);
    reset();
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {candidates.map((candidate, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-[#BABBF3] bg-opacity-5 rounded-lg">
          <div>
            <h3 className="font-medium text-[#050505]">{candidate.name}</h3>
            <p className="text-sm text-[#4C4C4D]">{candidate.description}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemoveCandidate(index)}
            className="text-[#4C4C4D] hover:text-[#050505] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {isAdding ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Name"
            {...register('name')}
            error={errors.name?.message}
          />
          
          <div>
            <label className="block text-sm font-medium text-[#050505] mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="block w-full px-4 py-2 rounded-lg border-2 border-[#BABBF3] bg-white
                         focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#050505]
                         placeholder-[#4C4C4D] transition-colors"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#050505] mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              {...register('imageUrl')}
              className="block w-full px-4 py-2 rounded-lg border-2 border-[#BABBF3] bg-white
                         focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#050505]
                         placeholder-[#4C4C4D] transition-colors"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-[#050505] hover:bg-[#BABBF3] hover:bg-opacity-20 
                        rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                        transform transition-all hover:scale-105 shadow-lg"
            >
              Add Candidate
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full p-4 border-2 border-dashed border-[#BABBF3] rounded-lg 
                    text-[#4C4C4D] hover:border-[#050505] hover:text-[#050505] 
                    transition-colors"
        >
          + Add Candidate
        </button>
      )}
    </div>
  );
}