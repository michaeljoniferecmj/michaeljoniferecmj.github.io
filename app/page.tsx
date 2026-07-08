import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
