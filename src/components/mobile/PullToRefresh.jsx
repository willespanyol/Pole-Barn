import { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * Pull-to-refresh wrapper for scrollable content.
 * onRefresh should return a Promise.
 */
export default function PullToRefresh({ onRefresh, children, className = '' }) {
  const [pulling, setPulling] = useState(false);
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const containerRef = useRef(null);
  const THRESHOLD = 70;

  const handleTouchStart = useCallback((e) => {
    const el = containerRef.current;
    if (el && el.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (startY.current === null || refreshing) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) {
      e.preventDefault();
      setPulling(true);
      setDistance(Math.min(dy * 0.5, THRESHOLD + 20));
    }
  }, [refreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (distance >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setDistance(THRESHOLD);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
    setPulling(false);
    setDistance(0);
    startY.current = null;
  }, [distance, refreshing, onRefresh]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Pull indicator */}
      {(pulling || refreshing) && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 z-10"
          style={{ height: `${distance}px` }}
        >
          <div className={`w-8 h-8 bg-yellow rounded-full flex items-center justify-center shadow-md ${refreshing ? 'animate-spin' : ''}`}
            style={{ transform: !refreshing ? `rotate(${(distance / THRESHOLD) * 180}deg)` : 'none' }}>
            <RefreshCw size={14} className="text-navy" />
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${pulling || refreshing ? distance : 0}px)`, transition: pulling ? 'none' : 'transform 0.3s ease' }}
      >
        {children}
      </div>
    </div>
  );
}