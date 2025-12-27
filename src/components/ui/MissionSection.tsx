"use client";
import React from "react";
import Image from "next/image";
import { ShieldCheck, Database, Scale, Banknote } from "lucide-react";
import TextAnimation from "./TextAnimation";

export const MissionSection = () => {
    return (
        <section className="relative w-full bg-black py-24 px-4 md:px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col gap-24">
                
                {/* Top Row: Mission & Why Choose Us */}
                <div className="flex flex-col md:flex-row gap-16">
                    
                    {/* Mission */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <TextAnimation 
                            text="Our Mission" 
                            as="h2"
                            className="text-4xl font-bold text-white"
                        />
                        <p className="text-xl text-neutral-300 max-w-md">
                            To make Digital Space A safer Place to be
                        </p>
                        <ul className="space-y-4 text-neutral-400">
                            {[
                                "Persistent surveillance",
                                "Brand reputation Security",
                                "InHouse security Team",
                                "Proactive instead of Reactive"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-neon" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Why Choose Us */}
                    <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
                        <TextAnimation 
                            text="Why Choose Us" 
                            as="h2"
                            direction="right"
                            className="text-3xl md:text-4xl font-bold text-white text-left md:text-left"
                        />
                        <div className="grid grid-cols-2 gap-6 md:gap-10">
                             <Feature icon={<Database className="w-6 md:w-8 h-6 md:h-8 text-neon" />} title="Data Loss Prevented" />
                             <Feature icon={<ShieldCheck className="w-6 md:w-8 h-6 md:h-8 text-neon" />} title="Third Party Monitoring" />
                             <Feature icon={<Scale className="w-6 md:w-8 h-6 md:h-8 text-neon" />} title="Compliance Related" />
                             <Feature icon={<Banknote className="w-6 md:w-8 h-6 md:h-8 text-neon" />} title="Financial Loss Prevented" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Expert Team */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-white/5">
                    <div className="text-left">
                        <TextAnimation 
                            text="Our Expert Team of Hackers" 
                            as="h2"
                            direction="left"
                            className="text-3xl md:text-5xl font-bold text-white leading-tight"
                        />
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center md:justify-end">
                        {/* Certification Badges - Using Placeholders/Text if images missing 
                            I'll try to use text-based badges that look like the ones in the image 
                        */}
                        <Badge label="CISSP" sub="ISC2" />
                        <Badge label="CEH" sub="EC-Council" color="bg-red-900 border-red-500 text-red-100" />
                        <Badge label="OSCP" sub="Offensive Security" color="bg-orange-900 border-orange-500 text-orange-100" />
                    </div>
                </div>

            </div>
        </section>
    );
};

const Feature = ({ icon, title }: { icon: React.ReactNode, title: React.ReactNode }) => (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
        {icon}
        <span className="font-medium text-white">{title}</span>
    </div>
);

const Badge = ({ label, sub, color = "bg-white text-black" }: { label: string, sub: string, color?: string }) => (
    <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl font-bold border-2 ${color === "bg-white text-black" ? "bg-white border-white text-black" : color}`}>
        <span className="text-xs opacity-70 mb-1">{sub}</span>
        <span className="text-2xl">{label}</span>
    </div>
);
