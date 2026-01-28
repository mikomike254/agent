// Client Dashboard
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    total_value: number;
    status: string;
    escrow_balance: number;
    milestones: Milestone[];
}

interface Milestone {
    id: string;
    title: string;
    percent_amount: number;
    status: string;
    deliverable_links: string[];
}

export default function ClientDashboard() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch projects from API
        setLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#1f7a5a]">My Projects</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Welcome, {session?.user?.name}</span>
                        <div className="w-10 h-10 bg-[#1f7a5a] rounded-full flex items-center justify-center text-white font-bold">
                            {session?.user?.name?.[0]}
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">Active Projects</span>
                        </div>
                        <p className="text-3xl font-bold">2</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">Completed</span>
                        </div>
                        <p className="text-3xl font-bold">5</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <span className="text-sm text-gray-600">Pending Approval</span>
                        </div>
                        <p className="text-3xl font-bold">3</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1f7a5a]/10 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-[#1f7a5a]" />
                            </div>
                            <span className="text-sm text-gray-600">In Escrow</span>
                        </div>
                        <p className="text-3xl font-bold">KES 215K</p>
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Active Projects</h2>
                    </div>

                    <div className="divide-y">
                        {/* Sample Project */}
                        <div className="p-6 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        School Management Portal
                                    </h3>
                                    <p className="text-sm text-gray-600">Total: KES 500,000</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Active
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-medium">60%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#1f7a5a] h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>

                            {/* Milestones */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="flex-1">Discovery & Planning</span>
                                    <span className="text-gray-600">20% • Completed</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="flex-1">Design & Prototype</span>
                                    <span className="text-gray-600">20% • Completed</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock className="w-5 h-5 text-yellow-500" />
                                    <span className="flex-1">Development</span>
                                    <span className="text-gray-600">40% • In Progress</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                    <span className="flex-1">Testing & Launch</span>
                                    <span className="text-gray-600">20% • Pending</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="mt-4 w-full py-2 border border-[#1f7a5a] text-[#1f7a5a] rounded-lg font-medium hover:bg-[#1f7a5a] hover:text-white transition">
                                View Details
                            </button>
                        </div>

                        {/* Another Sample Project */}
                        <div className="p-6 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        E-Commerce Platform
                                    </h3>
                                    <p className="text-sm text-gray-600">Total: KES 750,000</p>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                    Pending Deposit
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Waiting for 43% deposit verification by admin. Your payment has been received.
                            </p>

                            <div className="flex items-center gap-2 text-sm text-[#1f7a5a] bg-[#1f7a5a]/10 p-3 rounded-lg">
                                <Clock className="w-4 h-4" />
                                <span>Deposit under review. Estimated completion: 24 hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
