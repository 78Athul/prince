import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <>
      {/* MOBILE VIEW (Stitch) */}
      <div className="md:hidden">
        <main className="min-h-screen flex flex-col justify-between px-8 py-16 bg-surface relative z-10">
          <div className="flex flex-col items-center mt-12">
            <h1 className="font-display text-[4rem] leading-none tracking-tighter text-on-surface uppercase mb-2">
              GALLERY
            </h1>
            <p className="font-headline text-primary-fixed-dim tracking-[0.3em] text-sm uppercase">
              ACCESS
            </p>
          </div>
          <div className="flex-grow flex flex-col justify-center space-y-12">
            <form className="space-y-8">
              <div className="space-y-8">
                <div className="relative">
                  <label className="block font-label text-[10px] tracking-[0.2em] text-on-tertiary-container mb-1 uppercase" htmlFor="mobile-email">
                    EMAIL
                  </label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface font-body font-light placeholder:text-on-surface-variant/20 transition-all duration-400 focus:border-primary-fixed-dim rounded-none outline-none focus:ring-0" id="mobile-email" name="email" placeholder="curator@gallery.studio" type="email" required />
                </div>
                <div className="relative">
                  <label className="block font-label text-[10px] tracking-[0.2em] text-on-tertiary-container mb-1 uppercase" htmlFor="mobile-password">
                    PASSWORD
                  </label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface font-body font-light placeholder:text-on-surface-variant/20 transition-all duration-400 focus:border-primary-fixed-dim rounded-none outline-none focus:ring-0" id="mobile-password" name="password" placeholder="••••••••" type="password" required />
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <button formAction={login} className="w-full bg-primary-container text-on-primary font-label font-bold text-xs tracking-[0.2em] py-5 uppercase transition-all duration-400 hover:bg-primary active:scale-[0.98]">
                    LOG IN
                </button>
                <button formAction={signup} className="w-full border border-outline-variant/20 text-primary font-label font-bold text-xs tracking-[0.2em] py-5 uppercase transition-all duration-400 hover:bg-surface-container-low active:scale-[0.98]">
                    SIGN UP
                </button>
              </div>
            </form>
          </div>
          <div className="mt-16 text-center">
            <p className="font-label text-[10px] text-on-surface-variant/40 tracking-wider">
              © 2024 GALLERY STUDIO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </main>
        {/* Ambient orbs */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-surface-container-high/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed-dim/5 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-surface px-6">
        <div className="w-full max-w-md bg-surface-container-low p-8 shadow-[0_0_100px_rgba(221,229,220,0.02)]">
        <h2 className="font-display text-4xl mb-8 uppercase text-center text-primary tracking-wide">Access</h2>
        
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label text-xs uppercase tracking-[0.2em] text-outline" htmlFor="email">Email</label>
            <input 
              className="bg-surface-container border border-outline-variant/30 text-on-surface p-4 font-body text-sm focus:border-primary focus:bg-surface-dim outline-none transition-colors" 
              id="email" 
              name="email" 
              type="email" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-xs uppercase tracking-[0.2em] text-outline" htmlFor="password">Password</label>
            <input 
              className="bg-surface-container border border-outline-variant/30 text-on-surface p-4 font-body text-sm focus:border-primary focus:bg-surface-dim outline-none transition-colors" 
              id="password" 
              name="password" 
              type="password" 
              required 
            />
          </div>
          
          <div className="flex flex-col gap-4 mt-6">
            <button formAction={login} className="w-full bg-on-background text-background font-label uppercase tracking-widest py-4 text-xs hover:bg-primary transition-all active:scale-[0.98]">
              Log In
            </button>
            <button formAction={signup} className="w-full border border-outline-variant/50 text-on-surface font-label uppercase tracking-widest py-4 text-xs hover:border-primary hover:bg-surface-container transition-all active:scale-[0.98]">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
