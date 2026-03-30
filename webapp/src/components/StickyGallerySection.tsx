'use client';

import dynamic from 'next/dynamic';

const StickyScrollGallery = dynamic(
  () => import('@/components/ui/sticky-scroll'),
  { ssr: false }
);

export default function StickyGallerySection() {
  return <StickyScrollGallery />;
}
