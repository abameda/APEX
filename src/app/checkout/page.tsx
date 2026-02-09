"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Upload,
    Phone,
    Mail,
    User,
    Building,
    CheckCircle,
    Loader2,
    Smartphone,
    CreditCard,
    Wallet,
    Copy,
    Check,
} from "lucide-react";
import type { PaymentMethod, PaymentInfo } from "@/types/order";

const paymentMethods: PaymentInfo[] = [
    {
        method: "vodafone_cash",
        label: "Vodafone Cash",
        number: process.env.NEXT_PUBLIC_VODAFONE_CASH_NUMBER || "01XXXXXXXXX",
        icon: "📱",
        color: "#E60000",
        instructions: "Send to Vodafone Cash wallet",
    },
    {
        method: "instapay",
        label: "InstaPay",
        number: process.env.NEXT_PUBLIC_INSTAPAY_NUMBER || "01XXXXXXXXX",
        icon: "🏦",
        color: "#1E3A5F",
        instructions: "Transfer via InstaPay",
    },
    {
        method: "telda",
        label: "Telda",
        number: process.env.NEXT_PUBLIC_TELDA_NUMBER || "01XXXXXXXXX",
        icon: "💳",
        color: "#00D09C",
        instructions: "Send via Telda app",
    },
];

export default function CheckoutPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        businessName: "",
    });
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

    const handleCopyNumber = (number: string) => {
        navigator.clipboard.writeText(number);
        setCopiedNumber(number);
        setTimeout(() => setCopiedNumber(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setScreenshot(file);
            const reader = new FileReader();
            reader.onload = () => setScreenshotPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMethod || !screenshot) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("phone", formData.phone);
            submitData.append("businessName", formData.businessName);
            submitData.append("paymentMethod", selectedMethod);
            submitData.append("screenshot", screenshot);

            const response = await fetch("/api/orders", {
                method: "POST",
                body: submitData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to submit order");
            }

            setIsSuccess(true);
            setStep(3);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPayment = paymentMethods.find((p) => p.method === selectedMethod);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0A0A0B] to-[#141416] py-12 px-4">
            {/* Background glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <motion.div
                                animate={{
                                    scale: step >= s ? 1 : 0.9,
                                    backgroundColor: step >= s ? "#D4AF37" : "rgba(255,255,255,0.1)",
                                }}
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                                style={{ color: step >= s ? "#0A0A0B" : "rgba(255,255,255,0.4)" }}
                            >
                                {step > s ? <Check size={18} /> : s}
                            </motion.div>
                            {s < 3 && (
                                <div
                                    className="w-16 h-0.5"
                                    style={{
                                        backgroundColor: step > s ? "#D4AF37" : "rgba(255,255,255,0.1)",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Select Payment Method */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card-gold p-8"
                        >
                            <h1 className="text-3xl font-bold text-white mb-2">Choose Payment Method</h1>
                            <p className="text-white/60 mb-8">
                                Select how you&apos;d like to pay <span className="text-[#D4AF37] font-bold">10,000 EGP</span> for the APEX Theme
                            </p>

                            <div className="space-y-4">
                                {paymentMethods.map((method) => (
                                    <motion.button
                                        key={method.method}
                                        onClick={() => setSelectedMethod(method.method)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full p-6 rounded-xl border-2 transition-all text-left ${selectedMethod === method.method
                                                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                                : "border-white/10 bg-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{method.icon}</span>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-white">{method.label}</h3>
                                                <p className="text-white/60 text-sm">{method.instructions}</p>
                                            </div>
                                            {selectedMethod === method.method && (
                                                <CheckCircle className="text-[#D4AF37]" size={24} />
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {selectedMethod && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8 p-6 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30"
                                >
                                    <h3 className="text-[#D4AF37] font-bold mb-4">Send Payment To:</h3>
                                    <div className="flex items-center justify-between bg-black/30 rounded-lg p-4">
                                        <span className="text-2xl font-mono text-white">{selectedPayment?.number}</span>
                                        <button
                                            onClick={() => handleCopyNumber(selectedPayment?.number || "")}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            {copiedNumber === selectedPayment?.number ? (
                                                <Check className="text-green-400" size={20} />
                                            ) : (
                                                <Copy className="text-white/60" size={20} />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-white/60 text-sm mt-4">
                                        💡 Send exactly <span className="text-white font-bold">10,000 EGP</span> to this number, then take a screenshot of the successful transaction.
                                    </p>
                                </motion.div>
                            )}

                            <motion.button
                                onClick={() => selectedMethod && setStep(2)}
                                disabled={!selectedMethod}
                                whileHover={{ scale: selectedMethod ? 1.02 : 1 }}
                                whileTap={{ scale: selectedMethod ? 0.98 : 1 }}
                                className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all ${selectedMethod
                                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A0A0B] cursor-pointer"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                    }`}
                            >
                                I&apos;ve Made the Payment →
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Step 2: Upload Screenshot & Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card-gold p-8"
                        >
                            <button
                                onClick={() => setStep(1)}
                                className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Order</h1>
                            <p className="text-white/60 mb-8">
                                Upload your payment screenshot and enter your details
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Screenshot Upload */}
                                <div>
                                    <label className="block text-white/80 mb-2 font-medium">
                                        Payment Screenshot *
                                    </label>
                                    <label
                                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all ${screenshotPreview
                                                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                                : "border-white/20 hover:border-white/40 bg-white/5"
                                            }`}
                                    >
                                        {screenshotPreview ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={screenshotPreview}
                                                    alt="Screenshot preview"
                                                    className="w-full h-full object-contain rounded-lg p-2"
                                                />
                                                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                                                    ✓ Uploaded
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <Upload className="text-white/40 mb-2" size={40} />
                                                <p className="text-white/60">Click to upload screenshot</p>
                                                <p className="text-white/40 text-sm mt-1">PNG, JPG up to 10MB</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">
                                            <User size={16} className="inline mr-2" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                                            placeholder="Ahmed Mohamed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">
                                            <Mail size={16} className="inline mr-2" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                                            placeholder="ahmed@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">
                                            <Phone size={16} className="inline mr-2" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                                            placeholder="01XXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">
                                            <Building size={16} className="inline mr-2" />
                                            Business Name <span className="text-white/40">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                                            placeholder="Your Store Name"
                                        />
                                    </div>
                                </div>

                                {/* Payment Method Badge */}
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                                    <span className="text-2xl">{selectedPayment?.icon}</span>
                                    <div>
                                        <p className="text-white/60 text-sm">Paid via</p>
                                        <p className="text-white font-bold">{selectedPayment?.label}</p>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                                        {error}
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || !screenshot}
                                    whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
                                    whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${!isSubmitting && screenshot
                                            ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A0A0B]"
                                            : "bg-white/10 text-white/40 cursor-not-allowed"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Order"
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && isSuccess && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card-gold p-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                                <CheckCircle className="text-green-400" size={48} />
                            </motion.div>

                            <h1 className="text-3xl font-bold text-white mb-4">Order Submitted! 🎉</h1>

                            <p className="text-white/60 mb-8 max-w-md mx-auto">
                                We&apos;ve received your order and payment screenshot. Our team will verify
                                your payment and send the theme to <span className="text-[#D4AF37] font-bold">{formData.email}</span> within 24 hours (usually much faster!).
                            </p>

                            <div className="bg-[#D4AF37]/10 rounded-xl p-6 mb-8">
                                <h3 className="text-[#D4AF37] font-bold mb-2">What happens next?</h3>
                                <ul className="text-white/60 text-sm space-y-2 text-left">
                                    <li>✓ We verify your payment screenshot</li>
                                    <li>✓ We prepare your personalized theme package</li>
                                    <li>✓ You receive an email with download link + instructions</li>
                                </ul>
                            </div>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8860B] transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Home
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
