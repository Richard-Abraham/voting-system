import React from 'react';
import { Link } from 'react-router-dom';

const VOTING_STEPS = [
  {
    title: 'Check Eligibility',
    description: 'Ensure you are a registered student with valid credentials.',
    icon: '🎓'
  },
  {
    title: 'Review Candidates',
    description: 'Learn about each candidate\'s platform and qualifications.',
    icon: '📋'
  },
  {
    title: 'Cast Your Vote',
    description: 'Select your preferred candidate and submit your ballot.',
    icon: '✅'
  },
  {
    title: 'Verify Submission',
    description: 'Confirm your vote has been recorded successfully.',
    icon: '✓'
  }
];

export function VotingGuide() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-[#050505] relative">
        How to Vote
        <span className="absolute bottom-0 left-0 h-1 w-20 bg-[#BABBF3]"></span>
      </h1>
      
      <div className="space-y-8">
        {VOTING_STEPS.map((step, index) => (
          <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg 
                                    hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center 
                          bg-[#FCD29E] bg-opacity-20 rounded-full">
              <span className="text-2xl">{step.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#050505]">{step.title}</h3>
              <p className="mt-2 text-[#4C4C4D]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to="/elections/active"
          className="px-8 py-3 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                    transform transition-all hover:scale-105 shadow-lg"
        >
          View Active Elections
        </Link>
      </div>
    </div>
  );
} 