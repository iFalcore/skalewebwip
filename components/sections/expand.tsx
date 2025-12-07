import InteractiveDiagram from "@/components/ui/interactive-diagram"

export default function Expand() {
  return (
    <section id="expand" className="py-16 sm:py-24 bg-background overflow-hidden" aria-labelledby="expand-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 id="expand-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              SKALE Expand
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              SKALE Expand v1 on Base is the first step in a multi-chain strategy to bring gas-free transactions to users everywhere. This initiative highlights SKALE's modular architecture and its ability to enhance other ecosystems.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              By connecting with chains like Base, SKALE provides developers with unparalleled flexibility and users with a seamless, cost-effective experience.
            </p>
          </div>
          <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[400px]" aria-label="SKALE Expand network diagram">
            <InteractiveDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
