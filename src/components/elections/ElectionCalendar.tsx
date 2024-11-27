
import { useQuery } from '@tanstack/react-query';
import { getElections } from '../../lib/api/elections';

export function ElectionCalendar() {
  const { data: elections, isLoading } = useQuery({
    queryKey: ['elections'],
    queryFn: getElections,
  });

  if (isLoading) return <div>Loading calendar...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Election Calendar</h2>
      <div className="space-y-4">
        {elections?.map((election) => (
          <div key={election.id} className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-medium">{election.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 