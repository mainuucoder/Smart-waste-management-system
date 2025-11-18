import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Trash2, 
  Mail, 
  Lock, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle,
  Loader2 
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {
      email: '',
      password: ''
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general error
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔄 Attempting login...');
      
      const result = await login(formData.email, formData.password);
      console.log('📨 Login result:', result);

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        
        const savedUser = JSON.parse(localStorage.getItem('user'));
        console.log('👤 User data from localStorage:', savedUser);
        console.log('👤 User Role:', savedUser?.role);
        
        // Small delay to show success message
        setTimeout(() => {
          // Navigate based on role
          if (savedUser?.role === 'admin') {
            console.log('🔐 Redirecting to /admin');
            navigate('/admin', { replace: true });
          } else {
            console.log('🔐 Redirecting to /dashboard');
            navigate('/dashboard', { replace: true });
          }
        }, 1500);
        
      } else {
        // Handle different types of errors
        const errorMessage = result.error || 'Login failed. Please try again.';
        setError(errorMessage);
        
        // Specific error handling
        if (errorMessage.toLowerCase().includes('invalid credentials') || 
            errorMessage.toLowerCase().includes('invalid email or password')) {
          setFieldErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password'
          });
        } else if (errorMessage.toLowerCase().includes('network') || 
                   errorMessage.toLowerCase().includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        }
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Demo credentials for testing
  const fillDemoCredentials = (role = 'user') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@smartwaste.com',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'user@example.com',
        password: 'password123'
      });
    }
    setError('');
    setFieldErrors({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Trash2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Smart Waste Management account
          </p>
        </div>

        {/* Demo Credentials - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user')}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                User Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100" onSubmit={handleSubmit}>
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center space-x-2 animate-fade-in">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start space-x-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium block">{error}</span>
                {error.includes('Network error') && (
                  <span className="text-xs text-red-600 mt-1 block">
                    Please check your internet connection and try again.
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3 h-5 w-5 ${
                  fieldErrors.email ? 'text-red-400' : formData.email ? 'text-green-500' : 'text-gray-400'
                } transition-colors`} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    fieldErrors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : formData.email 
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1 animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 h-5 w-5 ${
                  fieldErrors.password ? 'text-red-400' : formData.password ? 'text-green-500' : 'text-gray-400'
                } transition-colors`} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    fieldErrors.password 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : formData.password 
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1 animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.password}</span>
                </p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          {/* Registration Link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </form>

        {/* Additional Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;