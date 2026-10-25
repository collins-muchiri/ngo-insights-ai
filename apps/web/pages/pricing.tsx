import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PricingCard from '../components/PricingCard';
import { prisma } from '../prisma';
import { GetStaticProps } from 'next';
import { ShieldCheck, HelpCircle } from 'lucide-react';

type Plan = { id: string; name: string; monthlyPrice: number | null; yearlyPrice: number | null; features: string[] };

export default function PricingPage({ plans }: { plans: Plan[] }) {
  return (
    <>
      <Head>
        <title>Pricing — NGO Insights AI</title>
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Simple, Transparent <span className="gradient-text">Pricing</span>
              </h1>
              <p className="text-lg text-slate-600">
                Choose the plan that fits your NGO&apos;s scale and mission. No hidden fees, just pure impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
              {plans.map((p) => (
                <PricingCard
                  key={p.id}
                  name={p.name}
                  price={p.monthlyPrice !== null ? `$${p.monthlyPrice}` : "Contact Us"}
                  features={p.features}
                  cta={p.monthlyPrice === 0 ? "Get Started for Free" : "Choose Plan"}
                  popular={p.name === 'Growth'}
                />
              ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold">Trusted by 50+ NGOs</h4>
                    <p className="text-slate-500 text-sm">Secure, compliant, and regional data protection.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-brand-600 font-semibold cursor-pointer hover:text-brand-700 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span>Have questions? Talk to our team</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 NGO Community Research AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      orderBy: {
        monthlyPrice: 'asc'
      }
    });

    return {
      props: {
        plans: JSON.parse(JSON.stringify(plans))
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error("Failed to fetch plans from DB, using fallback", error);
    const plans = [
      { id: 'community', name: 'Community', monthlyPrice: 0, yearlyPrice: 0, features: ['Community data access', 'AI-generated brief', 'Public sector insights'] },
      { id: 'starter', name: 'Starter', monthlyPrice: 29, yearlyPrice: 299, features: ['Lead capture (50/mo)', 'Basic community analysis', 'Standard email support'] },
      { id: 'growth', name: 'Growth', monthlyPrice: 99, yearlyPrice: 999, features: ['Unlimited leads', 'AI Automated drafting', 'WhatsApp & Calendly integration'] },
      { id: 'scale', name: 'Scale', monthlyPrice: 299, yearlyPrice: 2999, features: ['Multi-region dashboards', 'Advanced custom automations', 'Dedicated account manager'] },
    ];
    return { props: { plans } }
  }
}
