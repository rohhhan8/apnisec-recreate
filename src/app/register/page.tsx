"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CyberInput } from "@/components/ui/CyberInput";
import { ArrowLeft, UserPlus, Lock, User, Mail, Zap, Target, Eye, Radar, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: <Target className="w-5 h-5" />, title: "Threat Detection", desc: "AI-powered scanning" },
  { icon: <Eye className="w-5 h-5" />, title: "24/7 Monitoring", desc: "Continuous vigilance" },
  { icon: <Radar className="w-5 h-5" />, title: "Dark Web Intel", desc: "Deep reconnaissance" },
  { icon: <Fingerprint className="w-5 h-5" />, title: "Identity Guard", desc: "Digital protection" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CLIENT"
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                role: formData.role,
                firstName: formData.firstName,
                lastName: formData.lastName
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push("/login");
    } catch (err: any) {
        setError(err.message || "Registration failed");
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4 md:p-8">
      
      {/* Full Glass Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/grad.jpg" 
          fill 
          alt="Background" 
          className="object-cover rotate-180" 
          priority 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 text-white/60 hover:text-white flex items-center gap-2 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Wide Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon/20 via-transparent to-neon/20 rounded-[40px] blur-2xl opacity-50" />
        
        {/* Main Card */}
        <div className="relative rounded-[32px] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl">
          {/* Card Background */}
          <div className="absolute inset-0">
            <Image 
              src="/grad.jpg" 
              fill 
              alt="Card BG" 
              className="object-cover opacity-30" 
            />
          </div>

          {/* Two Column Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row min-h-[650px]">
            
            {/* Left Column: Form */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/30 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-neutral-400 mb-6">Join the elite security force.</p>

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3 h-3" /> First Name
                      </label>
                      <CyberInput 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="John" 
                        className="bg-black/50 border-white/10 focus:border-neon/50 h-12 rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Last Name
                      </label>
                      <CyberInput 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Doe" 
                        className="bg-black/50 border-white/10 focus:border-neon/50 h-12 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email
                    </label>
                    <CyberInput 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="agent@apnisec.com" 
                      required 
                      className="bg-black/50 border-white/10 focus:border-neon/50 h-12 rounded-xl text-sm"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> Password
                    </label>
                    <CyberInput 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      required 
                      className="bg-black/50 border-white/10 focus:border-neon/50 h-12 rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neon/80 uppercase tracking-wider">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50"
                    >
                      <option value="CLIENT">Security Analyst (Client)</option>
                      <option value="ADMIN">System Administrator</option>
                    </select>
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 font-mono text-sm border border-red-500/30 bg-red-500/10 p-3 rounded-xl"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button 
                    type="submit" 
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-neon font-bold tracking-widest py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all h-12 text-sm disabled:opacity-50 mt-4"
                  >
                    {loading ? (
                      <span className="animate-pulse">PROCESSING...</span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        CREATE ACCOUNT
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                  Already have access?{' '}
                  <Link href="/login" className="text-neon hover:text-white transition-colors font-medium">
                    Access Terminal
                  </Link>
                </p>
              </motion.div>
            </div>

            {/* Right Column: Interactive/Visual Area */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-l border-white/10 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon/30 to-neon/5 flex items-center justify-center border border-neon/30 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                    <UserPlus className="w-6 h-6 text-neon" />
                  </div>
                  <span className="text-2xl font-black font-cabinet text-white">ApniSec</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Become a
                  <br />
                  <span className="text-neon">Watcher</span>
                </h2>
                
                <p className="text-neutral-400 mb-10 max-w-md leading-relaxed">
                  Join our elite network of security professionals. Monitor critical assets and prevent breaches before they happen.
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon/30 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-neon/10 text-neon w-fit mb-3 group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                      <p className="text-white font-medium text-sm">{benefit.title}</p>
                      <p className="text-neutral-500 text-xs">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-8">
                  <div>
                    <p className="text-2xl font-black text-neon">100+</p>
                    <p className="text-xs text-neutral-500">Organizations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">99.9%</p>
                    <p className="text-xs text-neutral-500">Uptime</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">24/7</p>
                    <p className="text-xs text-neutral-500">Support</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
