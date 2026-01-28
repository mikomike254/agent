// Commissioner Dashboard
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Plus, Link2, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function CommissionerDashboard() {
    const { data: session } = useSession();
    const [showCreateLead, setShowCreateLead] = useState(false);
    const [leadForm, setLeadForm] = useState({
        client_name: '',
        client_email: '',
        client_phone: '',
        project_summary: '',
        budget: ''
    });

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commissioner_id: (session?.user as any)?.id,
                ...leadForm
            })
        });

        const result = await response.json();
        if (result.success) {
            alert(`Lead created! Intake link: ${result.data.intake_link}`);
            setShowCreateLead(false);
            setLeadForm({ client_name: '', client_email: '', client_phone: '', project_summary: '', budget: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#1f7a5a]">Commissioner Dashboard</h1>
                    <button
                        onClick={() => setShowCreateLead(true)}
                        className="px-6 py-2 bg-[#1f7a5a] text-white rounded-lg font-medium hover:bg-[#176549] flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create Lead
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">Active Leads</span>
                        </div>
                        <p className="text-3xl font-bold">12</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">Conversion Rate</span>
                        </div>
                        <p className="text-3xl font-bold">68%</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#1f7a5a]/10 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-[#1f7a5a]" />
                            </div>
                            <span className="text-sm text-gray-600">This Month</span>
                        </div>
                        <p className="text-3xl font-bold">KES 125K</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-sm text-gray-600">Total Earned</span>
                        </div>
                        <p className="text-3xl font-bold">KES 1.2M</p>
                    </div>
                </div>

                {/* Leads Pipeline */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Leads Pipeline</h2>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {/* Sample Lead */}
                            <div className="border-l-4 border-[#1f7a5a] bg-gray-50 p-4 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">Green School Ltd</h3>
                                        <p className="text-sm text-gray-600">School management system • KES 500,000</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        Active Project
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>Created: Jan 15, 2026</span>
                                    <span>•</span>
                                    <span>Commission: KES 125,000 (25%)</span>
                                </div>
                            </div>

                            {/* Another Lead */}
                            <div className="border-l-4 border-yellow-500 bg-gray-50 p-4 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">Retail Corp Kenya</h3>
                                        <p className="text-sm text-gray-600">E-commerce platform • KES 750,000</p>
                                    </div>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                        Viewed Link
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Link2 className="w-4 h-4 text-gray-400" />
                                    <button className="text-[#1f7a5a] hover:underline">
                                        Copy intake link
                                    </button>
                                </div>
                            </div>

                            {/* Lead Sent */}
                            <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">TechHub Nairobi</h3>
                                        <p className="text-sm text-gray-600">CRM system • KES 300,000</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        Link Sent
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">Sent 2 days ago • Follow up scheduled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Commission Breakdown */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Commission Breakdown</h2>
                    </div>

                    <div className="p-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium">Green School Ltd</p>
                                    <p className="text-sm text-gray-600">Milestone 1 released</p>
                                </div>
                                <span className="font-bold text-green-600">+KES 25,000</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                <div>
                                    <p className="font-medium">Safari Tours</p>
                                    <p className="text-sm text-gray-600">Project completed</p>
                                </div>
                                <span className="font-bold text-green-600">+KES 90,000</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <div>
                                    <p className="font-medium">Referral Override</p>
                                    <p className="text-sm text-gray-600">From Grace's project</p>
                                </div>
                                <span className="font-bold text-purple-600">+KES 10,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Lead Modal */}
            {showCreateLead && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Create New Lead</h3>

                        <form onSubmit={handleCreateLead} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Client Name</label>
                                <input
                                    type="text"
                                    value={leadForm.client_name}
                                    onChange={(e) => setLeadForm({ ...leadForm, client_name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={leadForm.client_email}
                                    onChange={(e) => setLeadForm({ ...leadForm, client_email: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={leadForm.client_phone}
                                    onChange={(e) => setLeadForm({ ...leadForm, client_phone: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="+254700000000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Project Summary</label>
                                <textarea
                                    value={leadForm.project_summary}
                                    onChange={(e) => setLeadForm({ ...leadForm, project_summary: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Estimated Budget (KES)</label>
                                <input
                                    type="number"
                                    value={leadForm.budget}
                                    onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateLead(false)}
                                    className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-[#1f7a5a] text-white rounded-lg hover:bg-[#176549]"
                                >
                                    Create & Get Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
