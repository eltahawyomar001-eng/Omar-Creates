'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoOC } from './LogoOC';
import { Container } from './Container';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/experiments', label: 'Experiments' },
  { href: '/privacy', label: 'Privacy' },
];

/**
 * Header component - Sticky navigation
 * Logo on left, nav links on right
 * Minimum 44px touch targets for accessibility
 */
export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'border-b border-white/10 backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
      style={{
        backgroundColor: isScrolled
          ? 'rgba(11, 13, 16, 0.8)'
          : 'transparent',
      }}
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md p-2 -ml-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              minHeight: 'var(--touch-target)',
              color: 'var(--color-text)',
            }}
          >
            <LogoOC width={32} height={32} />
            <span className="font-semibold text-lg tracking-tight">
              Omar Creates
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                      'hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      isActive ? 'text-accent' : 'text-secondary'
                    )}
                    style={{
                      minHeight: 'var(--touch-target)',
                      minWidth: 'var(--touch-target)',
                      color: isActive
                        ? 'var(--color-accent)'
                        : 'var(--color-text-secondary)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
