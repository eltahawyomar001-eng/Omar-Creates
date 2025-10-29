'use client'

import * as React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { ContactSheet } from '@/app/(home)/ContactSheet';

const footerLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

const socialLinks = [
  { href: 'https://x.com/omar_create', label: 'Twitter', icon: 'X' },
  { href: 'https://github.com/eltahawyomar001-eng/Omar-Creates', label: 'GitHub', icon: 'GitHub' },
];

/**
 * Footer component - Apple-style minimal footer
 * Copyright and essential links
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t mt-auto"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-start)',
      }}
    >
      <Container>
        <div className="py-8 sm:py-12">
          {/* Main footer content */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <p
                className="text-sm tabular-nums"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                © {currentYear} Omar Creates
              </p>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-6">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center justify-center text-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md px-2 py-1"
                      style={{
                        color: 'var(--color-text-secondary)',
                        minHeight: 'var(--touch-target)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <ContactSheet>
                    <button
                      className="inline-flex items-center justify-center text-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md px-2 py-1"
                      style={{
                        color: 'var(--color-text-secondary)',
                        minHeight: 'var(--touch-target)',
                      }}
                    >
                      Contact
                    </button>
                  </ContactSheet>
                </li>
              </ul>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md p-2"
                  style={{
                    color: 'var(--color-text-secondary)',
                    minHeight: 'var(--touch-target)',
                    minWidth: 'var(--touch-target)',
                  }}
                  aria-label={link.label}
                >
                  <span className="sr-only">{link.label}</span>
                  <span aria-hidden="true">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Secondary info */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p
              className="text-xs text-center sm:text-left"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Built with Next.js, TypeScript, and Tailwind CSS.
              <br className="sm:hidden" /> All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
