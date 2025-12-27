"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import TextAnimation from "./TextAnimation";
import CountUp from "./CountUp";

const STATS = [
    { label: "Lines Of Code Reviewed", value: "849M+" },
    { label: "Records Scraped", value: "3Bn+" },
    { label: "Assets Monitored", value: "15K+" },
    { label: "Data Analysed", value: "200TB+" },
    { label: "Threat Mitigation", value: "99.99%" },
];

export const StatsSection = () => {
    return (
        <section className="min-h-screen w-auto mx-2 md:mx-4 relative rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 bg-black mb-24">
             {/* Background Gradient */}
             <div className="absolute inset-0">
                <Image 
                    src="/grad.jpg" 
                    fill 
                    alt="Background" 
                    className="object-cover opacity-100" 
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Mobile: Column (Image on top) | Desktop: Row (Side by side) */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 p-5 md:p-20">
                
                {/* Mobile: Dashboard Image on top */}
                <div className="w-full md:hidden relative">
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black/50">
                         <Image 
                            src="/visco.png" 
                            fill 
                            alt="Dashboard Preview" 
                            className="object-cover" 
                         />
                    </div>
                </div>

                {/* Text & Stats */}
                <div className="w-full md:w-1/2 space-y-6 md:space-y-12">
                    <div>
                         <TextAnimation 
                             text="Numbers Don't Lie." 
                             as="h2"
                             className="text-2xl md:text-7xl font-black text-white leading-tight"
                         />
                         <TextAnimation 
                             text="Data Speaks."
                             as="span" 
                             direction="left"
                             className="text-2xl md:text-7xl font-black text-neon leading-tight"
                         />
                         <p className="mt-3 md:mt-4 text-sm md:text-xl text-white max-w-lg">
                            Make informed decisions with our All-in-One Cyber Defence Platform.
                         </p>
                    </div>

                    {/* Stats Grid - better mobile layout */}
                    <div className="grid grid-cols-2 gap-4 md:gap-x-8 md:gap-y-12">
                        {STATS.map((stat, idx) => (
                            <div 
                                key={idx} 
                                className="flex flex-col p-3 md:p-0 rounded-xl md:rounded-none bg-black/30 md:bg-transparent border border-white/10 md:border-0"
                            >
                                <CountUp 
                                    end={stat.value}
                                    className="text-xl sm:text-3xl md:text-5xl font-black text-white font-cabinet"
                                />
                                <span className="text-[10px] md:text-base text-white font-bold uppercase tracking-wider mt-1">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Link */}
                    <Link 
                        href="#process" 
                        className="inline-flex items-center gap-2 text-neon font-bold text-sm hover:underline transition-all"
                    >
                        How We Do It
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Desktop: Dashboard Image on right */}
                <div className="hidden md:block w-full md:w-1/2 relative">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/50 backdrop-blur-sm group">
                         <Image 
                            src="/visco.png" 
                            fill 
                            alt="Dashboard Preview" 
                            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                         />
                         <div className="absolute inset-0 flex items-center justify-center">
                             <span className="bg-black/80 px-4 py-2 rounded text-xs font-mono text-neon border border-neon/20">
                                 DASHBOARD PREVIEW
                             </span>
                         </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
