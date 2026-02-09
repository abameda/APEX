"use client";

import { motion } from "framer-motion";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";

export default function Demo() {
    return (
        <section id="demo" className="section bg-[#141416] relative overflow-hidden">
            {/* Animated background */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#D4AF37]/5 rounded-full"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
            />

            {/* Floating elements */}
            <motion.div
                animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-32 right-32"
            >
                <Monitor className="w-8 h-8 text-[#D4AF37]/20" />
            </motion.div>
            <motion.div
                animate={{ y: [15, -15, 15], x: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-32 left-32"
            >
                <Smartphone className="w-6 h-6 text-white/10" />
            </motion.div>
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 left-20"
            >
                <Tablet className="w-7 h-7 text-[#D4AF37]/10" />
            </motion.div>

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4"
                    >
                        Live Demo
                    </motion.span>
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
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <motion.a
                        href="https://apexeg.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01, y: -5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="block glass-card-gold p-2 md:p-3 rounded-xl md:rounded-2xl group cursor-pointer"
                    >
                        {/* Browser header */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 mb-2">
                            <motion.div
                                className="flex gap-1.5"
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
                            </motion.div>
                            <div className="flex-1 flex items-center justify-center">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="text-xs text-white/50 bg-white/5 px-4 py-1 rounded-full group-hover:bg-white/10 group-hover:text-white/70 transition-all flex items-center gap-2"
                                >
                                    apexeg.com
                                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.span>
                            </div>
                        </div>

                        {/* Demo content placeholder */}
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1a1c] to-[#0d0d0f]">
                            {/* Animated grid lines */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.05 }}
                                viewport={{ once: true }}
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px'
                                }}
                            />

                            {/* Central content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="text-center"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="text-7xl mb-6"
                                    >
                                        🛍️
                                    </motion.div>
                                    <motion.p
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="text-white/70 text-lg font-medium mb-2"
                                    >
                                        APEX - Luxury Perfumes
                                    </motion.p>
                                    <p className="text-[#D4AF37] text-sm">Click to explore the live store</p>
                                </motion.div>
                            </div>

                            {/* Hover overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#D4AF37]/10 flex items-center justify-center backdrop-blur-sm transition-all"
                            >
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="px-8 py-4 bg-white text-[#0A0A0B] rounded-full font-semibold shadow-2xl flex items-center gap-2"
                                >
                                    View Live Demo
                                    <ExternalLink size={16} />
                                </motion.span>
                            </motion.div>
                        </div>
                    </motion.a>

                    {/* Glow effect */}
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-3xl -z-10"
                    />
                </motion.div>

                {/* Features highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4 mt-10 text-sm text-white/50"
                >
                    {["Ajax Cart", "Wishlist", "Mega Menu", "Quick View", "Filters"].map((feature, i) => (
                        <motion.span
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.1, color: "#D4AF37" }}
                            className="px-3 py-1 rounded-full bg-white/5 cursor-default transition-colors"
                        >
                            {feature}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
