import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, password: string, role?: 'user' | 'admin' | 'superadmin') => Promise<boolean>;
  register: (mobile: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addAmountToUser: (userId: string, amount: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (mobile: string, password: string, role?: 'user' | 'admin' | 'superadmin'): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let authenticatedUser: User | null = null;

    if (mobile === '9999999999' && password === 'superadmin' && role === 'superadmin') {
      const superAdminUser: User = {
        id: 'superadmin',
        mobile,
        name: 'Super Admin',
        role: 'superadmin',
        coins: 0,
        coupons: [],
        createdAt: new Date().toISOString(),
        totalSpent: 0,
        email: 'superadmin@betmaster.com'
      };
      authenticatedUser = superAdminUser;
    } else if (mobile === '7269010957' && password === 'admin' && role === 'admin') {
      const adminUser: User = {
        id: 'admin',
        mobile,
        name: 'Admin',
        role: 'admin',
        coins: 0,
        coupons: [],
        createdAt: new Date().toISOString(),
        totalSpent: 0,
        email: 'admin@betmaster.com'
      };
      authenticatedUser = adminUser;
    } else if (mobile === '7269010957' && password === 'user' && role === 'user') {
      const regularUser: User = {
        id: 'user',
        mobile,
        name: 'Regular User',
        role: 'user',
        coins: 0,
        coupons: [],
        createdAt: new Date().toISOString(),
        totalSpent: 0,
        email: 'user@betmaster.com'
      };
      authenticatedUser = regularUser;
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (mobile: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUser = mockUsers.find(u => u.mobile === mobile);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      mobile,
      name,
      role: 'user',
      coins: 0,
      coupons: [],
      createdAt: new Date().toISOString(),
      totalSpent: 0,
      email: ''
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }
    }
  };

  const addAmountToUser = (userId: string, amount: number) => {
    // Find user in mockUsers and update their coins
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].coins += amount;
      
      // If the updated user is the current logged-in user, update the state
      if (user && user.id === userId) {
        const updatedUser = { ...user, coins: user.coins + amount };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, addAmountToUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};