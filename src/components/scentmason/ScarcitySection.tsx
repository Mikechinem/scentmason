// components/ScarcitySection.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';


export default function ScarcitySection() {
  // 1. Initialize at 14 to match the SSR layout and prevent hydration mismatch
  const [count, setCount] = useState(14);
  const [isMounted, setIsMounted] = useState(false);

  // 2. Safely sync with localStorage only after mounting on the client
  useEffect(() => {
    setIsMounted(true);
    
    try {
      // 💡 Everything inside here is monitored for mobile browser crashes
      const storedCount = localStorage.getItem('scarcity_count_sm');
      
      if (storedCount) {
        const parsed = Number(storedCount);
        // Safety check: if it already dropped to our floor, keep it there
        setCount(parsed > 2 ? parsed : 3);
      } else {
        localStorage.setItem('scarcity_count_sm', '14');
      }
    } catch (error) {
      // If a mobile browser blocks localStorage, fail gracefully 
      // and let the default state (14) handle the UI.
      console.warn("Storage blocked by browser profile:", error);
    }
  }, []);

  // 3. Real-time simulation ticker
  useEffect(() => {
    // Stop counting down if we haven't mounted or if we hit a baseline floor (e.g., 3 sets left)
    // We never want it to show 0, otherwise they can't order!
    if (!isMounted || count <= 3) return;

    // Generates a random interval between 25 and 65 seconds to look completely organic
    const randomInterval = Math.floor(Math.random() * (65000 - 25000 + 1)) + 25000;

    const timer = setTimeout(() => {
      setCount((prevCount) => {
        const nextCount = prevCount - 1;
        
        try {
          // 💡 Wrap just the localStorage engine in the try block
          localStorage.setItem('scarcity_count_sm', String(nextCount));
        } catch (e) {
          // Fails completely silently if the user is in a restricted mobile webview
          console.warn("Ticker update blocked by browser profile:", e);
        }
        
        return nextCount;
      });
    }, randomInterval);

    return () => clearTimeout(timer);
  }, [count, isMounted]);

  // 4. Hydration Guard: Prevents the server/client mismatch that causes local and mobile loading locks
  if (!isMounted) {
    return (
      <div className="w-full max-w-2xl mx-auto my-6 px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0 mt-1 relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>

            <div className="flex-1">
              <h4 className="text-base font-bold tracking-wide uppercase text-amber-900 mb-2">
                Current Batch Availability Notice
              </h4>
              <p className="text-gray-700 text-base leading-relaxed sm:text-lg">
                We only import <span className="font-semibold text-gray-900">ScentMason</span> in small, premium batches to maintain quality.{' '}
                <span className="inline-flex items-center bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded transition-all duration-300 min-w-[105px] justify-center">
                  Only 14 sets remain
                </span>{' '}
                from our current shipment at this current promo price.
              </p>
              <div className="mt-3 pt-3 border-t border-amber-200/60 text-sm text-amber-950 sm:text-base">
                Once these 14 sets sell out, the next batch will be priced at{' '}
                <span className="font-bold underline text-red-700">₦45,000</span> due to rising international freight costs. Lock in your discount below while stocks last today.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Active Client Return (Preserving all your original fonts, styles, and values)
  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3.5">
          {/* Pulsing Alert Indicator */}
          <div className="flex-shrink-0 mt-1 relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>

          <div className="flex-1">
  <h4 className="text-base font-bold tracking-wide uppercase text-amber-900 mb-2 text-center">
    Current Batch Availability Notice
  </h4>
            
            <p className="text-gray-700 text-base leading-relaxed sm:text-lg">
              We only import <span className="font-semibold text-gray-900">The Fragrance Machine</span> in small, premium batches to maintain quality.{' '}
              <span className="inline-flex items-center bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded transition-all duration-300 min-w-[105px] justify-center">
                Only {count} sets remain
              </span>{' '}
              from our current shipment at this current promo price.
            </p>
            
            <div className="mt-3 pt-3 border-t border-amber-200/60 text-sm text-amber-950 sm:text-base">
              Once these {count} sets sell out, the next batch will be priced at{' '}
              <span className="font-bold underline text-red-700">₦45,000</span> due to rising international freight costs. Lock in your discount below while stocks last today.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}