import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  isLoading?: boolean;
  threshold?: number;
  debounceMs?: number;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const {
    onLoadMore,
    isLoading = false,
    threshold = 3,
    debounceMs = 150,
  } = props;

  const timeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (isLoading || !containerRef.current) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const totalHeight = container.scrollHeight;
      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;

      const itemHeight = containerHeight;
      const itemsFromBottom = Math.floor(
        (totalHeight - (scrollPosition + containerHeight)) / itemHeight
      );

      if (itemsFromBottom <= threshold) {
        onLoadMore();
      }
    }, debounceMs);
  }, [isLoading, onLoadMore, threshold, debounceMs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return containerRef;
}
