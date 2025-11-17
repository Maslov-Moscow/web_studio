// API configuration and utility functions
import { z } from 'zod';

// For client-side requests (browser), use relative path through nginx
// For server-side requests (SSR), use internal Docker network URL
const getApiBaseUrl = () => {
  // Check if we're on the server (Node.js) or client (browser)
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // Server-side: use internal Docker URL to nginx or backend
    // This allows SSR to fetch data through the internal network
    return process.env.NEXT_PUBLIC_API_URL_INTERNAL || 'http://nginx/api';
  }

  // Client-side: use relative path (goes through nginx proxy)
  return process.env.NEXT_PUBLIC_API_URL || '/api';
};

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

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

const HeroSectionSchema = z.object({
  id: z.number(),
  badge_text: z.string(),
  headline: z.string(),
  subheading: z.string(),
  primary_cta_text: z.string(),
  primary_cta_url: z.string(),
  secondary_cta_text: z.string(),
  secondary_cta_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SiteSettingsSchema = z.object({
  id: z.number(),
  company_name: z.string(),
  company_tagline: z.string(),
  company_description: z.string(),
  logo_url: z.string().url().optional().or(z.literal('')),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const NavigationItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  href: z.string(),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SocialLinkSchema = z.object({
  id: z.number(),
  platform: z.string(),
  url: z.string().url(),
  icon: z.string(),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TrustIndicatorSchema = z.object({
  id: z.number(),
  text: z.string(),
  color: z.string(),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SectionHeaderSchema = z.object({
  id: z.number(),
  section_key: z.string(),
  badge_text: z.string(),
  heading: z.string(),
  subheading: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const FooterLinkGroupSchema = z.object({
  id: z.number(),
  group_name: z.string(),
  links: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
  order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Type definitions inferred from schemas
export type Service = z.infer<typeof ServiceSchema>;
export type CompanyStat = z.infer<typeof CompanyStatSchema>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type NavigationItem = z.infer<typeof NavigationItemSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type TrustIndicator = z.infer<typeof TrustIndicatorSchema>;
export type SectionHeader = z.infer<typeof SectionHeaderSchema>;
export type FooterLinkGroup = z.infer<typeof FooterLinkGroupSchema>;

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Mock data for development and testing
const MOCK_DATA = {
  services: [
    {
      id: 1,
      title: "SEO & Digital Marketing",
      description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
      icon: "Search",
      features: [
        "Keyword research and optimization",
        "On-page and technical SEO",
        "Content marketing strategy",
        "Link building campaigns"
      ],
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Custom Software Development",
      description: "Tailored software solutions that perfectly fit your business needs and scale with your growth.",
      icon: "Code",
      features: [
        "Full-stack web development",
        "Mobile app development",
        "API design and integration",
        "Cloud infrastructure setup"
      ],
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "AI & LLM Integration",
      description: "Leverage cutting-edge AI technology to automate processes and enhance user experiences.",
      icon: "Brain",
      features: [
        "ChatGPT and LLM integration",
        "AI-powered chatbots",
        "Document processing automation",
        "Custom AI model training"
      ],
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  stats: [
    {
      id: 1,
      label: "Projects Completed",
      value: "50+",
      description: "Successful Projects",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      label: "Happy Clients",
      value: "30+",
      description: "Satisfied Customers",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      label: "Years Experience",
      value: "5+",
      description: "In Digital Solutions",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      label: "Team Members",
      value: "15+",
      description: "Expert Professionals",
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  processSteps: [
    {
      id: 1,
      title: "Discovery",
      description: "Understanding your business goals and requirements",
      icon: "FileSearch",
      points: [
        "Initial consultation",
        "Requirements gathering",
        "Competitive analysis"
      ],
      step_number: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Planning",
      description: "Creating a detailed roadmap for your project",
      icon: "Lightbulb",
      points: [
        "Project scope definition",
        "Timeline planning",
        "Resource allocation"
      ],
      step_number: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Development",
      description: "Building your solution with agile methodology",
      icon: "Code2",
      points: [
        "Iterative development",
        "Regular testing",
        "Client feedback loops"
      ],
      step_number: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Launch",
      description: "Deploying and supporting your solution",
      icon: "Rocket",
      points: [
        "Final testing and QA",
        "Production deployment",
        "Training and support"
      ],
      step_number: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  clients: [
    {
      id: 1,
      name: "TechCorp Inc.",
      abbreviation: "TC",
      logo_url: "",
      website: "",
      description: "Leading technology company",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Digital Solutions",
      abbreviation: "DS",
      logo_url: "",
      website: "",
      description: "Digital transformation agency",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Innovation Labs",
      abbreviation: "IL",
      logo_url: "",
      website: "",
      description: "Research and development company",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Smart Systems",
      abbreviation: "SS",
      logo_url: "",
      website: "",
      description: "Enterprise software provider",
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  heroSection: {
    id: 1,
    badge_text: "Цифровые решения для современного бизнеса",
    headline: "Трансформируйте свой бизнес с помощью передовых цифровых решений",
    subheading: "Мы специализируемся на SEO и цифровом маркетинге, разработке программного обеспечения на заказ и интеграции искусственного интеллекта/LLM, чтобы помочь малому и среднему бизнесу в регионе СНГ достичь своих целей цифровой трансформации.",
    primary_cta_text: "Start Your Project",
    primary_cta_url: "#contact",
    secondary_cta_text: "View Our Work",
    secondary_cta_url: "#cases",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  siteSettings: {
    id: 1,
    company_name: "WebStudio",
    company_tagline: "Transforming businesses through innovative digital solutions",
    company_description: "Transforming businesses through innovative digital solutions. Your trusted partner in the CIS region.",
    logo_url: "",
    email: "info@webstudio.com",
    phone: "+1 (234) 567-890",
    address: "Moscow, Russia",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  navigation: [
    {
      id: 1,
      label: "Services",
      href: "#services",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      label: "About",
      href: "#about",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      label: "Cases",
      href: "#cases",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      label: "Contact",
      href: "#contact",
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  socialLinks: [
    {
      id: 1,
      platform: "Facebook",
      url: "https://facebook.com",
      icon: "Facebook",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      platform: "Twitter",
      url: "https://twitter.com",
      icon: "Twitter",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "Linkedin",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      platform: "GitHub",
      url: "https://github.com",
      icon: "Github",
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  trustIndicators: [
    {
      id: 1,
      text: "100% Money Back Guarantee",
      color: "green",
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      text: "NDA Protected",
      color: "blue",
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      text: "Agile Methodology",
      color: "purple",
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  sectionHeaders: [
    {
      id: 1,
      section_key: "services",
      badge_text: "Our Services",
      heading: "Complete Digital Solutions for Your Business",
      subheading: "From strategy to implementation, we provide end-to-end digital services to help you succeed in the modern marketplace.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      section_key: "about",
      badge_text: "About Us",
      heading: "Building Digital Success Stories Since 2020",
      subheading: "We are a dynamic web studio specializing in delivering innovative digital solutions for small and medium businesses across the CIS region.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      section_key: "process",
      badge_text: "Our Process",
      heading: "How We Work",
      subheading: "A proven methodology that ensures successful project delivery from concept to launch",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      section_key: "clients",
      badge_text: "Trusted By",
      heading: "Companies That Trust Us",
      subheading: "We've helped dozens of companies achieve their digital transformation goals",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  footerLinkGroups: [
    {
      id: 1,
      group_name: "Quick Links",
      links: [
        { label: "Services", href: "#services" },
        { label: "About Us", href: "#about" },
        { label: "Portfolio", href: "#cases" },
        { label: "Contact", href: "#contact" }
      ],
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      group_name: "Services",
      links: [
        { label: "SEO Marketing", href: "#services" },
        { label: "Software Development", href: "#services" },
        { label: "AI Integration", href: "#services" },
        { label: "Consulting", href: "#contact" }
      ],
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      group_name: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" }
      ],
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]
};

// Fetch utilities with error handling and validation
async function fetchAPI<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  mockData?: T,
  options?: RequestInit
): Promise<T> {
  // Return mock data if USE_MOCK_API is enabled and mock data is provided
  if (USE_MOCK_API && mockData !== undefined) {
    console.log(`[MOCK] Using mock data for ${endpoint}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return schema.parse(mockData);
  }

  // Get the API base URL dynamically (determines client vs server)
  const apiBaseUrl = getApiBaseUrl();
  const url = `${apiBaseUrl}${endpoint}`;

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
  return fetchAPI('/services/', z.array(ServiceSchema), MOCK_DATA.services);
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  return fetchAPI('/stats/', z.array(CompanyStatSchema), MOCK_DATA.stats);
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchAPI('/process/', z.array(ProcessStepSchema), MOCK_DATA.processSteps);
}

export async function getClients(): Promise<Client[]> {
  return fetchAPI('/clients/', z.array(ClientSchema), MOCK_DATA.clients);
}

export async function getHeroSection(): Promise<HeroSection> {
  return fetchAPI('/hero-section/', HeroSectionSchema, MOCK_DATA.heroSection);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchAPI('/site-settings/', SiteSettingsSchema, MOCK_DATA.siteSettings);
}

export async function getNavigation(): Promise<NavigationItem[]> {
  return fetchAPI('/navigation/', z.array(NavigationItemSchema), MOCK_DATA.navigation);
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return fetchAPI('/social-links/', z.array(SocialLinkSchema), MOCK_DATA.socialLinks);
}

export async function getTrustIndicators(): Promise<TrustIndicator[]> {
  return fetchAPI('/trust-indicators/', z.array(TrustIndicatorSchema), MOCK_DATA.trustIndicators);
}

export async function getSectionHeader(sectionKey: string): Promise<SectionHeader | null> {
  const headers = await fetchAPI('/section-headers/', z.array(SectionHeaderSchema), MOCK_DATA.sectionHeaders);
  return headers.find(h => h.section_key === sectionKey) || null;
}

export async function getFooterLinkGroups(): Promise<FooterLinkGroup[]> {
  return fetchAPI('/footer-links/', z.array(FooterLinkGroupSchema), MOCK_DATA.footerLinkGroups);
}

export async function submitContactInquiry(data: ContactInquiry): Promise<void> {
  if (USE_MOCK_API) {
    console.log('[MOCK] Contact inquiry submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  const apiBaseUrl = getApiBaseUrl();
  await fetch(`${apiBaseUrl}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
