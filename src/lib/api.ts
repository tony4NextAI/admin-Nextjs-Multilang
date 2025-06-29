import { getSession } from 'next-auth/react';

export const API_BASE_URL = 'http://65.109.108.95:3001/api/';

export const ApiPath = {
  adminLogin: 'admin/login',
  userList: 'admin/user/list',
  
  // Add more endpoints here as needed
};

// Extended session type to include accessToken
interface ExtendedSession {
  accessToken?: string;
  user?: {
    name?: string;
    email?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
  requireAuth?: boolean; // Optional flag to indicate if auth is required
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  let url = `${API_BASE_URL}${endpoint.replace(/^\//, '')}`;

  // Handle query params
  if (options.params) {
    const stringParams: Record<string, string> = {};
    Object.entries(options.params).forEach(([key, value]) => {
      stringParams[key] = String(value);
    });
    const query = new URLSearchParams(stringParams).toString();
    url += `?${query}`;
  }

  // Get session and token automatically
  const session = await getSession() as ExtendedSession | null;
  const token = session?.accessToken;

  // Check if auth is required but not available
  if (options.requireAuth !== false && !token) {
    throw new Error('Authentication required but no valid session found');
  }

  const fetchOptions: RequestInit = {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Automatically add auth header if token is available
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...(options.body && typeof options.body === 'object' ? { body: JSON.stringify(options.body) } : {}),
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Helper function for authenticated API calls
export async function apiAuthFetch<T>(
  endpoint: string,
  options: Omit<RequestOptions, 'requireAuth'> = {}
): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, requireAuth: true });
}

// Helper function for public API calls (no auth required)
export async function apiPublicFetch<T>(
  endpoint: string,
  options: Omit<RequestOptions, 'requireAuth'> = {}
): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, requireAuth: false });
} 