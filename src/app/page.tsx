import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { HeroSection } from "@/components/ui/HeroSection";
import { StickyScroll } from "@/components/ui/StickyScroll";
import { StatsSection } from "@/components/ui/StatsSection";
import { ProcessSection } from "@/components/ui/ProcessSection";
import { MissionSection } from "@/components/ui/MissionSection";
import { Footer } from "@/components/ui/Footer";

import { ReactLenis } from 'lenis/react';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <ReactLenis root>
        <main className="bg-black min-h-screen selection:bg-neon selection:text-black">
          <CustomCursor />
        
        {/* Section 1: Hero - Standalone Full Screen */}
        <HeroSection />

        {/* Section 3: Features - Stacking Cards */}
        <div id="services" className="relative w-full px-2 md:px-6 my-24">
           {/* Content Layer (Stays sticky) */}
           <div className="relative z-10">
              <StickyScroll />
           </div>
        </div>

        {/* Section 4: Numbers/Stats */}
        <StatsSection />
        
        {/* Section 5: Process */}
        <ProcessSection />

        {/* Section 6: Mission */}
        <MissionSection />

        {/* Footer */}
        <Footer />
      </main>
    </ReactLenis>
    </>
  );
}
