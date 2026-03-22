'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
];

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <span className="text-2xl">🤖</span>
            <span className="gradient-text">My AI Portfolio</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-800/50 pt-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}