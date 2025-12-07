import { Button } from "@/components/ui/button"
import LogoTicker from "@/components/ui/logo-ticker"
import Link from "next/link"

export default function Cta() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-heading" className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center max-w-2xl mx-auto">
          Deploy Your Agent on SKALE
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Build with simple, powerful APIs and SDKs catered towards agents and x402 payments. The only execution environment your onchain agent needs.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4" role="group" aria-label="Call to action buttons">
          <Button
            size="lg"
            className="w-full sm:w-auto transition-colors duration-300"
            asChild
          >
            <Link href="https://docs.skale.space/welcome/get-started" target="_blank" rel="noopener noreferrer" aria-label="Start Building (opens in new tab)">
              Start Building
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto transition-all duration-300"
            asChild
          >
            <Link href="https://form.typeform.com/to/sd38Fy?utm_source=website&typeform-source=skale.space" target="_blank" rel="noopener noreferrer" aria-label="Get in Touch (opens in new tab)">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
      <LogoTicker />
    </section>
  )
}