export interface Candidate {
  id: string;
  name: string;
  description: string;
  platform?: string;
  imageUrl?: string;
  electionId: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed';
  allowMultipleVotes: boolean;
  createdAt: string;
}

export interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  voterId: string;
  createdAt: string;
}