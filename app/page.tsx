import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { SectionFocus } from '@/components/SectionFocus';

export default function HomePage() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-chip focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-chip-ink"
      >
        Skip to content
      </a>
      {/* Moves focus — not just the viewport — on every fragment navigation. */}
      <SectionFocus />
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
