"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const GalleryCounterHero = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-6 p-12 rounded-2xl bg-white/5 border border-white/10")}>
      <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Component Example</h1>
      <h2 className="text-6xl font-sans font-semibold mb-4">{count}</h2>
      <div className="flex gap-4">
        <button 
          className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-2xl font-light"
          onClick={() => setCount((prev) => prev - 1)}
        >-</button>
        <button 
          className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-2xl font-light"
          onClick={() => setCount((prev) => prev + 1)}
        >+</button>
      </div>
    </div>
  );
};
