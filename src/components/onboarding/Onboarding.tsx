import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ONBOARDING_STEPS = [
  {
    title: 'Welcome to Student Elections',
    description: 'Learn how to participate in your student government elections.',
    icon: '🎓'
  },
  {
    title: 'Voting Process',
    description: 'View candidates, make your selection, and submit your vote securely.',
    icon: '🗳️'
  },
  {
    title: 'Election Calendar',
    description: 'Stay updated with important election dates and deadlines.',
    icon: '📅'
  }
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <div className="mb-8 bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 flex items-center justify-center bg-[#BABBF3] bg-opacity-20 rounded-full">
            <span className="text-4xl">{ONBOARDING_STEPS[currentStep].icon}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-[#050505]">
          {ONBOARDING_STEPS[currentStep].title}
        </h2>
        <p className="text-center text-[#4C4C4D]">
          {ONBOARDING_STEPS[currentStep].description}
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
          className="px-6 py-2 text-[#050505] disabled:text-[#4C4C4D] disabled:opacity-50
                    hover:bg-[#BABBF3] hover:bg-opacity-20 rounded-lg transition-all"
        >
          Previous
        </button>
        <button
          onClick={currentStep === ONBOARDING_STEPS.length - 1 ? handleComplete : () => setCurrentStep(prev => prev + 1)}
          className="px-6 py-2 bg-[#050505] text-white rounded-lg hover:bg-[#4C4C4D] 
                    transform transition-all hover:scale-105 shadow-lg"
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
} 