import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getElection, getVoteCount, getUserVotes, updateElectionStatus } from '../../lib/api/elections';
import { useAuth } from '../auth/AuthProvider';
import { VoteButton } from './VoteButton';

export function ElectionDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: election, isLoading: isLoadingElection } = useQuery({
    queryKey: ['election', id],
    queryFn: () => getElection(id!),
    enabled: !!id,
  });

  const { data: voteCount, isLoading: isLoadingVotes } = useQuery({
    queryKey: ['votes', id],
    queryFn: () => getVoteCount(id!),
    enabled: !!id,
  });

  const { data: userVotes = [], isLoading: isLoadingUserVotes } = useQuery({
    queryKey: ['userVotes', id],
    queryFn: () => getUserVotes(id!, user!.id),
    enabled: !!id && !!user,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'draft' | 'active' | 'completed' }) =>
      updateElectionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['election', id] });
    },
  });

  if (isLoadingElection || isLoadingVotes || isLoadingUserVotes) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-[#4C4C4D]">Loading election details...</div>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-[#4C4C4D]">
        Election not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-[#050505] relative">
        {election.title}
        <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
      </h1>
      <p className="text-[#4C4C4D] mb-8">{election.description}</p>

      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize
          ${election.status === 'active' ? 'bg-[#BABBF3] bg-opacity-20 text-[#050505]' : 
            election.status === 'completed' ? 'bg-[#FCD29E] bg-opacity-20 text-[#050505]' : 
            'bg-[#4C4C4D] bg-opacity-20 text-[#050505]'}`}>
          {election.status}
        </span>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold mb-6 text-[#050505]">Candidates</h2>
        <div className="space-y-6">
          {election.candidates?.map((candidate) => (
            <div key={candidate.id} 
                 className="flex items-center justify-between p-4 rounded-lg hover:bg-[#BABBF3] hover:bg-opacity-5 transition-colors">
              <div>
                <h3 className="font-medium text-[#050505]">{candidate.name}</h3>
                <p className="text-sm text-[#4C4C4D] mt-1">{candidate.platform}</p>
              </div>
              {election.status === 'active' && (
                <VoteButton
                  electionId={election.id}
                  candidateId={candidate.id}
                  hasVoted={userVotes.includes(candidate.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}