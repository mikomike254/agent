// Admin Dashboard
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { CheckCircle, AlertCircle, Shield, DollarSign, Eye } from 'lucide-react';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    const handleVerifyPayment = async (paymentId: string) => {
        const response = await fetch(`/api/admin/payments/${paymentId}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                admin_id: (session?.user as any)?.id,
                notes: 'Payment verified manually'
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('Payment verified and escrow created!');
            setSelectedPayment(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-[#1f7a5a]">Admin Dashboard</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <span className="text-sm text-gray-600">Pending Verification</span>
                        </div>
                        <p className="text-3xl font-bold">5</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">Active Projects</span>
                        </div>
                        <p className="text-3xl font-bold">28</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1f7a5a]/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#1f7a5a]" />
                            </div>
                            <span className="text-sm text-gray-600">Total in Escrow</span>
                        </div>
                        <p className="text-3xl font-bold">KES 2.1M</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-sm text-gray-600">Platform Revenue</span>
                        </div>
                        <p className="text-3xl font-bold">KES 450K</p>
                    </div>
                </div>

                {/* Pending Verifications */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Payments Pending Verification</h2>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            5 Pending
                        </span>
                    </div>

                    <div className="divide-y">
                        {/* Sample Payment */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">
                                        Green School Ltd - Deposit
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Project: School Management Portal
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Payment Method: Paystack (Card)
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-[#1f7a5a]">KES 215,000</p>
                                    <p className="text-sm text-gray-600">43% deposit</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Transaction ID</p>
                                        <p className="font-mono">PST_abc123xyz</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Timestamp</p>
                                        <p>Jan 28, 2026 10:45 AM</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Client Email</p>
                                        <p>client@greenschool.ke</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Commissioner</p>
                                        <p>Esther Njeri</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedPayment({ id: 'payment-1' })}
                                    className="px-4 py-2 border border-[#1f7a5a] text-[#1f7a5a] rounded-lg hover:bg-[#1f7a5a]/10 flex items-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleVerifyPayment('payment-1')}
                                    className="px-6 py-2 bg-[#1f7a5a] text-white rounded-lg hover:bg-[#176549] flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Verify & Create Escrow
                                </button>
                                <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                                    Reject
                                </button>
                            </div>
                        </div>

                        {/* Another Payment */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">
                                        Retail Corp - Deposit
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Project: E-commerce Platform
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Payment Method: Mobile Money
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-[#1f7a5a]">KES 322,500</p>
                                    <p className="text-sm text-gray-600">43% deposit</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-4 py-2 border border-[#1f7a5a] text-[#1f7a5a] rounded-lg hover:bg-[#1f7a5a]/10">
                                    View Details
                                </button>
                                <button className="px-6 py-2 bg-[#1f7a5a] text-white rounded-lg hover:bg-[#176549]">
                                    Verify & Create Escrow
                                </button>
                                <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Escrow Ledger */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Recent Escrow Transactions</h2>
                    </div>

                    <div className="divide-y">
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Escrow Hold Created</p>
                                    <p className="text-sm text-gray-600">Green School - Deposit verified</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">+KES 215,000</p>
                                <p className="text-sm text-gray-600">2 hours ago</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Funds Released</p>
                                    <p className="text-sm text-gray-600">Safari Tours - Milestone completed</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-600">-KES 120,000</p>
                                <p className="text-sm text-gray-600">Yesterday</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Refund Issued (110%)</p>
                                    <p className="text-sm text-gray-600">TechHub Project - Cancelled</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-600">-KES 165,000</p>
                                <p className="text-sm text-gray-600">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
