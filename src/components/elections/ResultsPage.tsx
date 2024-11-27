import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompletedElections } from '../../lib/api/elections';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function ResultsPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  
  const { data: elections } = useQuery({
    queryKey: ['completedElections'],
    queryFn: getCompletedElections
  });

  const filteredElections = elections?.filter(election => 
    selectedPosition === 'all' || election.position === selectedPosition
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Election Results</h1>
      
      <div className="mb-6">
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="rounded-md border-gray-300"
        >
          <option value="all">All Positions</option>
          {/* Add position options dynamically */}
        </select>
      </div>

      {filteredElections?.map(election => (
        <div key={election.id} className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{election.title}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={election.candidates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
} 