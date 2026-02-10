"use client";

import { motion } from "framer-motion";
import {
    Search,
    ShoppingCart,
    Heart,
    Menu,
    Smartphone,
    Moon,
    Layers,
    Type,
    Sparkles,
    Lock,
    FlaskConical,
    Package,
} from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "Enter Page Experience",
        description: "Signature full-screen brand landing page with video/image backgrounds",
    },
    {
        icon: Heart,
        title: "Built-in Wishlist",
        description: "No apps needed - fully integrated wishlist that works for all visitors",
    },
    {
        icon: ShoppingCart,
        title: "Ajax Cart Drawer",
        description: "Seamless add-to-cart experience without page reloads",
    },
    {
        icon: FlaskConical,
        title: "Scent Pyramid",
        description: "Beautiful visualization for fragrance top, heart & base notes",
    },
    {
        icon: Moon,
        title: "Smart Dark Mode",
        description: "Automatic light/dark mode with full color customization",
    },
    {
        icon: Search,
        title: "Smart Search",
        description: "Predictive search with quick links and trending tags",
    },
    {
        icon: Package,
        title: "Bundle Offers",
        description: "Fixed bundles, travel sets, and bundle offer product templates",
    },
    {
        icon: Layers,
        title: "Collection Filters",
        description: "Advanced grid filtering with smooth animations",
    },
    {
        icon: Smartphone,
        title: "Mobile Optimized",
        description: "Separate mobile images and perfect responsive layouts",
    },
    {
        icon: Menu,
        title: "Full Header Control",
        description: "Dual logos for light/dark modes, quick links, social icons",
    },
    {
        icon: Type,
        title: "Custom Google Fonts",
        description: "Use any Google Font with easy typography controls",
    },
    {
        icon: Sparkles,
        title: "Premium Animations",
        description: "Smooth micro-animations and transitions throughout",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 14,
        },
    },
};

export default function Features() {
    return (
        <section id="features" className="section bg-[#0A0A0B] relative overflow-hidden">
            {/* Static background glow — no JS animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] opacity-[0.12]" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
                        Premium Features
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Everything You Need to{" "}
                        <span className="text-gradient-gold">Succeed</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        APEX comes with powerful built-in features designed for luxury brands.
                        No apps needed – everything is included.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="group glass-card p-6 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
