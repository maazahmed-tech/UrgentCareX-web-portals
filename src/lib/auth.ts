// Mock authentication utilities
// In a real app, this would connect to a backend

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'facility' | 'doctor';
}

export const mockUsers: Record<string, User> = {
  'admin@urgentcarex.com': {
    id: '1',
    email: 'admin@urgentcarex.com',
    name: 'Admin User',
    role: 'admin',
  },
  'facility@downtownmed.com': {
    id: '2',
    email: 'facility@downtownmed.com',
    name: 'Downtown Medical Center',
    role: 'facility',
  },
  'dr.johnson@downtownmed.com': {
    id: '3',
    email: 'dr.johnson@downtownmed.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
  },
};

export const login = (email: string, password: string): User | null => {
  // Mock password check (in real app, this would be secure)
  if (password === 'password123' && mockUsers[email]) {
    const user = mockUsers[email];
    localStorage.setItem('urgentcarex_user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('urgentcarex_user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('urgentcarex_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};
