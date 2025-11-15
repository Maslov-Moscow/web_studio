// API configuration and utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Type definitions
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CompanyStat {
  id: number;
  label: string;
  value: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: string[];
  step_number: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  abbreviation: string;
  logo_url?: string;
  website?: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Fetch utilities with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

// API functions
export async function getServices(): Promise<Service[]> {
  return fetchAPI<Service[]>('/services/');
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  return fetchAPI<CompanyStat[]>('/stats/');
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchAPI<ProcessStep[]>('/process/');
}

export async function getClients(): Promise<Client[]> {
  return fetchAPI<Client[]>('/clients/');
}

export async function submitContactInquiry(data: ContactInquiry): Promise<void> {
  await fetchAPI('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
