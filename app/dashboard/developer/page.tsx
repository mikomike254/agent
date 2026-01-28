// Developer Dashboard
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Briefcase, Upload, Clock, CheckCircle } from 'lucide-react';

export default function DeveloperDashboard() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-[#1f7a5a]">Developer Dashboard</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">Active Projects</span>
                        </div>
                        <p className="text-3xl font-bold">4</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <span className="text-sm text-gray-600">Pending Delivery</span>
                        </div>
                        <p className="text-3xl font-bold">6</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">Completed</span>
                        </div>
                        <p className="text-3xl font-bold">18</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1f7a5a]/10 rounded-lg flex items-center justify-center">
                                <span className="text-[#1f7a5a] font-bold">KES</span>
                            </div>
                            <span className="text-sm text-gray-600">Pending Payout</span>
                        </div>
                        <p className="text-3xl font-bold">KES 380K</p>
                    </div>
                </div>

                {/* Project Queue */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Project Queue</h2>
                    </div>

                    <div className="divide-y">
                        {/* Sample Project */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        School Management Portal
                                    </h3>
                                    <p className="text-sm text-gray-600">Green School Ltd</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    In Progress
                                </span>
                            </div>

                            {/* Milestones */}
                            <div className="space-y-3 mb-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold">Development Phase</h4>
                                            <p className="text-sm text-gray-600">Due: Feb 15, 2026</p>
                                        </div>
                                        <span className="text-sm font-medium text-yellow-600">40% • Active</span>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <button className="px-4 py-2 border border-[#1f7a5a] text-[#1f7a5a] rounded-lg text-sm hover:bg-[#1f7a5a]/10 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload Deliverable
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold text-green-900">Design & Prototype</h4>
                                            <p className="text-sm text-green-700">Completed & Approved</p>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-sm text-green-700 mt-2">
                                        Payment released: KES 100,000
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Overall Progress</span>
                                    <span className="font-medium">60%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#1f7a5a] h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Another Project */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        E-Commerce Platform
                                    </h3>
                                    <p className="text-sm text-gray-600">Retail Corp Kenya</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    Starting Soon
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Waiting for deposit verification. Expected start date: Feb 1, 2026
                            </p>

                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700">
                                    You'll be notified once the client's deposit is verified and held in escrow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earnings Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Recent Payouts */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-bold">Recent Payouts</h3>
                        </div>

                        <div className="p-6 space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="font-medium">Safari Tours App</p>
                                    <p className="text-sm text-gray-600">Final milestone</p>
                                </div>
                                <span className="font-bold text-green-600">KES 180,000</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="font-medium">Green School Portal</p>
                                    <p className="text-sm text-gray-600">Design phase</p>
                                </div>
                                <span className="font-bold text-green-600">KES 100,000</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <div>
                                    <p className="font-medium">TechHub CRM</p>
                                    <p className="text-sm text-gray-600">Milestone 2</p>
                                </div>
                                <span className="font-bold text-green-600">KES 75,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Skills & Ratings */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-bold">Your Profile</h3>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 bg-[#1f7a5a] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {session?.user?.name?.[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{session?.user?.name}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500 text-lg">★★★★★</span>
                                        <span className="text-sm text-gray-600">4.9 (24 reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-700">Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        Frontend
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        CRM Builder
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                        UI/UX
                                    </span>
                                </div>
                            </div>

                            <button className="mt-4 w-full py-2 border border-[#1f7a5a] text-[#1f7a5a] rounded-lg hover:bg-[#1f7a5a]/10">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
