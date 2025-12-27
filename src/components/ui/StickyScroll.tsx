"use client";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Eye, Lock, Briefcase, Cloud, ShieldCheck, CheckCircle } from "lucide-react";
import TextAnimation from "./TextAnimation";

const projects = [
  {
    title: "Dark Eye Watcher",
    features: [
      "Monitor The Dark Web For Compromised Data",
      "Tracking Data Breaches 24x7",
      "Threat Intelligence Platform",
      "Data Loss Prevention (DLP)",
    ],
    src: "/darkeyewatcher.png",
    link: "#",
    color: "#0a0a0a",
    icon: <Eye className="w-8 h-8 text-neon" />,
  },
  {
    title: "Red Team Assessment",
    features: [
      "Social Engineering Simulation",
      "Assess System Vulnerabilities",
      "Network & Firewall Audits",
      "Cloud Attack Emulation",
    ],
    src: "/redteam.png",
    link: "#",
    color: "#0f0f0f",
    icon: <Lock className="w-8 h-8 text-neon" />,
  },
  {
    title: "Virtual CISO",
    features: [
      "Continuous Vulnerability Scanning",
      "DevSecOps Implementation",
      "Zero Trust Security Model",
      "Threat Modelling & Risk Plans",
    ],
    src: "/visco.png",
    link: "#",
    color: "#0a0a0a",
    icon: <Briefcase className="w-8 h-8 text-neon" />,
  },
  {
    title: "Cloud Watcher",
    features: [
      "Asset Monitoring",
      "Cloud Security Posture Management",
      "Microservices Security",
      "Cloud Attack Emulation",
    ],
    src: "/cloudsecurity.png",
    link: "#",
    color: "#0f0f0f",
    icon: <Cloud className="w-8 h-8 text-neon" />,
  },
  {
    title: "End-to-End VAPT",
    features: [
      "Web, API & Mobile Security",
      "Secure Code Review",
      "Penetration Testing",
      "Network Security Audit",
    ],
    src: "/va.png",
    link: "#",
    color: "#0a0a0a",
    icon: <ShieldCheck className="w-8 h-8 text-neon" />,
  },
];

export const StickyScroll = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative w-full">
      {/* Header */}
      <div className="w-full pt-10 pb-10 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="relative inline-block">
          <TextAnimation 
            text="Services We Provide" 
            as="h2"
            className="text-3xl md:text-7xl font-black text-white tracking-tighter mb-2"
          />
          {/* Doodle Underline */}
          <svg 
            className="w-full h-4 text-neon opacity-80" 
            viewBox="0 0 200 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M2 12 Q 30 2, 60 14 T 120 10 T 180 14 Q 195 8, 198 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed mt-6">
          Seamlessly integrate security into your development lifecycle.
        </p>
      </div>

      {/* Cards */}
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.03;
        return (
          <Card
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

interface CardProps {
  i: number;
  title: string;
  features: string[];
  src: string;
  link: string;
  color: string;
  icon: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  features,
  src,
  link,
  color,
  icon,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[80vh] md:h-screen flex items-start justify-center sticky top-0 pt-20 md:pt-32"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${i * 35}px)`,
        }}
        className="flex flex-col md:flex-row relative min-h-[400px] md:h-[700px] w-full rounded-[20px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-2xl p-5 md:p-12 gap-6 md:gap-10"
      >
        {/* Card Background */}
        <div className="absolute inset-0 z-0">
            <Image 
                src="/grad.jpg" 
                fill 
                alt="Card Background" 
                className="object-cover opacity-100 rotate-180" 
            />
            <div className="absolute inset-0 bg-black/20" /> 
        </div>

        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-between z-10 relative">
             <div>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        {icon}
                    </div>
                    <TextAnimation 
                        text={title}
                        as="h2"
                        direction="left"
                        className="text-2xl md:text-5xl font-black font-cabinet text-white uppercase tracking-tight leading-none"
                    />
                </div>
                {/* Feature List */}
                <motion.div 
                    className="space-y-3 md:space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                >
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx} 
                            className="flex items-start gap-3"
                            variants={{
                                hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
                                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.4 } }
                            }}
                        >
                            <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-neon shrink-0 mt-1" />
                            <p className="text-sm md:text-lg text-neutral-200 font-medium leading-relaxed">
                                {feature}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
             </div>

             {/* Learn More Button - Smaller on mobile */}
             <div className="mt-4 md:mt-auto pt-4 md:pt-8">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 rounded-lg md:rounded-2xl text-xs md:text-sm font-bold tracking-wide md:tracking-widest px-4 md:px-8 py-3 md:py-5 bg-white text-black hover:bg-neon transition-all duration-300 shadow-lg group"
                >
                   LEARN MORE 
                   <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
             </div>
        </div>

        {/* Right Column: Image - Hidden on mobile to reduce clutter */}
        <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center relative z-10">
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/50 backdrop-blur-sm relative">
                <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                    <Image
                        fill
                        src={src}
                        alt={title}
                        className="object-cover opacity-80"
                    />
                </motion.div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
