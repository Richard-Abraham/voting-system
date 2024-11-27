
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { castVote } from '../../lib/api/elections';
import { useAuth } from '../../components/auth/AuthProvider';

interface VoteButtonProps {
  electionId: string;
  candidateId: string;
  hasVoted: boolean;
}

export function VoteButton({ electionId, candidateId, hasVoted }: VoteButtonProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user) return null;

  const voteMutation = useMutation({
    mutationFn: () => castVote({
      electionId,
      candidateId,
      voterId: user.id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userVotes', electionId] });
      queryClient.invalidateQueries({ queryKey: ['votes', electionId] });
    },
  });

  return (
    <button
      onClick={() => voteMutation.mutate()}
      disabled={hasVoted || voteMutation.isPending}
      className={`px-4 py-2 rounded-md ${
        hasVoted
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
      }`}
    >
      {hasVoted ? 'Voted' : 'Vote'}
    </button>
  );
}