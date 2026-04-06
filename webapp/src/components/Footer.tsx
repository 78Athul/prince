import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-dark-text border-t border-dark-text/5 pt-24 pb-12 px-6 md:px-12 w-full mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          
          {/* Brand Summary */}
          <div className="flex flex-col gap-6 md:pr-12">
            <span className="font-display font-bold text-3xl tracking-tighter uppercase">GALLERY</span>
            <p className="font-sans text-sm text-dark-text/60 leading-relaxed">
              A sophisticated space dedicated to the curation of architectural and landscape photography. 
              Museum-grade prints for the modern collector.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-4">Explore</h4>
            <Link href="/" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Home</Link>
            <Link href="/gallery" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Gallery Collection</Link>
            <Link href="/about" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Our Philosophy</Link>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-4">Company</h4>
            <Link href="/shipping" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Shipping & Returns</Link>
            <Link href="/terms" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors">FAQ</Link>
            <Link href="/login" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors mt-4">Admin Login</Link>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-4">Connect</h4>
            <a href="mailto:contact@gallery.com" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              contact@gallery.com
            </a>
            <a href="#" className="font-sans text-sm text-dark-text/60 hover:text-dark-text transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              @gallery_prints
            </a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-dark-text/5 text-dark-text/40 font-sans text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} GALLERY PRINT SHOP.</p>
          <p>ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
