"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-gradient-gold font-display">
                            APEX
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#features"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#demo"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            Demo
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            Pricing
                        </a>
                        <a
                            href="#faq"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            FAQ
                        </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://apexeg.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all"
                        >
                            View Demo
                        </a>
                        <a
                            href="#pricing"
                            className="px-4 py-2 text-sm bg-[#D4AF37] hover:bg-[#E8C547] text-[#0A0A0B] font-medium rounded-full transition-all"
                        >
                            Get APEX
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0B] border-b border-white/10 py-6 px-6 shadow-2xl">
                        <div className="flex flex-col gap-4">
                            <a
                                href="#features"
                                className="text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Features
                            </a>
                            <a
                                href="#demo"
                                className="text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Demo
                            </a>
                            <a
                                href="#pricing"
                                className="text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Pricing
                            </a>
                            <a
                                href="#faq"
                                className="text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                FAQ
                            </a>
                            <div className="flex flex-col gap-3 pt-4">
                                <a
                                    href="https://apexeg.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm text-center text-white/80 border border-white/20 rounded-full"
                                >
                                    View Demo
                                </a>
                                <a
                                    href="#pricing"
                                    className="px-4 py-2 text-sm text-center bg-[#D4AF37] text-[#0A0A0B] font-medium rounded-full"
                                >
                                    Get APEX
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
