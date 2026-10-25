import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { plan } = router.query;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        country: ''
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    // Derived at submit time (was mirrored into state via an
                    // effect: synchronous setState in effect = cascading renders).
                    interest: plan ? `Plan: ${plan}` : '',
                    source: 'Pricing Checkout'
                }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-brand-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Application Received!</h1>
                    <p className="text-slate-600 leading-relaxed">
                        Thank you for choosing the <span className="font-bold text-brand-600 capitalize">{plan}</span> plan.
                        Our regional onboarding specialist will contact you at <span className="font-medium text-slate-900">{formData.email}</span> within 24 hours to set up your dashboard.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="btn-primary w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Complete Your Application — NGO Insights AI</title>
            </Head>

            <div className="min-h-screen bg-slate-50">
                <Navbar />

                <main className="pt-32 pb-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">

                            {/* Left Column: Summary */}
                            <div className="lg:w-1/3 space-y-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Selected Plan</h1>
                                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-md mb-2 inline-block">
                                            Subscription
                                        </span>
                                        <h2 className="text-2xl font-extrabold text-slate-900 capitalize mb-1">{plan || 'Select a plan'}</h2>
                                        <p className="text-sm text-slate-500">Regional NGO Access</p>
                                        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-slate-900 font-bold">
                                            <span>Total Due</span>
                                            <span>{plan === 'community' ? '$0' : 'Contact for Quote'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            Secure verification process compliant with regional data protection standards.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Form */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-premium-hover border border-slate-100">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Organization Details</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6 text-slate-900">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2 text-slate-900">
                                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-400"
                                                    placeholder="Jane Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Work Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-400"
                                                    placeholder="jane@organization.org"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Organization Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-400"
                                                placeholder="Red Cross Regional Hub"
                                                value={formData.organization}
                                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Primary Country of Operation</label>
                                            <select
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all bg-white"
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="kenya">Kenya</option>
                                                <option value="uganda">Uganda</option>
                                                <option value="tanzania">Tanzania</option>
                                                <option value="ethiopia">Ethiopia</option>
                                                <option value="other">Other / International</option>
                                            </select>
                                        </div>

                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center space-x-2 disabled:opacity-70 shadow-brand-500/20 shadow-lg"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Activate {plan} Access</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                            Your data is encrypted and protected
                                        </p>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
