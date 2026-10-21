import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Navbar } from "@/components/navbar";
import { AmbientBackground } from "@/components/parallax/ambient-background";
import { Spotlight } from "@/components/parallax/spotlight";
import { Project } from "@/components/project";
import { Skills } from "@/components/skills";
import { profile } from "@/data/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github],
};

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Spotlight />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Project />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
