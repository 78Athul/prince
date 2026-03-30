import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
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
  )
}
