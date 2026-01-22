'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Props = {
  /**
   * Video path under /public, e.g. "/Videos/Testimonial.mp4"
   */
  src?: string;
  /**
   * localStorage key to control frequency.
   */
  storageKey?: string;
  /**
   * Only show modal on these pathnames. Default: ['/']
   */
  showOnPaths?: string[];
  /**
   * Delay before showing (ms) after initial mount. Default: 700
   */
  showDelayMs?: number;
};

export default function TestimonialVideoModal({
  src = '/Videos/Testimonial.mp4',
  storageKey = 'ambika:testimonialModal:v1',
  showOnPaths = ['/'],
  showDelayMs = 700,
}: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const close = React.useCallback(() => {
    setIsOpen(false);
    // Keep the experience clean: once the visitor closes it, don't show again.
    try {
      localStorage.setItem(storageKey, 'hide');
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  React.useEffect(() => {
    if (!showOnPaths.includes(pathname)) return;

    try {
      if (localStorage.getItem(storageKey) === 'hide') return;
    } catch {
      // ignore storage errors
    }

    const t = window.setTimeout(() => setIsOpen(true), showDelayMs);
    return () => window.clearTimeout(t);
  }, [pathname, showDelayMs, showOnPaths, storageKey]);

  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  React.useEffect(() => {
    if (!isOpen) return;
    // Attempt autoplay (muted) when the modal opens
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    const p = el.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy truncate">Doctor Testimonial</p>
            <p className="text-xs text-gray-500 truncate">See what healthcare professionals say</p>
          </div>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close testimonial video">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-black flex-1">
          <div className="w-full h-[62vh] sm:h-auto sm:aspect-video">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              src={src}
              autoPlay
              muted
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

