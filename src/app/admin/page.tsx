"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    LogOut,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    Phone,
    Building,
    Loader2,
    RefreshCw,
    ExternalLink,
    Search,
} from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";

const statusColors: Record<OrderStatus, { bg: string; text: string; icon: React.ReactNode }> = {
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: <Clock size={16} /> },
    approved: { bg: "bg-green-500/20", text: "text-green-400", icon: <CheckCircle size={16} /> },
    rejected: { bg: "bg-red-500/20", text: "text-red-400", icon: <XCircle size={16} /> },
};

const paymentMethodLabels: Record<string, string> = {
    vodafone_cash: "Vodafone Cash",
    instapay: "InstaPay",
    telda: "Telda",
};

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

    // Check if already logged in
    useEffect(() => {
        const savedAuth = sessionStorage.getItem("adminAuth");
        if (savedAuth) {
            setIsLoggedIn(true);
            setPassword(savedAuth);
        }
    }, []);

    // Fetch orders when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple auth check - the real validation happens on the server
        if (password.length > 0) {
            sessionStorage.setItem("adminAuth", password);
            setIsLoggedIn(true);
            setAuthError("");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("adminAuth");
        setIsLoggedIn(false);
        setPassword("");
        setOrders([]);
    };

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/orders", {
                headers: {
                    Authorization: `Bearer ${password}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setAuthError("Invalid admin password");
                    handleLogout();
                    return;
                }
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (orderId: string, action: "approve" | "reject") => {
        setActionLoading(orderId);
        try {
            const response = await fetch("/api/orders/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${password}`,
                },
                body: JSON.stringify({ orderId, action }),
            });

            if (!response.ok) {
                throw new Error("Action failed");
            }

            // Refresh orders
            await fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error("Action error:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm);

        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        approved: orders.filter((o) => o.status === "approved").length,
        rejected: orders.filter((o) => o.status === "rejected").length,
    };

    // Login Screen
    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-[#0A0A0B] to-[#141416] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="glass-card-gold p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                                <Lock className="text-[#D4AF37]" size={28} />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-white/60 mt-2">Enter your admin password to continue</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin Password"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors mb-4"
                            />

                            {authError && (
                                <p className="text-red-400 text-sm mb-4">{authError}</p>
                            )}

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A0A0B] rounded-xl font-bold"
                            >
                                Login
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </main>
        );
    }

    // Admin Dashboard
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0A0A0B] to-[#141416] py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Order Management</h1>
                        <p className="text-white/60">Manage APEX Theme orders</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={fetchOrders}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                            disabled={isLoading}
                        >
                            <RefreshCw className={`text-white ${isLoading ? "animate-spin" : ""}`} size={20} />
                        </motion.button>
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                        >
                            <LogOut size={18} />
                            Logout
                        </motion.button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Orders", value: stats.total, color: "#D4AF37" },
                        { label: "Pending", value: stats.pending, color: "#eab308" },
                        { label: "Approved", value: stats.approved, color: "#22c55e" },
                        { label: "Rejected", value: stats.rejected, color: "#ef4444" },
                    ].map((stat) => (
                        <div key={stat.label} className="glass-card p-6">
                            <p className="text-white/60 text-sm">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search by email, name, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${statusFilter === status
                                    ? "bg-[#D4AF37] text-[#0A0A0B]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="glass-card overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-white/40">No orders found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-4 text-white/60 font-medium">Customer</th>
                                        <th className="text-left p-4 text-white/60 font-medium">Payment</th>
                                        <th className="text-left p-4 text-white/60 font-medium">Status</th>
                                        <th className="text-left p-4 text-white/60 font-medium">Date</th>
                                        <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div>
                                                    <p className="text-white font-medium">{order.name}</p>
                                                    <p className="text-white/60 text-sm">{order.email}</p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80">
                                                    {paymentMethodLabels[order.payment_method] || order.payment_method}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statusColors[order.status].bg
                                                        } ${statusColors[order.status].text}`}
                                                >
                                                    {statusColors[order.status].icon}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4 text-white/60 text-sm">
                                                {new Date(order.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                    >
                                                        <Eye className="text-white/60" size={18} />
                                                    </motion.button>
                                                    {order.status === "pending" && (
                                                        <>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleAction(order.id, "approve")}
                                                                disabled={actionLoading === order.id}
                                                                className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                                                            >
                                                                {actionLoading === order.id ? (
                                                                    <Loader2 className="animate-spin text-green-400" size={18} />
                                                                ) : (
                                                                    <CheckCircle className="text-green-400" size={18} />
                                                                )}
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleAction(order.id, "reject")}
                                                                disabled={actionLoading === order.id}
                                                                className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                                                            >
                                                                <XCircle className="text-red-400" size={18} />
                                                            </motion.button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Detail Modal */}
                <AnimatePresence>
                    {selectedOrder && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#141416] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
                            >
                                {/* Header */}
                                <div className="bg-[#141416] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold text-white">Order Details</h2>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status].bg} ${statusColors[selectedOrder.status].text}`}
                                        >
                                            {statusColors[selectedOrder.status].icon}
                                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                </div>

                                {/* Two-Column Content */}
                                <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-6">
                                        {/* Left Column — Customer & Order Info */}
                                        <div className="space-y-5">
                                            {/* Order ID */}
                                            <p className="text-white/40 text-xs font-mono break-all">ID: {selectedOrder.id}</p>

                                            {/* Customer Info */}
                                            <div>
                                                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Customer Information</h3>
                                                <div className="bg-white/5 rounded-xl border border-white/5 divide-y divide-white/5">
                                                    <div className="flex items-center gap-3 px-4 py-3">
                                                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                                            <Building className="text-[#D4AF37]" size={14} />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-white/40 text-[11px] uppercase tracking-wide">Name</p>
                                                            <p className="text-white text-sm font-medium truncate">{selectedOrder.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 px-4 py-3">
                                                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                                            <Mail className="text-[#D4AF37]" size={14} />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-white/40 text-[11px] uppercase tracking-wide">Email</p>
                                                            <p className="text-white text-sm truncate">{selectedOrder.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 px-4 py-3">
                                                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                                            <Phone className="text-[#D4AF37]" size={14} />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-white/40 text-[11px] uppercase tracking-wide">Phone</p>
                                                            <p className="text-white text-sm">{selectedOrder.phone}</p>
                                                        </div>
                                                    </div>
                                                    {selectedOrder.business_name && (
                                                        <div className="flex items-center gap-3 px-4 py-3">
                                                            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                                                <Building className="text-[#D4AF37]" size={14} />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-white/40 text-[11px] uppercase tracking-wide">Business</p>
                                                                <p className="text-white text-sm truncate">{selectedOrder.business_name}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Order Info */}
                                            <div>
                                                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Order Information</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white/5 rounded-xl border border-white/5 px-4 py-3">
                                                        <p className="text-white/40 text-[11px] uppercase tracking-wide">Payment Method</p>
                                                        <p className="text-white text-sm font-medium mt-1">
                                                            {paymentMethodLabels[selectedOrder.payment_method] || selectedOrder.payment_method}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white/5 rounded-xl border border-white/5 px-4 py-3">
                                                        <p className="text-white/40 text-[11px] uppercase tracking-wide">Order Date</p>
                                                        <p className="text-white text-sm font-medium mt-1">
                                                            {new Date(selectedOrder.created_at).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Download Info (if approved) */}
                                            {selectedOrder.status === "approved" && (
                                                <div>
                                                    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Download Info</h3>
                                                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 space-y-1">
                                                        <p className="text-green-400 text-sm">
                                                            Downloads: <span className="font-medium">{selectedOrder.download_count} / {selectedOrder.max_downloads}</span>
                                                        </p>
                                                        {selectedOrder.download_expires_at && (
                                                            <p className="text-green-400/70 text-sm">
                                                                Expires: {new Date(selectedOrder.download_expires_at).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {selectedOrder.status === "pending" && (
                                                <div className="flex gap-3 pt-1">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAction(selectedOrder.id, "approve")}
                                                        disabled={actionLoading === selectedOrder.id}
                                                        className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                                                    >
                                                        {actionLoading === selectedOrder.id ? (
                                                            <Loader2 className="animate-spin" size={16} />
                                                        ) : (
                                                            <CheckCircle size={16} />
                                                        )}
                                                        Approve & Send Email
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAction(selectedOrder.id, "reject")}
                                                        disabled={actionLoading === selectedOrder.id}
                                                        className="flex-1 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-red-500/20 transition-colors"
                                                    >
                                                        <XCircle size={16} />
                                                        Reject
                                                    </motion.button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column — Payment Screenshot */}
                                        <div className="mt-5 md:mt-0">
                                            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Payment Screenshot</h3>
                                            <a
                                                href={selectedOrder.screenshot_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative group rounded-xl overflow-hidden border border-white/10 bg-black/20"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={selectedOrder.screenshot_url}
                                                    alt="Payment screenshot"
                                                    className="w-full max-h-[500px] object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <ExternalLink className="text-white" size={22} />
                                                    <span className="text-white text-sm font-medium">View Full Image</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
