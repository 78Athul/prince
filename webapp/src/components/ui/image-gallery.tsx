'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { QuickCartButton } from '@/components/ui/QuickCartButton';
import Link from 'next/link';

export function ImageGallery({ items = [] }: { items: any[] }) {
	// Create columns distribution
	const col1: any[] = [];
	const col2: any[] = [];
	const col3: any[] = [];

	items.forEach((item, index) => {
		if (index % 3 === 0) col1.push(item);
		else if (index % 3 === 1) col2.push(item);
		else col3.push(item);
	});

	const columns = [col1, col2, col3];

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 px-4 mb-48">
			<div className="mx-auto grid w-full max-w-[1440px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
				
				{columns.map((columnData, colIndex) => (
					<div key={colIndex} className="grid gap-6 h-fit">
						{columnData.map((item, index) => {
							// Determine random or assigned aspect ratio
							// We can simulate portrait tracking via index parity
							const isPortrait = (colIndex + index) % 2 === 0;
							const ratio = isPortrait ? 4 / 5 : 1 / 1;

							return (
								<div key={item.id} className="relative group overflow-hidden bg-surface-container rounded-sm shadow-sm">
									<Link href={`/prints/${item.id}`} className="block relative">
										<AnimatedImage
											alt={item.title}
											src={item.cloudinary_url}
											ratio={ratio}
										/>
									</Link>

									{/* HOVER DETAILS PANEL */}
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
											
											{/* Metadata */}
											<div className="mb-4">
												<h3 className="font-headline text-2xl text-white tracking-tight uppercase">{item.title}</h3>
												<div className="flex items-center gap-4 mt-1">
													<p className="font-label text-sm text-white/80">${item.base_price}</p>
													{item.is_limited_edition && (
														<span className="font-label text-[10px] tracking-widest text-[#bbcac6] border border-[#bbcac6]/30 px-2 py-0.5 uppercase rounded-sm">
															Limited
														</span>
													)}
												</div>
												<p className="font-label text-[10px] tracking-[0.1em] text-white/50 uppercase mt-3">
													Unframed | Walnut | Matte Black
												</p>
											</div>

											{/* Quick Commerce Cart Widget */}
											<div className="w-full mt-4">
												<QuickCartButton 
													item={{
														id: item.id,
														title: item.title,
														price: item.base_price,
														imageUrl: item.cloudinary_url,
														isLimited: item.is_limited_edition,
														frame: 'Unframed | Walnut | Matte Black',
													}}
												/>
											</div>

										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

import Image from 'next/image';

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	placeholder?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
	return (
		<AspectRatio
			ratio={ratio}
			className="relative size-full border-none shadow-none bg-surface-container overflow-hidden"
		>
			<Image
				fill
				sizes="(max-width: 768px) 100vw, 33vw"
				alt={alt}
				src={src}
				className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
			/>
		</AspectRatio>
	);
}
