import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { AiStack } from "@/components/sections/ai-stack";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Services />
      <AiStack />
      <Skills />
      {/* social proof sits immediately before the CTA */}
      <Testimonials />
      <Contact />
    </>
  );
}
