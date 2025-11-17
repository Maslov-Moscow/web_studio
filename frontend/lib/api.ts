// API configuration and utility functions
import { z } from 'zod';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Zod schemas for runtime validation
const ServiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const CompanyStatSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
  description: z.string(),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ProcessStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  points: z.array(z.string()),
  step_number: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ClientSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string(),
  logo_url: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string(),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Type definitions inferred from schemas
export type Service = z.infer<typeof ServiceSchema>;
export type CompanyStat = z.infer<typeof CompanyStatSchema>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type Client = z.infer<typeof ClientSchema>;

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Fetch utilities with error handling and validation
async function fetchAPI<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
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

    const data = await response.json();

    // Validate response data with Zod
    const validatedData = schema.parse(data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`Validation error for ${url}:`, error.errors);
      throw new Error(`Invalid API response format: ${error.message}`);
    }
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

// API functions with validation
export async function getServices(): Promise<Service[]> {
  return fetchAPI('/services/', z.array(ServiceSchema));
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  return fetchAPI('/stats/', z.array(CompanyStatSchema));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchAPI('/process/', z.array(ProcessStepSchema));
}

export async function getClients(): Promise<Client[]> {
  return fetchAPI('/clients/', z.array(ClientSchema));
}

export async function submitContactInquiry(data: ContactInquiry): Promise<void> {
  await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
