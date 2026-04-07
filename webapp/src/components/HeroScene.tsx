'use client';

import { useEffect } from 'react';
import UnicornScene from "unicornstudio-react/next";

export default function HeroScene() {
  useEffect(() => {
    const hideWatermark = () => {
      const containers = document.querySelectorAll('div[data-us-project]');
      let found = false;
      containers.forEach(container => {
        if (container.shadowRoot) {
          const badge = container.shadowRoot.querySelector('a');
          if (badge) badge.style.display = 'none';
          if (!container.shadowRoot.querySelector('#hide-badge-style')) {
            const style = document.createElement('style');
            style.id = 'hide-badge-style';
            style.textContent = 'a { display: none !important; }';
            container.shadowRoot.appendChild(style);
            found = true;
          }
        }
      });
      if (found) clearInterval(interval);
    };

    const interval = setInterval(hideWatermark, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
      <UnicornScene
        projectId="YX0YZUHYkauhAiBIasLL"
        width="100%"
        height="100%"
        production={true}
      />
    </div>
  );
}
