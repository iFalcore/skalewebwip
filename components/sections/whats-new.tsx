'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Post = {
  id?: string;
  title?: string;
  category?: string;
  imageUrl?: string | null;
  link?: string;
};

type WhatsNewProps = {
  posts: Post[];
};

export default function WhatsNew({ posts = [] }: WhatsNewProps) {
  if (posts.length === 0) {
    return (
        <section id="news" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                    What's New with SKALE
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Could not load latest posts. Please visit our blog to read the latest news.
                </p>
                <div className="mt-8">
                    <Link href="https://skale.space/blog" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Visit Blog
                    </Link>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section id="news" className="py-16 sm:py-24 bg-background" aria-labelledby="whats-new-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="whats-new-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-primary text-center">
          What's New with SKALE
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
          Stay updated with the latest news, partnerships, and technology advancements from the SKALE ecosystem.
        </p>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {posts.map((item, index) => (
                  <CarouselItem key={item.id || index} className="md:basis-1/2 lg:basis-1/3">
                    <article className="p-1 h-full">
                      <Link 
                        href={item.link || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                        aria-label={`Read article: ${item.title} (opens in new tab)`}
                      >
                        <Card className="overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl h-full flex flex-col">
                          <CardContent className="p-0 flex-1 flex flex-col">
                             <div className="relative w-full h-48 bg-muted overflow-hidden" aria-hidden="true">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint="blog post"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <Image 
                                            src={`https://picsum.photos/seed/${item.id || index}/600/400`} 
                                            alt=""
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="group-hover:scale-105 transition-transform duration-300"
                                            data-ai-hint="blog post abstract"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                              <Badge variant="secondary" className="mb-2 self-start" aria-label={`Category: ${item.category}`}>{item.category}</Badge>
                              <h3 className="font-semibold text-lg text-primary flex-grow">
                                {item.title}
                              </h3>
                              <div className="mt-4 flex items-center text-sm font-medium text-accent" aria-hidden="true">
                                Read More
                                <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </article>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
