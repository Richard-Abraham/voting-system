import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { AuthState, User } from '../../types/auth';

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  loading: true,
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setState({ user: null, session: null, loading: false, logout });
  };

  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    logout
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        updateUserData(session);
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await updateUserData(session);
      } else {
        setState({ user: null, session: null, loading: false, logout });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function updateUserData(session: any) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setState({ user: null, session: null, loading: false, logout });
        return;
      }

      const user: User = {
        id: session.user.id,
        email: session.user.email,
        role: profile?.role || 'student',
        studentId: profile?.student_id,
        name: profile?.name || session.user.email.split('@')[0],
      };

      setState({ user, session, loading: false, logout });
    } catch (err) {
      console.error('Error in updateUserData:', err);
      setState({ user: null, session: null, loading: false, logout });
    }
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}