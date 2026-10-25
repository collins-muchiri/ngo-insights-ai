import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import {
    Database,
    Cpu,
    Mail,
    ArrowRight,
    CheckCircle2,
    Globe,
    Search,
    BarChart,
    Layers,
    Zap,
    MapPin,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { prisma } from '../prisma';

interface CommunityNeed {
    id: string;
    title: string;
    sector: string;
    urgency: string;
    location: string;
    scrapedAt: string;
}

export default function ProductOverview({ latestNeeds }: { latestNeeds: CommunityNeed[] }) {
    return (
        <>
            <Head>
                <title>Architecture & Features — NGO Insights AI</title>
                <meta name="description" content="Deep dive into the AI architecture driving NGO outreach automation in East Africa." />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar />

                <main>
                    {/* Hero Section */}
                    <section className="pt-24 pb-20 bg-slate-950 text-white overflow-hidden relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full -z-10" />

                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-4xl sm:text-6xl font-extrabold mb-8 tracking-tight">
                                The Intelligence Behind <br />
                                <span className="gradient-text">Your Mission</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Explore how we combine regional data collection, NLP analysis, and automated outreach to accelerate NGO impact.
                            </p>
                        </div>
                    </section>

                    {/* Architecture Diagram */}
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Automation Architecture</h2>
                                    <p className="text-slate-600">A high-level view of how data flows through our system.</p>
                                </div>

                                <div className="relative">
                                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-slate-100 -z-10" />
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-24 h-24 rounded-3xl bg-brand-50 flex items-center justify-center mb-6 shadow-sm border border-brand-100 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                                <Database className="w-10 h-10 text-brand-500 group-hover:text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Collection</h3>
                                            <p className="text-slate-500 text-sm">Distributed scrapers gather community needs from regional forums and news.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-24 h-24 rounded-3xl bg-brand-50 flex items-center justify-center mb-6 shadow-sm border border-brand-100 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                                <Cpu className="w-10 h-10 text-brand-500 group-hover:text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Analysis</h3>
                                            <p className="text-slate-500 text-sm">LangChain-powered workflows identify sentiment and urgent categories.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center group">
                                            <div className="w-24 h-24 rounded-3xl bg-brand-50 flex items-center justify-center mb-6 shadow-sm border border-brand-100 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                                <Mail className="w-10 h-10 text-brand-500 group-hover:text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Outreach</h3>
                                            <p className="text-slate-500 text-sm">AI drafts tailored donor messages, pairing data with funder priorities.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Live Data Feed */}
                    <section className="py-24 bg-slate-50 border-y border-slate-200">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Community Insights</h2>
                                    <p className="text-slate-600">Fresh data pulled by our regional scrapers and analyzed in real-time.</p>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        LIVE FEED
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {latestNeeds.length > 0 ? latestNeeds.map((need) => (
                                    <div key={need.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${need.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-brand-100 text-brand-700'
                                                }`}>
                                                {need.urgency}
                                            </span>
                                            <div className="flex items-center text-slate-400 text-[10px]">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(need.scrapedAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-3 line-clamp-2">{need.title}</h4>
                                        <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-slate-50">
                                            <div className="flex items-center text-xs text-slate-500">
                                                <Layers className="w-3 h-3 mr-1 text-slate-400" />
                                                {need.sector}
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                                                {need.location || 'Regional'}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                                        <p className="text-slate-400 italic">Connecting to regional data clusters... Scraper results will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive Features */}
                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                                <div>
                                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-6">
                                        <Search className="w-4 h-4" />
                                        <span>Scraping & Discovery</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                        Never Miss a Community Need With <span className="text-brand-500">Regional Scrapers</span>
                                    </h2>
                                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                        Our Python-based engine uses Scrapy and Selenium to monitor digital conversations across East Africa. We don&apos;t just look at global news; we monitor regional forums and community dashboards where real voices are heard.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Automated monitoring of 100+ regional sources",
                                            "Dialect-aware NLP for localized sentiment analysis",
                                            "Duplicate detection and data deduplication"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center space-x-3 text-slate-700 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-200">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            <div className="w-3 h-3 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-mono text-slate-400">scraper_logs/kenya_central.log</span>
                                    </div>
                                    <div className="space-y-4 font-mono text-sm">
                                        <div className="text-brand-600 flex items-center space-x-2">
                                            <ArrowRight className="w-4 h-4" />
                                            <span>[2026-01-18] Crawl started: 12 sources identified</span>
                                        </div>
                                        <div className="text-slate-500 ml-6">Extracting sentiment for &quot;Water shortage in Laikipia&quot;...</div>
                                        <div className="text-green-600 font-bold ml-6">Success: 8 high-urgency points recorded.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-24 bg-slate-950">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold text-white mb-8">Ready to Automate Your Insights?</h2>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/demo" className="btn-primary px-10">Request a Live Demo</Link>
                                <Link href="/contact" className="btn-ghost px-10">Talk to an Expert</Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-white py-12 border-t border-slate-100 text-center text-sm text-slate-400">
                    <p>© 2026 NGO Community Research AI. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const needs = await prisma.communityNeed.findMany({
            orderBy: { scrapedAt: 'desc' },
            take: 6
        });

        return {
            props: {
                latestNeeds: JSON.parse(JSON.stringify(needs))
            }
        };
    } catch (e) {
        return {
            props: { latestNeeds: [] }
        };
    }
};
