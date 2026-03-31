// component.tsx
'use client';
import { ReactLenis } from 'lenis/react';

export default function StickyScrollGallery() {
  return (
    <ReactLenis root>
      <main className='bg-[#0e1510]'>
        <div className='wrapper'>
          <section className='text-[#dde5dc] h-screen w-full bg-[#0e1510] grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Explore The Gallery
              <br />
              Curated Fine Art Prints <br />
              Scroll down! 👇
            </h1>
          </section>
        </div>

        <section className='text-[#dde5dc] w-full bg-[#0e1510]'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='grid gap-2 col-span-4'>
              <figure className=' w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM (1).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM (2).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (1).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (2).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (3).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
            <div className='sticky top-0 h-screen w-full col-span-4 gap-2  grid grid-rows-3'>
              <figure className='w-full h-full '>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM.jpeg'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM (1).jpeg'
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full h-full '>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM (2).jpeg'
                  alt=''
                  className='transition-all duration-300 h-full w-full  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM.jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM (1).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM (2).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.19 AM.jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='/assets/photos/WhatsApp Image 2026-03-30 at 10.14.19 AM (1).jpeg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md '
                />
              </figure>
            </div>
          </div>
        </section>

        <footer className='group bg-[#0e1510]'>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-[#bbcac6] to-[#444844] bg-clip-text text-transparent transition-all ease-linear'>
            gallery
          </h1>
          <div className='bg-[#0e1510] h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </ReactLenis>
  );
}
