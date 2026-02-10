"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Demo() {
    return (
        <section id="demo" className="section bg-[#141416] relative overflow-hidden">
            {/* Static background circles — no infinite rotation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#D4AF37]/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
                        Live Demo
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        See APEX in{" "}
                        <span className="text-gradient-gold">Action</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Experience the power and elegance of APEX on a real store. Explore
                        every feature in action.
                    </p>
                </motion.div>

                {/* Browser Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <a
                        href="https://doseeg.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block glass-card-gold p-2 md:p-3 rounded-xl md:rounded-2xl group cursor-pointer hover:-translate-y-1 hover:scale-[1.005] transition-transform duration-300"
                    >
                        {/* Browser header */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 mb-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-xs text-white/50 bg-white/5 px-4 py-1 rounded-full group-hover:bg-white/10 group-hover:text-white/70 transition-all flex items-center gap-2">
                                    doseeg.com
                                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </span>
                            </div>
                        </div>

                        {/* Demo content placeholder */}
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1a1c] to-[#0d0d0f]">
                            {/* Grid pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px'
                                }}
                            />

                            {/* Central content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-7xl mb-6">🛍️</div>
                                    <p className="text-white/70 text-lg font-medium mb-2">
                                        APEX - Luxury Perfumes
                                    </p>
                                    <p className="text-[#D4AF37] text-sm">Click to explore the live store</p>
                                </div>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-300">
                                <span className="px-8 py-4 bg-white text-[#0A0A0B] rounded-full font-semibold shadow-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    View Live Demo
                                    <ExternalLink size={16} />
                                </span>
                            </div>
                        </div>
                    </a>

                    {/* Static glow effect */}
                    <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-2xl -z-10 opacity-15" />
                </motion.div>

                {/* Features highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 mt-10 text-sm text-white/50"
                >
                    {["Ajax Cart", "Wishlist", "Mega Menu", "Quick View", "Filters"].map((feature) => (
                        <span
                            key={feature}
                            className="px-3 py-1 rounded-full bg-white/5 hover:scale-105 hover:text-[#D4AF37] transition-all duration-200 cursor-default"
                        >
                            {feature}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
