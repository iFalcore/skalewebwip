import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { socialLinks } from '@/lib/social-links.tsx';

const footerNavLinks = [
    { href: '/', label: 'Home' },
    { href: 'https://portal.skale.space/', label: 'Ecosystem' },
    { href: 'https://docs.skale.space/welcome/get-started', label: 'Developers' },
    { href: 'https://skale.space/blog', label: 'News' },
    { href: 'https://jobs.skale.space/jobs', label: 'Careers' },
]

export default function Footer() {
  return (
    <footer className="dark bg-background text-foreground border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-start space-y-6">
          <Link href="/" aria-label="SKALE Network Home">
            <Logo className="h-16 w-auto text-white" />
          </Link>
          <div className="flex items-center space-x-4" role="list" aria-label="Social links">
             {socialLinks.map((social) => (
              <Link 
                key={social.label} 
                href={social.href} 
                aria-label={social.label} 
                className="text-muted-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" 
                target="_blank" 
                rel="noopener noreferrer"
                role="listitem"
              >
                <social.icon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between text-sm">
          <p className="text-muted-foreground mt-4 sm:mt-0">&copy; {new Date().getFullYear()} N.O.D.E. Anstalt</p>
          <nav className="flex gap-4" aria-label="Footer navigation">
            {footerNavLinks.map(link => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-muted-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" 
                  target={link.href.startsWith('http') ? '_blank' : undefined} 
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.href.startsWith('http') ? `${link.label} (opens in new tab)` : link.label}
                >
                    {link.label}
                </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

