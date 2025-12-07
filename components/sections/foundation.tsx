import { Button } from "@/components/ui/button";
import AnimatedNode from "@/components/ui/animated-node";
import Link from "next/link";

export default function Foundation() {
  return (
    <section id="foundation" className="bg-muted/50 py-12 sm:py-16" aria-labelledby="foundation-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 id="foundation-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Privacy &amp; Performance
              <span className="block">A Foundation for Agents</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              SKALE provides a purpose-built environment for AI agents to thrive onchain, offering unparalleled privacy, performance, and economic models.
            </p>
            <Button asChild size="lg" className="mt-8 transition-transform duration-300 hover:scale-105">
              <Link href="https://docs.skale.space/" target="_blank" rel="noopener noreferrer" aria-label="Deploy your Agent (opens in new tab)">
                Deploy your Agent
              </Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2 flex items-center justify-center min-h-[350px] lg:min-h-0" aria-hidden="true">
             <AnimatedNode />
          </div>
        </div>
      </div>
    </section>
  );
}
