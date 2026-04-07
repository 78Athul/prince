/**
 * MasonryGallery - A high-performance, GSAP-powered Masonry layout component.
 */
'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const match = queries.findIndex(q => window.matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  if (typeof window === 'undefined') return;
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new window.Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  height: number;
  title: string;
  price: number;
  isLimited: boolean;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryGalleryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  className?: string;
  itemClassName?: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true,
  className,
  itemClassName
}) => {
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)', '(min-width: 400px)'],
    [4, 3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as any;
    }

    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return {
        x: containerRect.width / 2 - item.w / 2,
        y: containerRect.height / 2 - item.h / 2
      };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 48; // Space between columns and items 
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      
      // Determine interior image height, plus buffer for text and buttons below (approx 180px)
      const imageHeight = (child.height / 400) * columnWidth; 
      const totalItemHeight = imageHeight + 160; 

      const y = colHeights[col];
      colHeights[col] += totalItemHeight + gap;
      return { ...child, x, y, w: columnWidth, h: totalItemHeight, imageH: imageHeight };
    });

    return { grid: gridItems as any, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item: any, index: number) => {
      const element = document.querySelector(`[data-key="${item.id}"]`);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(20px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 1.2,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(element, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    if (grid.length > 0) hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ height: containerHeight, minHeight: '400px' }}
    >
      {grid.map((item: any) => (
        <div
          key={item.id}
          data-key={item.id}
          className={cn(
            'absolute overflow-visible flex flex-col group', // Need visible overflow for scale effects
            itemClassName
          )}
          style={{ willChange: 'transform, width, height, opacity, filter' }}
        >
          {/* Image Block */}
          <Link href={`/prints/${item.id}`} className="block w-full" style={{ height: item.imageH }}>
            <div className="w-full h-full relative overflow-hidden bg-surface-container cursor-pointer mb-6">
              <Image 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw" 
                alt={item.title} 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                src={item.img} 
                priority
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>
          
          {/* Metadata Block */}
          <div className="flex flex-col flex-1 pb-4">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/prints/${item.id}`} className="hover:text-primary transition-colors">
                <h3 className="font-headline text-2xl">{item.title}</h3>
              </Link>
              {item.isLimited && <span className="font-label text-xs tracking-widest text-primary pt-2">LIMITED</span>}
            </div>
            <p className="font-label text-[10px] tracking-[0.1em] text-outline uppercase mb-4">Unframed | Walnut | Matte Black</p>
            
            <AddToCartButton
              item={{
                id: item.id,
                title: item.title,
                price: item.price,
                imageUrl: item.img,
                isLimited: item.isLimited,
                frame: 'Unframed | Walnut | Matte Black',
              }}
              className="mt-auto" // push bottom
            />
          </div>

        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
