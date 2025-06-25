import React, { useState } from 'react';
import {
  Smartphone as MobileIcon,
  Lock,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

interface AuthFormProps {
  mode: 'login' | 'register';
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        const { mobile, password } = formData;
        
        // Super Admin credentials
        if (mobile === '9999999999' && password === 'superadmin') {
          await login(mobile, password, 'superadmin');
        }
        // Admin credentials
        else if (mobile === '7269010957' && password === 'admin') {
          await login(mobile, password, 'admin');
        }
        // User credentials
        else if (mobile === '7269010957' && password === 'user') {
          await login(mobile, password, 'user');
        } else {
          setError('Invalid mobile number or password.');
        }
      }
      else {
        console.log('Attempting registration with:', formData);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join BetMaster'}
          </h2>
          <p className="text-gray-300">
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Start your journey today'}
          </p>
        </div>

        {/* Login Credentials Info */}
        {mode === 'login' && (
          <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2">Demo Credentials:</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p><strong>Super Admin:</strong> 9999999999 / superadmin</p>
              <p><strong>Admin:</strong> 7269010957 / admin</p>
              <p><strong>User:</strong> 7269010957 / user</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <MobileIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {mode === 'register' && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 rounded-lg p-3 border border-red-500/20">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={isLoading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 transition-colors duration-200"
            size="lg"
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              onClick={onToggleMode}
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;