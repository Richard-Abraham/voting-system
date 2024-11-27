import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getElectionSchedule } from '../../lib/api/elections';

export function ElectionCalendar() {
  const { data: events } = useQuery({
    queryKey: ['electionSchedule'],
    queryFn: getElectionSchedule
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Election Calendar</h2>
      <div className="space-y-4">
        {events?.map(event => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 