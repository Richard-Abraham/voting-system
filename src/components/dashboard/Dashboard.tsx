import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ElectionCalendar } from '../elections/ElectionCalendar';
import { NotificationsPanel } from '../dashboard/NotificationsPanel';
import { getElections } from '../../lib/api/elections';

export function Dashboard() {
  useQuery({
    queryKey: ['activeElections'],
    queryFn: getElections
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-[#050505] relative mb-8">
        Welcome Back
        <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/elections/active"
          className="group bg-[#050505] text-white rounded-xl p-6 hover:scale-105 
                    transform transition-all shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vote Now</h3>
            <span className="text-2xl">🗳️</span>
          </div>
          <p className="mt-2 text-gray-300">Cast your vote in active elections</p>
          <div className="mt-4 flex items-center text-[#BABBF3] group-hover:translate-x-2 transition-transform">
            <span>View Elections</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>
        
        <Link
          to="/candidates"
          className="bg-white rounded-xl p-6 hover:scale-105 transform transition-all 
                    shadow-lg hover:shadow-xl border-2 border-[#BABBF3] border-opacity-20"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#050505]">Candidates</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="mt-2 text-[#4C4C4D]">Learn about your candidates</p>
        </Link>

        <Link
          to="/help/voting-guide"
          className="bg-white rounded-xl p-6 hover:scale-105 transform transition-all 
                    shadow-lg hover:shadow-xl border-2 border-[#FCD29E] border-opacity-20"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#050505]">Voting Guide</h3>
            <span className="text-2xl">📋</span>
          </div>
          <p className="mt-2 text-[#4C4C4D]">Learn how to cast your vote</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <ElectionCalendar />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
} 