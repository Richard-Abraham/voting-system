export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  logout: () => Promise<void>;
}