"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CyberInput } from "@/components/ui/CyberInput";
import { ArrowLeft, ShieldCheck, Lock, Zap, Shield, CheckCircle, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
  { icon: <CheckCircle className="w-5 h-5" />, text: "Real-time threat monitoring" },
  { icon: <Users className="w-5 h-5" />, text: "Expert security team" },
  { icon: <Globe className="w-5 h-5" />, text: "24/7 global coverage" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        router.push("/dashboard");
    } catch (err: any) {
        setError(err.message || "Connection failed");
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
          className="object-cover" 
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
              className="object-cover rotate-180 opacity-30" 
            />
          </div>

          {/* Two Column Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Column: Interactive/Visual Area */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon/30 to-neon/5 flex items-center justify-center border border-neon/30 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                    <ShieldCheck className="w-6 h-6 text-neon" />
                  </div>
                  <span className="text-2xl font-black font-cabinet text-white">ApniSec</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Join The Elite
                  <br />
                  <span className="text-neon">Security Force</span>
                </h2>
                
                <p className="text-neutral-400 mb-10 max-w-md leading-relaxed">
                  Access real-time threat monitoring, vulnerability assessments, and mission-critical security operations in one unified platform.
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 text-neutral-300"
                    >
                      <div className="p-2 rounded-lg bg-neon/10 text-neon">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs font-mono text-neutral-500 mb-3">TRUSTED BY</p>
                  <div className="flex items-center gap-6">
                    {['Amazon', 'Microsoft', 'Google'].map((brand) => (
                      <span key={brand} className="text-lg font-bold text-white/30">{brand}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/30">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-neutral-400 mb-8">Enter your credentials to access the console.</p>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Email
                    </label>
                    <CyberInput 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="agent@apnisec.com" 
                      required 
                      className="bg-black/50 border-white/10 focus:border-neon/50 h-14 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon/80 uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Password
                    </label>
                    <CyberInput 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      required 
                      className="bg-black/50 border-white/10 focus:border-neon/50 h-14 rounded-xl"
                    />
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
                    className="w-full flex items-center justify-center gap-3 bg-neon text-black hover:bg-white font-bold tracking-widest py-4 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all h-14 text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">AUTHENTICATING...</span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        INITIATE SESSION
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="mt-8 text-center text-sm text-neutral-500">
                  Don't have access?{' '}
                  <Link href="/register" className="text-neon hover:text-white transition-colors font-medium">
                    Request Clearance
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
