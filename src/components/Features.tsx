"use client";

import { motion } from "framer-motion";
import {
    Palette,
    Zap,
    Search,
    ShoppingCart,
    Heart,
    Menu,
    Smartphone,
    Moon,
    Globe,
    Layers,
    Image,
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
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function Features() {
    return (
        <section id="features" className="section bg-[#0A0A0B] relative overflow-hidden">
            {/* Animated background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[200px]"
            />

            {/* Floating particles */}
            <motion.div
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-2 h-2 bg-[#D4AF37]/30 rounded-full"
            />
            <motion.div
                animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 right-32 w-3 h-3 bg-[#D4AF37]/20 rounded-full"
            />
            <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white/20 rounded-full"
            />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
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
                        Premium Features
                    </motion.span>
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
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 400, damping: 17 }
                            }}
                            className="group glass-card p-6 cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                                className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors"
                            >
                                <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                            </motion.div>
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
