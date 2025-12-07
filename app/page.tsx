import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import WhySkale from '@/components/sections/why-skale';
import NetworkStats from '@/components/sections/network-stats';
import Foundation from '@/components/sections/foundation';
import WhatsNew from '@/components/sections/whats-new';
import Expand from '@/components/sections/expand';
import Cta from '@/components/sections/cta';
import Footer from '@/components/layout/footer';
import Parser from 'rss-parser';

async function getBlogPosts() {
  try {
    const parser = new Parser({
      customFields: {
        item: [['media:content', 'media:content']],
      }
    });
    const feed = await parser.parseURL('https://skale.space/blog/rss.xml');
    return feed.items.slice(0, 6).map(item => ({
      id: item.guid,
      title: item.title,
      link: item.link,
      category: item.categories?.[0] || 'News',
      imageUrl: (item as any)['media:content']?.$?.url || item.enclosure?.url || null,
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <WhySkale />
        <Foundation />
        <Expand />
        <NetworkStats />
        <WhatsNew posts={posts} />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
