import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { getElections } from '../../lib/api/elections';
import { StatusBadge } from './StatusBadge';

interface ElectionListProps {
  activeOnly?: boolean;
}

export function ElectionList({ activeOnly = false }: ElectionListProps) {
  const { user } = useAuth();
  const { data: elections, isLoading } = useQuery({
    queryKey: ['elections', { activeOnly }],
    queryFn: getElections,
  });

  const filteredElections = activeOnly 
    ? elections?.filter(e => e.status === 'active')
    : elections;

  if (isLoading) {
    return <div>Loading elections...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#050505] relative">
          Elections
          <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
        </h1>
        {user?.role === 'admin' && (
          <Link
            to="/elections/create"
            className="px-6 py-3 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                      transform transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>Create Election</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredElections?.map((election) => (
          <Link
            key={election.id}
            to={`/election/${election.id}`}
            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                      transform transition-all hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-[#050505] group-hover:text-[#BABBF3]">
              {election.title}
            </h3>
            <p className="mt-3 text-[#4C4C4D]">{election.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge status={election.status} />
              <svg className="w-6 h-6 text-[#BABBF3] opacity-0 group-hover:opacity-100 transition-opacity" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}