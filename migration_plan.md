# Migration Plan: Figma Design to Next.js Frontend

## Overview
Migrate the modern web studio landing page from `from_figma/` (React/Vite) to `frontend/` (Next.js 14 App Router), replacing the current homepage with a full-featured design.

## Current State Analysis

### from_figma/ Directory (Source)
- **Framework**: React 18.3.1 + Vite 6.3.5 + TypeScript
- **Styling**: Tailwind CSS v4.1.3 with custom OKLCH color scheme
- **UI Library**: 51 shadcn/ui components (all Radix UI based)
- **Components**: 7 main sections + Header + Footer
- **Assets**: External Unsplash images (need to be replaced with placeholders)

### frontend/ Directory (Target)
- **Framework**: Next.js 14.1.0 + React 18.2.0 + TypeScript
- **Styling**: Tailwind CSS 3.4.1 (default config)
- **UI Library**: None (clean slate)
- **Components**: Empty `/components` directory
- **Current Homepage**: Simple placeholder page

## Migration Phases

### Phase 1: Dependencies & Configuration

#### 1.1 Update package.json
Add 40+ new dependencies to `frontend/package.json`:

**Radix UI Primitives (23 packages)**:
```json
"@radix-ui/react-accordion": "^1.2.3",
"@radix-ui/react-alert-dialog": "^1.1.6",
"@radix-ui/react-aspect-ratio": "^1.1.2",
"@radix-ui/react-avatar": "^1.1.3",
"@radix-ui/react-checkbox": "^1.1.4",
"@radix-ui/react-collapsible": "^1.1.3",
"@radix-ui/react-context-menu": "^2.2.6",
"@radix-ui/react-dialog": "^1.1.6",
"@radix-ui/react-dropdown-menu": "^2.1.6",
"@radix-ui/react-hover-card": "^1.1.6",
"@radix-ui/react-label": "^2.1.2",
"@radix-ui/react-menubar": "^1.1.6",
"@radix-ui/react-navigation-menu": "^1.2.5",
"@radix-ui/react-popover": "^1.1.6",
"@radix-ui/react-progress": "^1.1.2",
"@radix-ui/react-radio-group": "^1.2.3",
"@radix-ui/react-scroll-area": "^1.2.3",
"@radix-ui/react-select": "^2.1.6",
"@radix-ui/react-separator": "^1.1.2",
"@radix-ui/react-slider": "^1.2.3",
"@radix-ui/react-slot": "^1.1.2",
"@radix-ui/react-switch": "^1.1.3",
"@radix-ui/react-tabs": "^1.1.3",
"@radix-ui/react-toggle": "^1.1.2",
"@radix-ui/react-toggle-group": "^1.1.2",
"@radix-ui/react-tooltip": "^1.1.8"
```

**UI Utilities**:
```json
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.0",
"tailwind-merge": "^2.2.0",
"cmdk": "^1.1.1",
"vaul": "^1.1.2",
"sonner": "^2.0.3"
```

**Icons & Interactions**:
```json
"lucide-react": "^0.487.0",
"embla-carousel-react": "^8.6.0"
```

**Forms**:
```json
"react-hook-form": "^7.55.0",
"react-day-picker": "^8.10.1",
"input-otp": "^1.4.2"
```

**Other**:
```json
"next-themes": "^0.4.6",
"react-resizable-panels": "^2.1.7",
"recharts": "^2.15.2"
```

#### 1.2 Install Dependencies
```bash
cd frontend
npm install
```

#### 1.3 Configure Tailwind CSS
Update `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

#### 1.4 Update globals.css
Replace `frontend/app/globals.css` with design tokens:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Phase 2: Utility Functions

#### 2.1 Create lib/utils.ts
Create `frontend/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Phase 3: Copy shadcn/ui Components

Copy all 51 components from `from_figma/src/components/ui/` to `frontend/components/ui/`:

**Essential Components** (used in design):
- `button.tsx`
- `card.tsx`
- `sheet.tsx` (mobile menu)
- `accordion.tsx` (mobile work process)
- `carousel.tsx` (mobile services)
- `separator.tsx`

**All Other Components** (51 total):
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- button.tsx
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dialog.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toast.tsx
- toaster.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-toast.tsx

**Note**: Add `tailwindcss-animate` to devDependencies:
```bash
npm install -D tailwindcss-animate
```

### Phase 4: Copy Custom Components

