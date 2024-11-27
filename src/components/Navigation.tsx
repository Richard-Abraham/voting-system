import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

export function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#BABBF3] to-[#FCD29E] bg-clip-text text-transparent">
                StudentVote
              </span>
            </Link>
            
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {[
                  { path: '/dashboard', label: 'Dashboard' },
                  { path: '/elections', label: 'Elections' },
                  { path: '/results', label: 'Results' }
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all
                      ${location.pathname === path || 
                        (path === '/elections' && location.pathname.startsWith('/election'))
                        ? 'border-[#BABBF3] text-[#050505]'
                        : 'border-transparent text-[#4C4C4D] hover:text-[#050505] hover:border-[#FCD29E]'}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-[#4C4C4D] text-sm hidden sm:block">{user.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-[#050505] hover:bg-[#BABBF3] hover:bg-opacity-20 
                            rounded-lg transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[#050505] hover:bg-[#BABBF3] hover:bg-opacity-20 
                            rounded-lg transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                            transition-all hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 