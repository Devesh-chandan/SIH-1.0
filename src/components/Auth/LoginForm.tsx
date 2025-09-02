import React, { useState } from 'react';
import { Eye, EyeOff, User, Briefcase, Handshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RoleButtonProps {
  role: 'admin' | 'employee' | 'beneficiary';
  label: string;
  icon: React.ElementType;
  isSelected: boolean;
  onClick: (role: 'admin' | 'employee' | 'beneficiary') => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({
  role,
  label,
  icon: Icon,
  isSelected,
  onClick,
}) => {
  const selectedClasses = isSelected
    ? 'bg-green-600 text-white shadow-md'
    : 'bg-white bg-opacity-80 text-gray-700 hover:bg-gray-100 border border-gray-300';

  return (
    <button
      type="button"
      className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${selectedClasses}`}
      onClick={() => onClick(role)}
    >
      <Icon className="h-5 w-5" />
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
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="istockphoto-1044134410-640_adpp_is (1).mp4"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      {/* Login Form Box */}
      <div className="relative z-20 max-w-md w-full space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">FRA Atlas & WebGIS</h2>
          <p className="mt-2 text-sm text-gray-200">
            Forest Rights Act Decision Support System
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Ministry of Tribal Affairs, Government of India
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Semi-transparent outer box */}
          <div className="rounded-2xl shadow-2xl backdrop-blur-lg p-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border:'2px solid white' }}>
  {/* Fully opaque inner content */}
  <div className="space-y-6 p-8 bg-white bg-opacity-0 rounded-2xl">
    {/* Role Selection */}
    <div >
      <label   htmlFor="role" className="block text-sm font-medium text-gray-800 mb-3"  style={{color:'white'}} >
        Login As
      </label>

      {/* Buttons stay fully opaque */}
      <div style={{ opacity :'1'}} className="grid grid-cols-3 gap-3">
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


              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2"  style={{ color: 'white'}}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2"  style={{color:'white'}}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-base transition-transform transform hover:scale-105 shadow-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Footer Text */}
              <div className="text-xs text-gray-700 text-center space-y-1 pt-2">
                <p>Demo Credentials: Use password "demo123" for any email</p>
                <p>Click on the buttons above to select a role</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
