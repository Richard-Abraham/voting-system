import { useQuery } from '@tanstack/react-query';
import { getElections } from '../../lib/api/elections';

export function ElectionCalendar() {
  const { data: elections } = useQuery({
    queryKey: ['elections'],
    queryFn: getElections
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Election Calendar</h2>
      <div className="space-y-4">
        {elections?.map(election => (
          <div key={election.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 text-sm text-gray-500">
              {new Date(election.startDate).toLocaleDateString()}
            </div>
            <div>
              <h4 className="font-medium">{election.title}</h4>
              <p className="text-sm text-gray-600">{election.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 