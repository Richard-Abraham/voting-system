import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/auth/AuthProvider';
import { LoginForm } from './components/auth/LoginForm';
import { ElectionList } from './components/elections/ElectionList';
import { ElectionDetails } from './components/elections/ElectionDetails';
import { CreateElectionForm } from './components/elections/CreateElectionForm';
import { useAuth } from './components/auth/AuthProvider';
import { SignupForm } from './components/auth/SignupForm';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { ResultsPage } from './components/elections/ResultsPage';
import { HelpCenter } from './components/support/HelpCenter';
import { FAQ } from './components/support/FAQ';
import { TechnicalSupport } from './components/support/TechnicalSupport';
import { VotingGuide } from './components/voting-guide/VotingGuide';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="/results" element={
                  <ProtectedRoute>
                    <ResultsPage />
                  </ProtectedRoute>
                } />
                <Route path="/elections" element={
                  <ProtectedRoute>
                    <ElectionList />
                  </ProtectedRoute>
                } />
                <Route path="/elections/create" element={
                  <ProtectedRoute>
                    <CreateElectionForm />
                  </ProtectedRoute>
                } />
                <Route path="/election/:id" element={
                  <ProtectedRoute>
                    <ElectionDetails />
                  </ProtectedRoute>
                } />
                <Route path="/elections/active" element={
                  <ProtectedRoute>
                    <ElectionList activeOnly={true} />
                  </ProtectedRoute>
                } />

                {/* Support Routes */}
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/help/faq" element={<FAQ />} />
                <Route path="/help/technical" element={<TechnicalSupport />} />
                <Route path="/help/voting-guide" element={<VotingGuide />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;