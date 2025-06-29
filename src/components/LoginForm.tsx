'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaUser, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';

export default function LoginForm({ locale }: Readonly<{ locale: string }>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.push(`/${locale}/dashboard`);
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-100">
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800 font-medium">
          <strong>Demo Credentials:</strong>
        </p>
        <p className="text-sm text-blue-700 mt-1">
          Username: <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">admin1</code>
        </p>
        <p className="text-sm text-blue-700 mt-1">
          Password: <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">D@ngthanhdung173</code>
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline mr-2" />
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              <FaLock className="inline mr-2" />
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient-primary w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                Loading...
              </>
            ) : (
              <>
                <FaSignInAlt className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 