import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';

// Lazy load components
const LoginForm = React.lazy(() => 
  import('./components/auth/LoginForm').then(module => ({ default: module.LoginForm }))
);
const SignupForm = React.lazy(() => 
  import('./components/auth/SignupForm').then(module => ({ default: module.SignupForm }))
);
const Dashboard = React.lazy(() => 
  import('./components/dashboard/Dashboard').then(module => ({ default: module.Dashboard }))
);
const ProfileSettings = React.lazy(() => 
  import('./components/profile/ProfileSettings').then(module => ({ default: module.ProfileSettings }))
);
const ResultsPage = React.lazy(() => 
  import('./components/elections/ResultsPage').then(module => ({ default: module.ResultsPage }))
);
const ElectionList = React.lazy(() => 
  import('./components/elections/ElectionList').then(module => ({ default: module.ElectionList }))
);
const CreateElectionForm = React.lazy(() => 
  import('./components/elections/CreateElectionForm').then(module => ({ default: module.CreateElectionForm }))
);
const ElectionDetails = React.lazy(() => 
  import('./components/elections/ElectionDetails').then(module => ({ default: module.ElectionDetails }))
);
const HelpCenter = React.lazy(() => 
  import('./components/support/HelpCenter').then(module => ({ default: module.HelpCenter }))
);
const FAQ = React.lazy(() => 
  import('./components/support/FAQ').then(module => ({ default: module.FAQ }))
);
const TechnicalSupport = React.lazy(() => 
  import('./components/support/TechnicalSupport').then(module => ({ default: module.TechnicalSupport }))
);
const VotingGuide = React.lazy(() => 
  import('./components/voting-guide/VotingGuide').then(module => ({ default: module.VotingGuide }))
);

const queryClient = new QueryClient();

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
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
              <Suspense fallback={<LoadingSpinner />}>
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
              </Suspense>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;