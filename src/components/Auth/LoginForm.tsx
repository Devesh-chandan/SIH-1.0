import React, { useState } from 'react';
import { Eye, EyeOff, TreePine, User, Briefcase, Handshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Define the RoleButton component to keep the main component clean
interface RoleButtonProps {
  role: 'admin' | 'employee' | 'beneficiary';
  label: string;
  icon: React.ElementType;
  isSelected: boolean;
  onClick: (role: 'admin' | 'employee' | 'beneficiary') => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ role, label, icon: Icon, isSelected, onClick }) => {
  const selectedClasses = isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100';

  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ease-in-out border border-gray-200 ${selectedClasses}`}
      onClick={() => onClick(role)}
    >
      <Icon className="h-6 w-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'employee' | 'beneficiary',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleRoleChange = (role: 'admin' | 'employee' | 'beneficiary') => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(formData.email, formData.password, formData.role);

    if (!success) {
      setError('Invalid credentials. Use password: demo123');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <TreePine className="h-8 w-8 text-white" />
          </div> */}
          <h2 className="text-3xl font-bold text-gray-900">FRA Atlas & WebGIS</h2>
          <p className="mt-2 text-sm text-gray-600">
            Forest Rights Act Decision Support System
          </p>
          <p className="text-xs text-gray-500 mt-1">Ministry of Tribal Affairs, Government of India</p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Login As
            </label>
            <div className="grid grid-cols-3 gap-4">
              <RoleButton
                role="admin"
                label="Admin"
                icon={Briefcase}
                isSelected={formData.role === 'admin'}
                onClick={handleRoleChange}
              />
              <RoleButton
                role="employee"
                label="Employee"
                icon={User}
                isSelected={formData.role === 'employee'}
                onClick={handleRoleChange}
              />
              <RoleButton
                role="beneficiary"
                label="Beneficiary"
                icon={Handshake}
                isSelected={formData.role === 'beneficiary'}
                onClick={handleRoleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Demo Credentials: Use password "demo123" for any email</p>
            <p>Click on the buttons above to select a role</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
