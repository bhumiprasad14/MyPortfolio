'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  availableForHire?: boolean;
  availabilityText?: string;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'py-3 bg-slate-950/85 backdrop-blur-md border-b border-violet-500/20 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#home"
              className="flex items-center space-x-2.5 text-white group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-500/40 text-violet-300 font-mono font-bold text-sm group-hover:border-violet-400 group-hover:text-violet-200 transition-colors shadow-sm">
                BP
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-violet-300 transition-colors">
                  Bhumi Prasad
                </span>
                <span className="text-[10px] font-mono tracking-wider text-violet-300/70 uppercase">
                  Software Engineer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-xl bg-slate-900/60 border border-violet-500/20 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-violet-950/80 border border-violet-400/40 shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-violet-950/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button (Available badge removed as requested) */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="#contact"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-violet-500/20 transform hover:-translate-y-0.5"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-violet-500/30 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-16 z-40 p-4 lg:hidden"
          >
            <div className="rounded-2xl bg-slate-900 border border-violet-500/30 shadow-xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-violet-950/40 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-violet-500/20 flex flex-col space-y-2">
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:text-white"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                  <span>Admin Portal</span>
                </Link>

                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-xs"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
