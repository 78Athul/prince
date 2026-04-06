import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen py-16 px-6 bg-background flex flex-col items-center justify-center">
      
      {/* Return Home Button */}
      <Link href="/" className="absolute top-10 left-10 text-foreground/50 hover:text-foreground transition-colors hidden md:flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span className="font-sans font-bold text-[10px] uppercase tracking-widest">Return</span>
      </Link>

      <div className="w-full max-w-sm flex flex-col items-center">
        
        <h1 className="font-display text-[3rem] md:text-[4rem] text-foreground tracking-tighter uppercase mb-2 leading-none text-center">
          PORTAL
        </h1>
        <p className="font-sans text-xs text-muted uppercase tracking-[0.3em] text-center mb-16">
          AUTHORIZED ACCESS ONLY
        </p>

        <form className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2 relative">
            <label className="font-sans font-bold text-[10px] tracking-widest text-foreground uppercase" htmlFor="email">
              Email
            </label>
            <input 
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-dark-bg/20 py-4 px-0 text-foreground font-sans text-sm outline-none focus:border-foreground transition-all placeholder:text-muted/30 rounded-none focus:ring-0" 
              id="email" 
              name="email" 
              type="email" 
              placeholder="curator@gallery.studio"
              required 
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="font-sans font-bold text-[10px] tracking-widest text-foreground uppercase" htmlFor="password">
              Password
            </label>
            <input 
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-dark-bg/20 py-4 px-0 text-foreground font-sans text-sm outline-none focus:border-foreground transition-all placeholder:text-muted/30 rounded-none focus:ring-0" 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required 
            />
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <button formAction={login} className="w-full bg-foreground text-background font-sans font-bold text-xs tracking-[0.2em] py-5 uppercase hover:bg-dark-bg hover:text-dark-text transition-colors duration-300">
              Log In
            </button>
          </div>
        </form>
        
        <p className="font-sans text-xs text-muted/50 mt-16 text-center">
          Secured by Supabase Identity
        </p>

      </div>
    </main>
  )
}
