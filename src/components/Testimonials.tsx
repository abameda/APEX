"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah M.",
        role: "Fashion Brand Owner",
        image: "👩‍💼",
        content:
            "APEX transformed our online store completely. Sales increased by 40% in the first month. The design is stunning and our customers love it!",
        rating: 5,
    },
    {
        name: "Ahmed K.",
        role: "Luxury Perfumes",
        image: "👨‍💼",
        content:
            "Best investment for our brand. The theme is fast, beautiful, and the support team is incredibly helpful. Highly recommended!",
        rating: 5,
    },
    {
        name: "Maria L.",
        role: "Jewelry Store",
        image: "👩‍🎨",
        content:
            "The attention to detail is incredible. Every feature works flawlessly. Our conversion rate doubled after switching to APEX.",
        rating: 5,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -10 },
    visible: {
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 12,
        }
    },
};

export default function Testimonials() {
    return (
        <section className="section bg-[#141416] relative overflow-hidden">
            {/* Floating decorations */}
            <motion.div
                animate={{ y: [-30, 30, -30], rotate: [0, 180, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 left-10 w-20 h-20 border border-[#D4AF37]/10 rounded-full"
            />
            <motion.div
                animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 right-20 w-32 h-32 border border-white/5 rounded-full"
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
                        Customer Stories
                    </motion.span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Loved by{" "}
                        <span className="text-gradient-gold">Brand Owners</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        See what our customers say about their experience with APEX
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            className="glass-card p-6 relative group"
                        >
                            {/* Quote icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors"
                            >
                                <Quote size={16} className="text-[#D4AF37]" />
                            </motion.div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                                    >
                                        <Star
                                            size={16}
                                            className="fill-[#D4AF37] text-[#D4AF37]"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    className="text-3xl"
                                >
                                    {testimonial.image}
                                </motion.div>
                                <div>
                                    <div className="font-semibold text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-white/50">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social proof */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-white/40 text-sm"
                    >
                        ⭐ Join 500+ happy store owners using APEX
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