#### 4.1 ImageWithFallback Component
Copy `from_figma/src/components/figma/ImageWithFallback.tsx` to `frontend/components/figma/ImageWithFallback.tsx`

**Modifications needed**:
- Convert to Next.js Image component if using local images
- Keep fallback SVG logic

### Phase 5: Create Page Components

#### 5.1 Header Component
Copy from: `from_figma/src/components/Header.tsx`
To: `frontend/components/Header.tsx`

**Key features**:
- Sticky navigation
- Mobile menu (Sheet component)
- Logo + navigation links (Services, About, Cases, Contact)
- CTA button "Get Started"
- Add `'use client'` directive (interactive component)

#### 5.2 HeroSection Component
Copy from: `from_figma/src/components/HeroSection.tsx`
To: `frontend/components/HeroSection.tsx`

**Key features**:
- Large heading with gradient text
- Subtitle text
- Two CTA buttons
- 3 stats cards (150+ Projects, 98% Satisfaction, 5+ Years)

#### 5.3 ServicesBlock Component
Copy from: `from_figma/src/components/ServicesBlock.tsx`
To: `frontend/components/ServicesBlock.tsx`

**Key features**:
- 3 service cards:
  1. SEO & Digital Marketing
  2. Custom Software Development
  3. AI/LLM Integration Solutions
- Grid layout on desktop
- Carousel on mobile
- Add `'use client'` directive (carousel is interactive)

#### 5.4 AboutUs Component
Copy from: `from_figma/src/components/AboutUs.tsx`
To: `frontend/components/AboutUs.tsx`

**Key features**:
- Two-column layout
- Team image (replace Unsplash URL with placeholder)
- Company description
- 4 achievement stats

**Image replacement**:
Replace Unsplash URL with placeholder:
```tsx
<div className="bg-slate-800 rounded-lg h-[400px] flex items-center justify-center">
  <p className="text-slate-400">Team Photo Placeholder</p>
</div>
```

#### 5.5 WorkProcess Component
Copy from: `from_figma/src/components/WorkProcess.tsx`
To: `frontend/components/WorkProcess.tsx`

**Key features**:
- 4-step process:
  1. Discovery
  2. Planning
  3. Development
  4. Launch
- Grid layout on desktop
- Accordion on mobile
- Add `'use client'` directive (accordion is interactive)

#### 5.6 ClientsGallery Component
Copy from: `from_figma/src/components/ClientsGallery.tsx`
To: `frontend/components/ClientsGallery.tsx`

**Key features**:
- 8 client logo placeholders
- Grid layout (4 columns desktop, 2 mobile)
- Replace any images with simple placeholder divs

#### 5.7 Footer Component
Copy from: `from_figma/src/components/Footer.tsx`
To: `frontend/components/Footer.tsx`

**Key features**:
- Multi-column layout
- Company info & description
- Quick Links (About, Services, Cases, Contact)
- Services list
- Contact information
- Social media links
- Copyright notice

### Phase 6: Update Homepage

#### 6.1 Replace app/page.tsx
Replace `frontend/app/page.tsx`:

```tsx
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ServicesBlock from '@/components/ServicesBlock'
import AboutUs from '@/components/AboutUs'
import WorkProcess from '@/components/WorkProcess'
import ClientsGallery from '@/components/ClientsGallery'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <AboutUs />
        <WorkProcess />
        <ClientsGallery />
      </main>
      <Footer />
    </div>
  )
}
```

#### 6.2 Update app/layout.tsx
Update metadata:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebStudio - Professional Web Development Studio",
  description: "Modern web development studio specializing in custom software, SEO, and AI/LLM integration solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Inter]">{children}</body>
    </html>
  );
}
```

### Phase 7: Testing & Verification

#### 7.1 Development Server
```bash
# Start the development server
make up
# or
docker compose up

