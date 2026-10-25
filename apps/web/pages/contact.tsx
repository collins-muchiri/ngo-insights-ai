import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Send, CheckCircle2, AlertCircle, MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'Outreach Automation',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Website Contact Form'
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', organization: '', interest: 'Outreach Automation', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us — NGO Insights AI</title>
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div>
                  <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Let&apos;s scale your <br />
                    <span className="gradient-text">NGO&apos;s impact.</span>
                  </h1>
                  <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                    Have questions about our AI platform or regional datasets? Our team is ready to support your mission across East Africa.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                        <MapPin className="w-6 h-6 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Nairobi Regional Hub</h4>
                        <p className="text-slate-500 text-sm">Westlands, Nairobi, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                        <Mail className="w-6 h-6 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Email Us</h4>
                        <p className="text-slate-500 text-sm">hello@ngoinsights.ai</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                        <Phone className="w-6 h-6 text-brand-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Call Support</h4>
                        <p className="text-slate-500 text-sm">+254 747 845 084</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-premium border border-slate-100">
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-500 mb-8">Thank you for reaching out. Our regional representative will contact you within 24 hours.</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="btn-secondary"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Full Name</label>
                          <input
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Email Address</label>
                          <input
                            required
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                            placeholder="john@organization.org"
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
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          placeholder="My NGO Ltd"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Topic of Interest</label>
                        <select
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        >
                          <option>Outreach Automation</option>
                          <option>Regional Research</option>
                          <option>Data Scraping Services</option>
                          <option>Custom AI Workflows</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Message</label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center space-x-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>Something went wrong. Please try again.</span>
                        </div>
                      )}

                      <button
                        disabled={status === 'loading'}
                        type="submit"
                        className="btn-primary w-full space-x-2 disabled:opacity-70"
                      >
                        {status === 'loading' ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
