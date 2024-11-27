
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

export function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <div className="text-center space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#050505]">
          <span className="bg-gradient-to-r from-[#BABBF3] to-[#FCD29E] bg-clip-text text-transparent">
            Student Election Platform
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#4C4C4D] max-w-2xl mx-auto">
          Make your voice heard in shaping the future of your student community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          {user ? (
            <Link
              to="/elections"
              className="px-8 py-3 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                        transform transition-all hover:scale-105 shadow-lg"
            >
              View Elections
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-8 py-3 bg-[#BABBF3] text-[#050505] rounded-lg hover:bg-opacity-90 
                          transform transition-all hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 bg-[#FCD29E] text-[#050505] rounded-lg hover:bg-opacity-90 
                          transform transition-all hover:scale-105 shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 