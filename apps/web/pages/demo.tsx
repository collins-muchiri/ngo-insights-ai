import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import DemoSection from '../components/DemoSection';
import { Sparkles, Calendar, Zap, ShieldCheck } from 'lucide-react';

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Schedule a Demo — NGO Insights AI</title>
      </Head>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          {/* Header Section */}
          <section className="pt-24 pb-16 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Walkthrough</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                  Experience the Future of <br className="hidden sm:block" />
                  <span className="gradient-text">NGO Intelligence</span>
                </h1>
                <p className="text-lg text-slate-600">
                  Book a specialized demo with our regional experts to see how AI can transform your research and donor relations.
                </p>
              </div>
            </div>
          </section>

          <DemoSection />

          {/* Feature Highlight Section */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Custom Scenarios</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    We&apos;ll demonstrate the platform using data relevant to your specific sector, whether it&apos;s Healthcare, Education, or Environment.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Live Q&A</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Get answers to your technical and security questions directly from our implementation team during the session.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Security Audit</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Learn about our data encryption and regional compliance standards that keep your community insights private.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-50 border-t border-slate-200 py-12">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 NGO Community Research AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
