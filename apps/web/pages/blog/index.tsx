import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { BookOpen, Calendar, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { prisma } from '../../prisma';

// Frozen at module load (SSR/build time): Date.now() during render is impure
// (react-hooks purity rule) and can differ between server render and client
// hydration, risking hydration mismatches.
const BUILD_FALLBACK_DATE = new Date().toISOString();

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>Insights & Reports — NGO Insights AI</title>
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                NGO <span className="gradient-text">Insights Hub</span>
              </h1>
              <p className="text-lg text-slate-600">
                The latest community research, donor trends, and AI automation strategies for East African NGOs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.length > 0 ? posts.map((post) => (
                <div key={post.slug} className="glass-card flex flex-col group h-full">
                  <div className="flex items-center space-x-2 text-brand-500 text-xs font-bold uppercase tracking-widest mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>Resource</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors h-14 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                    <div className="flex items-center space-x-2 text-slate-400 text-[10px]">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedAt || BUILD_FALLBACK_DATE).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-brand-600 font-bold text-sm flex items-center space-x-1 hover:text-brand-700 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-slate-400">Our AI is generating the latest reports... Check back soon!</p>
                </div>
              )}
            </div>

            <div className="mt-20 text-center">
              <div className="inline-block p-1 rounded-2xl bg-white border border-slate-200">
                <div className="px-8 py-6 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                  <p className="text-slate-500 text-sm">Automated reporting cycles occur every 6 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer-bg py-12 text-center text-slate-400 text-sm border-t border-slate-100">
          <p>© 2026 NGO Community Research AI. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 9
    });

    if (posts.length === 0) throw new Error("No posts found");

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts))
      }
    };
  } catch (e) {
    const fallbackPosts = [
      {
        slug: 'ai-impact-kenya-2026',
        title: 'How AI is Transforming Regional Outreach in Kenya',
        excerpt: 'Explore the latest shifts in how regional NGOs are using automated data collection to drive community engagement.',
        publishedAt: new Date().toISOString()
      },
      {
        slug: 'donor-trends-east-africa',
        title: 'Top 5 Donor Trends in East Africa for 2026',
        excerpt: 'Understand what international funders are looking for in terms of community-led data and localized impact reporting.',
        publishedAt: new Date().toISOString()
      },
      {
        slug: 'automation-for-small-ngos',
        title: 'Scaling Impact: Why Small NGOs Need Automation',
        excerpt: 'A guide for local chapters to leverage AI tools for donor drafting without the high overhead costs.',
        publishedAt: new Date().toISOString()
      },
    ];
    return {
      props: { posts: fallbackPosts }
    };
  }
};
