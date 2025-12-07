'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { socialLinks } from '@/lib/social-links';

const TwitterIcon = socialLinks.find(social => social.label === 'X')?.icon || (() => null);

const navLinks = [
  { href: 'https://blog.skale.space', label: 'News' },
  { href: 'https://portal.skale.space/', label: 'Ecosystem' },
  { href: '/research', label: 'Research' },
  { href: 'https://docs.skale.space/welcome/get-started', label: 'Developers' },
];


const NavLink = ({ item, isMobile, closeMenu }: { item: any, isMobile: boolean, closeMenu?: () => void }) => {
    const isExternal = item.href.startsWith('http');
    return (
      <Link
        href={item.href}
        onClick={closeMenu}
        className={cn(
          "text-sm font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
          "hover:text-gray-500",
          isMobile ? 'text-lg px-4 py-2' : 'text-sm'
        )}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={isExternal ? `${item.label} (opens in new tab)` : item.label}
      >
        {item.label}
      </Link>
    );
};


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      // Trap focus in mobile menu
      const firstFocusable = document.querySelector<HTMLElement>('nav[aria-label="Mobile navigation"] a, nav[aria-label="Mobile navigation"] button');
      firstFocusable?.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-sm border-b'
            : 'bg-background'
        )}
        role="banner"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-1">
            <Link href="/" className="flex-shrink-0" aria-label="SKALE Network Home">
                <Logo />
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink key={link.label || link.href} item={link} isMobile={false} />
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-3 flex-1 justify-end">
             <div className="hidden md:flex items-center space-x-2" role="list" aria-label="Social links">
                {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" target="_blank" rel="noopener noreferrer" role="listitem">
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
                ))}
            </div>
            <Button asChild>
                <Link href="https://portal.skale.space/staking" target="_blank" rel="noopener noreferrer">Stake SKL</Link>
            </Button>
            <div className="md:hidden">
                <Button 
                  onClick={toggleMenu} 
                  variant="ghost" 
                  size="icon"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                {isMenuOpen ? <TwitterIcon className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
                </Button>
            </div>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <nav className="flex flex-col items-center space-y-2 py-6" aria-label="Mobile navigation">
              <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
              {navLinks.map((link) => (
                <NavLink key={link.label || link.href} item={link} isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
              ))}
               <div className="flex items-center space-x-6 pt-4" role="list" aria-label="Social links">
                 {socialLinks.map((social) => (
                  <Link key={social.label} href={social.href} aria-label={social.label} className="text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" target="_blank" rel="noopener noreferrer" role="listitem">
                    <social.icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

