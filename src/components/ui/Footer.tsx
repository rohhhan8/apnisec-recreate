"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10 px-4 md:px-10 font-satoshi">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    
                    {/* Brand & Certs */}
                    <div className="flex flex-col gap-8 max-w-sm">
                        <div>
                             <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                                <span className="text-neon text-4xl">.</span> apni sec
                             </h2>
                             <p className="text-neutral-500 text-sm tracking-widest pl-5">SECURITY as a SERVICE</p>
                        </div>
                        
                        <div>
                            <p className="text-xs text-neutral-400 mb-4 tracking-widest">WE ARE CERTIFIED</p>
                            <div className="flex flex-wrap gap-4 items-center opacity-80">
                                {/* Text Stand-ins for Logos */}
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-center text-white">AICPA<br/>SOC 2</div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-center text-white">ISO<br/>27001</div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-center text-white">GDPR<br/>EU</div>
                                <div className="h-8 border-l border-white/20 pl-4 flex flex-col justify-center">
                                    <span className="font-bold text-white leading-none">DPIIT</span>
                                    <span className="text-[10px] text-orange-500">#startupindia</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16 md:gap-32">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-white text-lg">Company</h3>
                            <FooterLink href="#">Home</FooterLink>
                            <FooterLink href="#">Solutions</FooterLink>
                            <FooterLink href="#">Process</FooterLink>
                            <FooterLink href="#">Report</FooterLink>
                            <FooterLink href="#">Services</FooterLink>
                            <FooterLink href="#" badge="Active">Careers</FooterLink>
                            <FooterLink href="#" badge="Active">Bug Bounty</FooterLink>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-white text-lg">Services</h3>
                            <FooterLink href="#">Dark Eye Watcher</FooterLink>
                            <FooterLink href="#">Cloud Security</FooterLink>
                            <FooterLink href="#">Virtual CISO</FooterLink>
                            <FooterLink href="#">Red Team Assessment</FooterLink>
                            <FooterLink href="#">VAPT</FooterLink>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
                        <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                        <SocialIcon icon={<Youtube className="w-5 h-5" />} />
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 border-t border-white/5 pt-8 gap-4">
                    <p>&copy; 2025 Apni Sec. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms And Conditions</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

const FooterLink = ({ href, children, badge }: { href: string, children: React.ReactNode, badge?: string }) => (
    <Link href={href} className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2">
        {children}
        {badge && <span className="bg-neon/10 text-neon px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">{badge}</span>}
    </Link>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <Link href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 hover:text-neon text-white rounded-full flex items-center justify-center transition-all">
        {icon}
    </Link>
);
