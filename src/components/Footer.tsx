"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Final CTA Section */}
            <section className="section bg-gradient-to-b from-[#0A0A0B] to-[#141416] relative">
                {/* Static background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto text-center relative z-10"
                >
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Ready to Launch Your{" "}
                        <span className="text-gradient-gold">Dream Store?</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
                        Join hundreds of brand owners who chose APEX to power their online
                        stores. Start building your premium e-commerce experience today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#pricing"
                            className="btn-primary group hover:scale-105 active:scale-95 transition-transform"
                        >
                            Get APEX Now — $99
                            <ArrowRight size={18} />
                        </a>
                        <a
                            href="https://doseeg.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary hover:scale-105 active:scale-95 transition-transform"
                        >
                            View Live Demo
                        </a>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/40 text-sm">
                        {["30-day money-back guarantee", "Free lifetime updates", "Priority support"].map((item) => (
                            <span
                                key={item}
                                className="cursor-default hover:text-[#D4AF37] transition-colors"
                            >
                                ✓ {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Footer Links */}
            <div className="bg-[#141416]">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="inline-block text-2xl font-bold text-gradient-gold font-display mb-4">
                                APEX
                            </div>
                            <p className="text-white/50 max-w-sm mb-6">
                                The premium Shopify theme for brands that demand excellence.
                                Fully customizable, lightning fast, and built for conversions.
                            </p>
                            <div className="flex items-center gap-4">
                                <a
                                    href="mailto:support@apextheme.com"
                                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] transition-colors"
                                >
                                    <Mail size={16} />
                                    <span>support@apextheme.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <ul className="space-y-3">
                                {["Features", "Pricing", "Live Demo", "FAQ"].map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`#${link.toLowerCase().replace(" ", "")}`}
                                            className="text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block"
                                        >
                                            {link}
                                        </a>
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
                                        <a
                                            href="#"
                                            className="text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10">
                        <p className="text-white/40 text-sm">
                            © 2026 APEX Theme. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            {["Privacy Policy", "Terms of Service"].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-white/40 text-sm hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
