'use server'

type FetcherOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export async function fetcherFn<T = any>(
  path: string,
  data?: any,
  options: FetcherOptions = {}
): Promise<T> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const {
    method = 'POST',
    headers = {},
  } = options;

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    console.log('data', data)
    fetchOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${apiUrl}/${path}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
}