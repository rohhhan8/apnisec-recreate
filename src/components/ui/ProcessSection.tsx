"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, Crosshair, Users, Shield, FileText, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import TextAnimation from "./TextAnimation";

const STEPS = [
    {
        icon: <Search className="w-8 h-8 text-black" />,
        title: "Identify",
        subtitle: "Critical Assets",
        description: "Primary Customer And Internet Facing Applications",
        colSpan: "md:col-span-2",
        bg: "bg-neon"
    },
    {
        icon: <Crosshair className="w-8 h-8 text-white" />,
        title: "Assess",
        subtitle: "Vulnerabilities",
        description: "Security Testing By Expertise Team Of Certified Hackers",
        colSpan: "md:col-span-1",
        bg: "bg-neutral-900",
        border: "border-white/10"
    },
    {
        icon: <Users className="w-8 h-8 text-white" />,
        title: "Onboard",
        subtitle: "Watcher",
        description: "Asset Monitoring, SCM, Dark Eye Watcher For Overall Monitoring",
        colSpan: "md:col-span-1",
        bg: "bg-neutral-900",
        border: "border-white/10"
    },
    {
        icon: <Shield className="w-8 h-8 text-neon" />,
        title: "vCISO",
        subtitle: "Protection",
        description: "Acting As A Security Team With Regular Threat Modelling And Architecture & Code Reviews",
        colSpan: "md:col-span-2",
        bg: "bg-black border border-white/20",
        hasGradient: true
    },
    {
        icon: <FileText className="w-8 h-8 text-white" />,
        title: "Report",
        subtitle: "Mitigation",
        description: "Regular Reporting, Patching, Re-Testing Patches With PR Reviews & Audit Certificate",
        colSpan: "md:col-span-3",
        bg: "bg-gradient-to-r from-neutral-900 to-black border border-white/10",
        isWide: true
    }
];

export const ProcessSection = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto py-16 md:py-32 px-4">
            {/* Wrapper Card with Gradient Border */}
            <div className="relative rounded-[24px] md:rounded-[48px] p-[2px] bg-gradient-to-br from-neon/50 via-white/10 to-neon/20">
                <div className="relative bg-neutral-950 rounded-[24px] md:rounded-[48px] px-6 md:px-12 py-10 md:py-16 overflow-hidden">
                    {/* Background Gradient Effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon/5 rounded-full blur-[80px]" />
                    
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <TextAnimation 
                                text="Our Process" 
                                as="h2"
                                className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4"
                            />
                            <p className="text-neutral-400 max-w-xl mx-auto">
                                A systematic approach to securing your digital infrastructure.
                            </p>
                        </div>

                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-5%" }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                        >
                            {STEPS.map((step, idx) => (
                                <BentoCard key={idx} step={step} idx={idx} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BentoCard = ({ step, idx }: { step: any, idx: number }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(5px)" },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
    };
    
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className={cn(
                "relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden group cursor-default",
                step.colSpan,
                step.bg,
                step.border
            )}
        >
            {/* Gradient Overlay for specific cards */}
            {step.hasGradient && (
                <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-50" />
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 w-fit border border-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                    </div>
                    <span className={cn("text-5xl font-black opacity-30 select-none", step.bg.includes('bg-neon') ? "text-black" : "text-white")}>
                        0{idx + 1}
                    </span>
                </div>
                
                <h3 className={cn("text-3xl font-bold tracking-tight mb-1", step.bg.includes('bg-neon') ? "text-black" : "text-white")}>
                    {step.title}
                </h3>
                <p className={cn("text-sm font-bold uppercase tracking-widest mb-4", step.bg.includes('bg-neon') ? "text-black/60" : "text-neon")}>
                    {step.subtitle}
                </p>
                <p className={cn("leading-relaxed", step.bg.includes('bg-neon') ? "text-black/80 font-medium" : "text-neutral-400")}>
                    {step.description}
                </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowDown className={cn("w-6 h-6", step.bg.includes('bg-neon') ? "text-black" : "text-white")} />
            </div>
            
            {/* Background Hover Decoration */}
            <div className={cn(
                "absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100",
                step.bg.includes('bg-neon') ? "bg-white/50" : "bg-neon/20"
            )} />
        </motion.div>
    );
};
