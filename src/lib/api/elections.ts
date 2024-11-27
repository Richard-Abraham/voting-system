import { supabase } from '../supabase';
import type { Election, Candidate, Vote } from '../../types/election';

export async function getElections() {
  const { data, error } = await supabase
    .from('elections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getElection(id: string) {
  if (!id) throw new Error('Election ID is required');
  
  const { data, error } = await supabase
    .from('elections')
    .select(`
      *,
      candidates (
        id,
        name,
        description,
        image_url,
        election_id,
        platform
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    ...data,
    startDate: data.start_date,
    endDate: data.end_date,
    allowMultipleVotes: data.allow_multiple_votes,
    createdAt: data.created_at,
    candidates: data.candidates?.map((candidate: any) => ({
      id: candidate.id,
      name: candidate.name,
      description: candidate.description,
      imageUrl: candidate.image_url,
      electionId: candidate.election_id,
      platform: candidate.description
    }))
  };
}

export async function createElection(data: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  allowMultipleVotes: boolean;
  candidates: Omit<Candidate, 'id' | 'electionId'>[];
  status: string;
}) {
  try {
    // Format dates to ISO string
    const startDate = new Date(data.startDate).toISOString();
    const endDate = new Date(data.endDate).toISOString();

    const { data: election, error } = await supabase
      .from('elections')
      .insert({
        title: data.title,
        description: data.description,
        start_date: startDate,
        end_date: endDate,
        allow_multiple_votes: data.allowMultipleVotes,
        status: data.status
      })
      .select('*')
      .single();

    if (error) throw error;
    if (!election) throw new Error('No election data returned');

    // Then create the candidates
    const { error: candidateError } = await supabase
      .from('candidates')
      .insert(
        data.candidates.map(candidate => ({
          name: candidate.name,
          description: candidate.description,
          image_url: candidate.imageUrl || null,
          election_id: election.id
        }))
      );

    if (candidateError) throw candidateError;

    return election;
  } catch (error) {
    console.error('Election creation error:', error);
    throw error;
  }
}

export async function createCandidate(candidate: Omit<Candidate, 'id'>) {
  const { data, error } = await supabase
    .from('candidates')
    .insert([candidate])
    .select()
    .single();

  if (error) throw error;
  return data as Candidate;
}

export async function castVote(vote: Omit<Vote, 'id' | 'createdAt'>) {
  const { data, error } = await supabase
    .from('votes')
    .insert([{ ...vote, createdAt: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data as Vote;
}

export async function getVoteCount(electionId: string) {
  const { data, error } = await supabase
    .rpc('get_vote_counts', { election_id: electionId });

  if (error) throw error;
  return data as { candidateId: string; count: number }[];
}

export async function getUserVotes(electionId: string, userId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('candidateId')
    .eq('electionId', electionId)
    .eq('voterId', userId);

  if (error) throw error;
  return data as { candidateId: string }[];
}

export async function updateElectionStatus(id: string, status: Election['status']) {
  const { data, error } = await supabase
    .from('elections')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Election;
}

export async function getElectionSchedule() {
  const { data, error } = await supabase
    .from('elections')
    .select('id, title, description, start_date')
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.start_date
  }));
}

export async function getCompletedElections() {
  const { data, error } = await supabase
    .from('elections')
    .select(`
      id,
      title,
      position,
      candidates (
        id,
        name,
        votes:votes_count
      )
    `)
    .eq('status', 'completed');

  if (error) throw error;
  return data;
}