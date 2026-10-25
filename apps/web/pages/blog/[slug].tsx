import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { prisma } from '../../prisma';
import { ArrowLeft, Share2, Printer, Calendar, User } from 'lucide-react';

// Frozen at module load (SSR/build time): Date.now() during render is impure
// (react-hooks purity rule) and can differ between server render and client
// hydration, risking hydration mismatches.
const BUILD_FALLBACK_DATE = new Date().toISOString();

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
}

export default function BlogPost({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} — NGO Insights AI</title>
      </Head>

      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb / Back */}
              <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-brand-500 transition-colors mb-12 space-x-2 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Insights</span>
              </Link>

              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center space-x-2 text-brand-500 text-xs font-bold uppercase tracking-widest mb-6">
                  <span>Resource</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between border-y border-slate-100 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm">{post.author || 'AI Research Team'}</p>
                      <div className="flex items-center space-x-2 text-slate-500 text-xs mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishedAt || BUILD_FALLBACK_DATE).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-slate-400 hover:text-brand-500"><Share2 className="w-5 h-5" /></button>
                    <button className="text-slate-400 hover:text-brand-500"><Printer className="w-5 h-5" /></button>
                  </div>
                </div>
              </header>

              {/* Content */}
              <article className="prose prose-slate prose-lg max-w-none">
                <div
                  className="space-y-6 text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* CTA */}
              <div className="mt-20 p-10 bg-brand-600 rounded-[2rem] text-center text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Want more regional insights?</h3>
                <p className="text-brand-100 mb-8 max-w-md mx-auto">See how our AI can help your NGO identify community needs and automate your donor outreach today.</p>
                <Link href="/demo" className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors inline-block shadow-lg">
                  Request a Free Demo
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: String(slug) }
    });

    if (!post) throw new Error("Not found");

    return {
      props: {
        post: JSON.parse(JSON.stringify(post))
      }
    };
  } catch (error) {
    // Fallback data for specific slugs
    const fallbacks: Record<string, { title: string; author: string; publishedAt: string; content: string }> = {
      'ai-impact-kenya-2026': {
        title: 'How AI is Transforming Regional Outreach in Kenya',
        author: 'AI Insights Hub',
        publishedAt: new Date().toISOString(),
        content: '<p>The Kenyan NGO sector is at a crossroads...</p><p>By leveraging AI, local organizations can now compete for global grants with data-backed precision.</p>'
      },
      'donor-trends-east-africa': {
        title: 'Top 5 Donor Trends in East Africa for 2026',
        author: 'Regional Research Team',
        publishedAt: new Date().toISOString(),
        content: '<p>International funding is shifting toward "The Last Mile"...</p><p>Real-time community metrics are becoming mandatory.</p>'
      },
      'automation-for-small-ngos': {
        title: 'Scaling Impact: Why Small NGOs Need Automation',
        author: 'Tech Implementation Group',
        publishedAt: new Date().toISOString(),
        content: '<p>Small chapters often lack the staff to monitor everything...</p><p>Automation bridges the gap between limited resources and high impact.</p>'
      }
    };

    const fallbackPost = fallbacks[String(slug)] || {
      title: 'NGO Insight Report',
      author: 'AI Analyst',
      publishedAt: new Date().toISOString(),
      content: '<p>Detailed analysis of regional community needs and donor outreach strategies.</p>'
    };

    return {
      props: {
        post: { slug: String(slug), ...fallbackPost }
      }
    };
  }
};

