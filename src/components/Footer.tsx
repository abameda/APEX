"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Final CTA Section */}
            <section className="section bg-gradient-to-b from-[#0A0A0B] to-[#141416] relative">
                {/* Animated background glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="container mx-auto text-center relative z-10"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        Ready to Launch Your{" "}
                        <span className="text-gradient-gold">Dream Store?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/60 max-w-2xl mx-auto mb-10"
                    >
                        Join hundreds of brand owners who chose APEX to power their online
                        stores. Start building your premium e-commerce experience today.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#pricing"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary group"
                        >
                            Get APEX Now — $99
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight size={18} />
                            </motion.span>
                        </motion.a>
                        <motion.a
                            href="https://apexeg.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary"
                        >
                            View Live Demo
                        </motion.a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/40 text-sm"
                    >
                        {["30-day money-back guarantee", "Free lifetime updates", "Priority support"].map((item, i) => (
                            <motion.span
                                key={item}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                whileHover={{ color: "#D4AF37" }}
                                className="cursor-default transition-colors"
                            >
                                ✓ {item}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Footer Links */}
            <div className="bg-[#141416]">
                <div className="container mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    >
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-block text-2xl font-bold text-gradient-gold font-display mb-4"
                            >
                                APEX
                            </motion.div>
                            <p className="text-white/50 max-w-sm mb-6">
                                The premium Shopify theme for brands that demand excellence.
                                Fully customizable, lightning fast, and built for conversions.
                            </p>
                            <div className="flex items-center gap-4">
                                <motion.a
                                    href="mailto:support@apextheme.com"
                                    whileHover={{ scale: 1.05, color: "#D4AF37" }}
                                    className="flex items-center gap-2 text-sm text-white/60 transition-colors"
                                >
                                    <Mail size={16} />
                                    <span>support@apextheme.com</span>
                                </motion.a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <ul className="space-y-3">
                                {["Features", "Pricing", "Live Demo", "FAQ"].map((link) => (
                                    <li key={link}>
                                        <motion.a
                                            href={`#${link.toLowerCase().replace(" ", "")}`}
                                            whileHover={{ x: 5, color: "#ffffff" }}
                                            className="text-white/50 transition-all inline-block"
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-3">
                                {["Contact Us", "Documentation", "Video Guides"].map((link) => (
                                    <li key={link}>
                                        <motion.a
                                            href="#"
                                            whileHover={{ x: 5, color: "#ffffff" }}
                                            className="text-white/50 transition-all inline-block"
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bottom bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10"
                    >
                        <p className="text-white/40 text-sm">
                            © 2026 APEX Theme. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            {["Privacy Policy", "Terms of Service"].map((link) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    whileHover={{ color: "#ffffff" }}
                                    className="text-white/40 text-sm transition-colors"
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
