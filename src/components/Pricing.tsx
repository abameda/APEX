"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
    "Enter Page Experience",
    "Built-in Wishlist (No Apps)",
    "Scent Pyramid Visualization",
    "Smart Dark/Light Mode",
    "Bundle Offer Templates",
    "Ajax Cart Drawer",
    "Smart Search with Tags",
    "Collection Filters",
    "Custom Google Fonts",
    "Mobile-Optimized Images",
    "Free Lifetime Updates",
    "Priority Support",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100 }
    },
};

export default function Pricing() {
    return (
        <section id="pricing" className="section bg-gradient-to-b from-[#0A0A0B] to-[#141416] relative overflow-hidden">
            {/* Animated background glow */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[150px]"
            />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4"
                    >
                        Simple Pricing
                    </motion.span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        One Theme,{" "}
                        <span className="text-gradient-gold">Unlimited Potential</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Get lifetime access to APEX with all features included. No
                        subscriptions, no hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 60, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="max-w-xl mx-auto"
                >
                    <div className="glass-card-gold p-8 md:p-10 relative overflow-hidden">
                        {/* Sparkle decoration */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl"
                        />

                        <div className="relative">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute -top-2 -right-2 flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-[#0A0A0B] text-xs font-bold rounded-full"
                            >
                                <Sparkles size={12} />
                                BEST VALUE
                            </motion.div>

                            <h3 className="text-2xl font-bold text-white mb-2">APEX Theme</h3>
                            <p className="text-white/60 mb-6">
                                Complete Shopify theme for luxury & fragrance brands
                            </p>

                            {/* Price */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="mb-8"
                            >
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl md:text-6xl font-bold text-white">$99</span>
                                    <span className="text-white/50">USD</span>
                                </div>
                                <p className="text-sm text-[#D4AF37] mt-2">
                                    or 10,000 EGP for Egypt 🇪🇬
                                </p>
                            </motion.div>

                            {/* Features List */}
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-3 mb-8"
                            >
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={feature}
                                        variants={itemVariants}
                                        className="flex items-center gap-3 text-white/80"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + index * 0.05, type: "spring" }}
                                        >
                                            <Check size={18} className="text-[#D4AF37] flex-shrink-0" />
                                        </motion.div>
                                        <span className="text-sm">{feature}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* CTA Button */}
                            <Link href="/checkout">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full justify-center text-lg py-4 group cursor-pointer"
                                >
                                    Get APEX Now
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight size={20} />
                                    </motion.span>
                                </motion.div>
                            </Link>

                            <p className="text-center text-white/40 text-sm mt-4">
                                30-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
