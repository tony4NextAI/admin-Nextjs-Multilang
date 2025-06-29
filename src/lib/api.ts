export const API_BASE_URL = 'http://65.109.108.95:3001/api/';

export const ApiPath = {
  adminLogin: 'admin/login',
  userList: 'admin/user/list',
  
  // Add more endpoints here as needed
};

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
  token?: string;
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

  const fetchOptions: RequestInit = {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { 'Authorization': `Bearer ${options.token}` } : {}),
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