import React from 'react';
import { Calendar, MessageCircle, PlayCircle, Star } from 'lucide-react';

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/muchiricollins98/30min';
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/2547XXXXXXXX';

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">See AI in Action</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Experience how our platform identifies community needs and transforms them into impact-driven outreach in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-2 shadow-2xl overflow-hidden aspect-video relative group">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                title="Calendly Demo"
                className="rounded-2xl"
              />
              {/* Overlay if iframe fails or for aesthetic */}
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <Calendar className="w-12 h-12 text-brand-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Personalized Walkthrough</h4>
                  <p className="text-slate-400 text-sm">A 30-minute deep dive tailored to your NGO&apos;s specific sector and needs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Live Analysis Sample</h4>
                  <p className="text-slate-400 text-sm">We&apos;ll run a live sample analysis on one of your target regions during the call.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-brand-500/10 border border-brand-500/20 rounded-2xl">
              <h5 className="text-white font-bold mb-2">Prefer a quick chat?</h5>
              <p className="text-brand-100/70 text-sm mb-6">Connect with our regional team directly via WhatsApp for a faster response.</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 text-brand-300 hover:text-brand-200 transition-colors font-bold"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
