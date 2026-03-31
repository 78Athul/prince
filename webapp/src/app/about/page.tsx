import NavBar from '@/components/NavBar'
import Link from 'next/link'

export const metadata = {
  title: 'About | Gallery Print Shop',
  description: 'Learn about our process, expertise, and commitment to museum-grade archival photography prints.',
}

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <main className="relative pt-32 min-h-screen">
        {/* Ambient Orbs */}
        <div className="fixed top-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[120px] opacity-[0.05] pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-[0.03] pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto">
          <p className="font-label uppercase tracking-[0.3em] text-primary text-sm mb-6">Prince Augustine Joseph</p>
          <h1 className="font-display text-[10vw] md:text-[8vw] leading-[0.85] uppercase tracking-[-0.05em] mb-12">
            Capturing the
            <br />
            <span className="text-outline">Untamed</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start mt-24">
            
            <div className="aspect-[3/4] overflow-hidden bg-surface-container relative">
              <img 
                src="/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM (1).jpeg" 
                alt="Prince Augustine Joseph wildlife photography journey" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            </div>

            <div className="flex flex-col gap-12 pt-8">
              <div className="flex flex-col gap-6">
                <h2 className="font-headline text-3xl md:text-4xl">Vision & Artistry</h2>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Prince Augustine Joseph is an emerging wildlife photographer with a profound dedication to documenting the raw, intricate beauty of the natural world. Based in the heart of the Illinois birding community, Prince has become known for his ability to transform fleeting moments into dramatic, high-detail portraits that bridge the gap between the observer and the wild.
                </p>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  His work is defined by a signature &quot;piercing stare&quot;—a mastery of close-up bird photography that emphasizes the soul of the subject. From the delicate, iridescent textures of a songbird&apos;s feathers to the powerful gaze of a raptor in mid-hunt, his portfolio is a study in clarity and atmosphere. He is particularly drawn to the transformative power of light, frequently shooting during the golden hour to capture the warm, ethereal glow of the sun, or utilizing low-angle perspectives to produce serene, glass-like water reflections.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-headline text-3xl md:text-4xl">In the Field Expertise</h2>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Whether he is trekking through the dunes of Illinois Beach State Park along the Lake Michigan shoreline or documenting complex wildlife behaviors at San Joaquin Marsh, Prince utilizes professional-grade gear to bring his vision to life. His technical versatility across both Canon and Sony systems—utilizing high-performance lenses like the 600mm f/4—allows him to maintain a respectful distance from his subjects while capturing every breathtaking detail.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-headline text-3xl md:text-4xl">Community & Connection</h2>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Beyond the lens, Prince is an active contributor to the nature enthusiast community. As a frequent voice in the Illinois Birdwatchers group and a regular on Instagram, he shares not only his latest captures but also technical insights and the stories behind the shots. His work serves as a reminder of the vibrant, often hidden life thriving in our local ecosystems, inviting viewers to slow down and appreciate the dramatic beauty of the great outdoors.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Trust & Transparency Section */}
        <section className="bg-surface-container-low py-32 mt-24">
          <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl mb-16 text-center">Our Commitment to Trust</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4 items-center text-center p-8 border border-outline-variant/30 bg-surface">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="shield">shield</span>
                <h3 className="font-label uppercase tracking-widest text-sm mt-4">Secure Transactions</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  All payments are processed through bank-level encrypted gateways. We never store your full payment details on our servers.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 items-center text-center p-8 border border-outline-variant/30 bg-surface">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="verified">verified</span>
                <h3 className="font-label uppercase tracking-widest text-sm mt-4">The Gallery Guarantee</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  If your print arrives damaged or does not meet your exacting standards, our 14-day hassle-free return policy ensures you receive a full replacement or refund.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 items-center text-center p-8 border border-outline-variant/30 bg-surface">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="location_on">location_on</span>
                <h3 className="font-label uppercase tracking-widest text-sm mt-4">Transparent Contact</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  <strong>Email:</strong> sharon.augustin2@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 md:px-12 text-center max-w-[800px] mx-auto flex flex-col items-center gap-8">
          <h2 className="font-headline text-4xl md:text-6xl italic">Explore the Collection</h2>
          <p className="font-body text-on-surface-variant mb-4 text-lg">
            Experience the culmination of our technical expertise and artistic vision.
          </p>
          <Link href="/gallery" className="bg-primary text-on-primary font-label uppercase tracking-widest px-12 py-6 text-sm hover:bg-surface-tint transition-all active:scale-95 inline-block">
            ENTER THE GALLERY
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#161d18] w-full flex flex-col items-center gap-16 px-8 py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center w-full relative z-10">
          <h2 className="font-['Anton'] uppercase text-7xl md:text-[14vw] text-[#bbcac6] leading-[0.8] mb-16 tracking-tighter opacity-10">GALLERY</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-outline-variant/20">
            <span className="font-['Anton'] text-[#bbcac6] text-4xl">GALLERY</span>
            <p className="font-label text-xs tracking-widest text-[#dde5dc]/30">© 2026 GALLERY PRINT SHOP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
