import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  isLoading?: boolean;
  remainingItemsThreshold?: number;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const { onLoadMore, isLoading = false, remainingItemsThreshold = 3 } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(isLoading);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  const setupSentinel = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    sentinelRef.current?.remove();

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.visibility = 'hidden';
    containerRef.current.appendChild(sentinel);
    sentinelRef.current = sentinel;

    observerRef.current?.observe(sentinel);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // If the sentinel is intersecting and the data is not loading, load more
        if (entry.isIntersecting && !loadingRef.current) {
          onLoadMore();
        }
      },
      {
        root: containerRef.current,
        rootMargin: `${remainingItemsThreshold * 100}px`,
      }
    );

    observerRef.current = observer;
    setupSentinel();

    return () => {
      observer.disconnect();
      sentinelRef.current?.remove();
    };
  }, [onLoadMore, remainingItemsThreshold, setupSentinel]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (!loadingRef.current) {
        setupSentinel();
      }
    });

    observer.observe(containerRef.current, { childList: true });
    return () => observer.disconnect();
  }, [setupSentinel]);

  return containerRef;
}