# Access at http://localhost:8080
```

#### 7.2 Checklist
- [ ] All dependencies installed successfully
- [ ] No TypeScript errors
- [ ] Tailwind classes apply correctly
- [ ] Dark theme renders properly (slate-950 background)
- [ ] Gradient effects work (blue-purple gradients)
- [ ] Mobile menu opens/closes (Sheet component)
- [ ] Mobile carousel works (Services section)
- [ ] Mobile accordion works (Work Process section)
- [ ] All sections render in correct order
- [ ] Responsive breakpoints work
- [ ] Hover effects animate properly
- [ ] All icons display correctly (lucide-react)
- [ ] No console errors

#### 7.3 Build Test
```bash
docker compose exec frontend npm run build
```

Should complete without errors.

## File Structure After Migration

```
frontend/
├── app/
│   ├── page.tsx                    # ✅ UPDATED: Full landing page
│   ├── layout.tsx                  # ✅ UPDATED: Metadata
│   └── globals.css                 # ✅ UPDATED: Design tokens
├── components/
│   ├── Header.tsx                  # ✅ NEW
│   ├── HeroSection.tsx            # ✅ NEW
│   ├── ServicesBlock.tsx          # ✅ NEW
│   ├── AboutUs.tsx                # ✅ NEW
│   ├── WorkProcess.tsx            # ✅ NEW
│   ├── ClientsGallery.tsx         # ✅ NEW
│   ├── Footer.tsx                 # ✅ NEW
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # ✅ NEW
│   └── ui/                        # ✅ NEW: 51 components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── sheet.tsx
│       └── ... (46 more)
├── lib/
│   └── utils.ts                   # ✅ NEW: Utility functions
├── package.json                   # ✅ UPDATED: +40 dependencies
└── tailwind.config.js             # ✅ UPDATED: Custom theme
```

## Key Implementation Notes

### Next.js Specific Adaptations

1. **'use client' Directives**
   Add to components with interactivity:
   - Header.tsx (mobile menu state)
   - ServicesBlock.tsx (carousel)
   - WorkProcess.tsx (accordion)

2. **Import Path Aliases**
   Use `@/` prefix:
   ```tsx
   import { Button } from '@/components/ui/button'
   import { cn } from '@/lib/utils'
   ```

3. **Image Placeholders**
   Replace all Unsplash URLs:
   ```tsx
   // Old (from_figma)
   <img src="https://images.unsplash.com/..." alt="Team" />

   // New (frontend)
   <div className="bg-slate-800 rounded-lg h-[400px] flex items-center justify-center">
     <p className="text-slate-400">Image Placeholder</p>
   </div>
   ```

4. **Navigation Links**
   Convert hash anchors to smooth scroll:
   ```tsx
   // Keep simple hash links for now
   <a href="#services">Services</a>

   // Or use smooth scroll behavior in globals.css
   html {
     scroll-behavior: smooth;
   }
   ```

### Design System

**Color Scheme**:
- Background: `bg-slate-950` (very dark)
- Text: `text-white`, `text-slate-300`, `text-slate-400`
- Accents: `bg-gradient-to-r from-blue-400 to-purple-600`
- Borders: `border-white/10`, `border-white/20`

**Typography**:
- Font: Inter (loaded from Google Fonts)
- Headings: `text-4xl`, `text-5xl`, `text-6xl` with `font-bold`
- Body: `text-base`, `text-lg`

**Spacing**:
- Sections: `py-20`, `py-24`
- Containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Effects**:
- Glassmorphism: `backdrop-blur-sm`, `bg-white/5`
- Hover: `hover:scale-105`, `hover:translate-x-1`, `transition-all duration-300`
- Gradients: `bg-gradient-to-r from-blue-400 to-purple-600`

## Troubleshooting

### Common Issues

**Issue**: Radix UI components not styled
- **Solution**: Ensure `globals.css` has CSS variables defined

**Issue**: Carousel not working
- **Solution**: Check `'use client'` directive in ServicesBlock.tsx

**Issue**: Mobile menu not opening
- **Solution**: Check `'use client'` directive in Header.tsx

**Issue**: Tailwind classes not applying
- **Solution**: Verify `tailwind.config.js` content paths include all component directories

**Issue**: Icons not displaying
- **Solution**: Ensure `lucide-react` is installed

**Issue**: Build fails with type errors
- **Solution**: Check all component imports use correct paths with `@/` alias

## Completion Criteria

✅ All 40+ dependencies installed
✅ All 51 shadcn/ui components copied
✅ All 7 main components created
✅ Homepage replaced with new design
✅ Development server runs without errors
✅ Build completes successfully
✅ Mobile responsive design works
✅ All interactive features functional
✅ Design matches Figma export

## Estimated Timeline

- **Phase 1-2** (Dependencies & Config): 15-20 minutes
- **Phase 3** (Copy UI components): 10 minutes
- **Phase 4** (Custom components): 5 minutes
- **Phase 5** (Page components): 30-40 minutes
- **Phase 6** (Homepage integration): 10 minutes
- **Phase 7** (Testing): 15-20 minutes

**Total: 1.5-2 hours**
