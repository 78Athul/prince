'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function NavBar() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(100);
	const { toggleCart, totalItems } = useCartStore();
	const count = totalItems();

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'Gallery', href: '/gallery' },
		{ label: 'Philosophy', href: '/about' },
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	return (
		<>
			<header
				className={cn(
					'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out flex items-center justify-between px-6 md:px-12',
					scrolled || open
						? 'h-16 bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 text-foreground shadow-sm'
						: 'h-20 bg-transparent text-white mix-blend-difference'
				)}
			>
				{/* Brand */}
				<Link href="/" className="z-50 hover:opacity-80 transition-opacity">
                    <span className="font-display font-bold text-2xl tracking-tighter uppercase">GALLERY</span>
                </Link>

				{/* Desktop Links */}
				<nav className="hidden md:flex gap-10 items-center absolute left-1/2 -translate-x-1/2">
					{links.map((link, i) => (
						<Link key={i} className="font-sans font-medium text-[14px] uppercase tracking-wide hover:opacity-70 transition-opacity duration-[120ms]" href={link.href}>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-4 z-50">
					{/* Bag / Contact Button */}
					<button
						onClick={toggleCart}
						className="hidden md:flex font-sans font-medium text-[14px] uppercase items-center gap-2 px-6 py-2 border border-current rounded-full hover:bg-foreground hover:text-background transition-colors duration-300 relative"
					>
						<span>BAG</span>
						{count > 0 && (
							<span className="font-sans font-bold">({count})</span>
						)}
					</button>

					{/* Mobile Bag Icon */}
					<div 
						className="md:hidden flex items-center cursor-pointer p-2 hover:opacity-80 transition-opacity relative"
						onClick={toggleCart}
					>
						<span className="material-symbols-outlined">shopping_bag</span>
						{count > 0 && (
							<span className="absolute top-1 right-1 bg-current text-background text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
								{count}
							</span>
						)}
					</div>

					{/* Mobile Menu Toggle */}
					<div 
						className="md:hidden flex items-center cursor-pointer p-2 hover:opacity-80 transition-opacity"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<span className="material-symbols-outlined">close</span>
						) : (
							<span className="material-symbols-outlined">menu</span>
						)}
					</div>
				</div>

				{/* Mobile Full Screen Menu */}
				<div
					className={cn(
						'md:hidden fixed left-0 w-full bg-background flex-col overflow-hidden transition-all duration-300 ease-out z-40',
						scrolled ? 'top-16 h-[calc(100vh-64px)]' : 'top-20 h-[calc(100vh-80px)]',
						open ? 'flex opacity-100' : 'hidden opacity-0 pointer-events-none'
					)}
				>
					<div className="flex flex-col h-full py-12 px-8">
						<div className="flex flex-col gap-8">
							{links.map((link) => (
								<Link
									key={link.label}
									onClick={() => setOpen(false)}
									className="font-display font-bold text-4xl uppercase tracking-tighter text-foreground hover:text-muted-light transition-colors"
									href={link.href}
								>
									{link.label}
								</Link>
							))}
						</div>
						
						<div className="mt-auto flex flex-col gap-6 pt-12 border-t border-dark-bg/10">
							<p className="font-sans text-xs tracking-widest text-muted uppercase">Connect</p>
							<div className="flex gap-6">
								<a href="#" className="font-sans text-xs tracking-widest text-foreground hover:opacity-70 transition-opacity uppercase">Instagram</a>
								<a href="#" className="font-sans text-xs tracking-widest text-foreground hover:opacity-70 transition-opacity uppercase">Contact</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
