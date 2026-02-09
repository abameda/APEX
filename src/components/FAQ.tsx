"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What's included in the APEX theme?",
        answer:
            "APEX includes 50+ premium features including Ajax cart drawer, wishlist system, mega menu, color swatches, smart search, collection filters, and much more. You also get free lifetime updates and priority support.",
    },
    {
        question: "Is APEX compatible with all Shopify plans?",
        answer:
            "Yes! APEX works with all Shopify plans including Basic, Shopify, Advanced, and Plus. No additional apps or plugins required.",
    },
    {
        question: "Do I need coding knowledge to use APEX?",
        answer:
            "Not at all! APEX is designed for everyone. All customizations can be done through Shopify's visual theme editor. No coding required.",
    },
    {
        question: "What about updates and support?",
        answer:
            "You get free lifetime updates for all new features and improvements. Our priority support team is available via email to help you with any questions.",
    },
    {
        question: "Can I use APEX on multiple stores?",
        answer:
            "Each license is valid for one store. If you have multiple stores, you'll need to purchase additional licenses. We offer volume discounts for multiple purchases.",
    },
    {
        question: "Is there a money-back guarantee?",
        answer:
            "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with APEX for any reason, we'll refund your purchase - no questions asked.",
    },
    {
        question: "How do I install APEX?",
        answer:
            "After purchase, you'll receive the theme files and detailed installation instructions. Installation takes just a few minutes through the Shopify admin.",
    },
    {
        question: "Can I migrate from my current theme?",
        answer:
            "Absolutely! APEX is designed to make migration smooth. Your products, collections, and content will work seamlessly. We also provide migration guides.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="section bg-[#0A0A0B] relative overflow-hidden">
            {/* Background decoration */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] border border-[#D4AF37]/5 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 right-0 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"
            />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4"
                    >
                        FAQ
                    </motion.span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Common{" "}
                        <span className="text-gradient-gold">Questions</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Everything you need to know about APEX
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="mb-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all duration-300 ${openIndex === index
                                        ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20"
                                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                <span
                                    className={`font-medium transition-colors ${openIndex === index ? "text-[#D4AF37]" : "text-white"
                                        }`}
                                >
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 transition-colors ${openIndex === index ? "text-[#D4AF37]" : "text-white/50"
                                            }`}
                                    />
                                </motion.div>
                            </motion.button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <motion.p
                                            initial={{ y: -10 }}
                                            animate={{ y: 0 }}
                                            className="p-5 text-white/60 leading-relaxed"
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/50 mb-4">Still have questions?</p>
                    <motion.a
                        href="mailto:support@apextheme.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E8C547] transition-colors font-medium"
                    >
                        Contact our team →
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
