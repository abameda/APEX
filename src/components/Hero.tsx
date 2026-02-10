"use client";

import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects - CSS only, no JS animation */}
            <div className="absolute inset-0 bg-[#0A0A0B]">
                {/* Gradient orbs - reduced blur for perf */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[60px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />
            </div>

            {/* Content - CSS animations instead of framer-motion */}
            <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="hero-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-sm text-white/70">
                        Premium Shopify Theme for Luxury & Fragrance Brands
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="hero-fade-in hero-delay-1 font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl mx-auto leading-tight"
                >
                    The Shopify Theme for{" "}
                    <span className="text-gradient-gold">Luxury Brands</span>
                </h1>

                {/* Subheadline */}
                <p
                    className="hero-fade-in hero-delay-2 text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
                >
                    Built-in wishlist. Scent pyramid. Enter page experience.
                    <br />
                    Everything luxury fragrance brands need. No apps required.
                </p>

                {/* CTAs */}
                <div className="hero-fade-in hero-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#pricing" className="btn-primary group">
                        Get APEX Now
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </a>
                    <a
                        href="https://doseeg.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group"
                    >
                        <Play size={18} />
                        View Live Demo
                    </a>
                </div>

                {/* Stats */}
                <div className="hero-fade-in hero-delay-4 mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                        <div className="text-sm text-white/50">Features</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                        <div className="text-sm text-white/50">Customizable</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">SEO</div>
                        <div className="text-sm text-white/50">Optimized</div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator - CSS animation */}
            <div className="hero-fade-in hero-delay-5 absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-white/40">Scroll to explore</span>
                    <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] scroll-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
