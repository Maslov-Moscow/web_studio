import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ServicesBlock } from '@/components/ServicesBlock'
import { AboutUs } from '@/components/AboutUs'
import { WorkProcess } from '@/components/WorkProcess'
import { ClientsGallery } from '@/components/ClientsGallery'
import { Footer } from '@/components/Footer'

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
