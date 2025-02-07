import { useCallback, useEffect, useState } from 'react';
import { Repository } from '../components/RepositoryCard';
import {
  MAX_PAGES,
  SEARCH_CRITERIAS,
  searchRepositories,
} from '../services/github';
interface SeenRepositories {
  [key: string]: {
    seenPages: Set<number>;
    totalPages: number | null;
    exhausted: boolean;
  };
}

const SEEN_STORAGE_KEY = 'github_seen_repositories';

export function useGitHub() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load seen repositories from localStorage
  // we do that to avoid fetching the same repositories again
  const loadSeenRepositories = useCallback((): SeenRepositories => {
    const stored = localStorage.getItem(SEEN_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    return JSON.parse(stored, (key, value) => {
      if (key === 'seenPages') {
        return new Set(value);
      }

      return value;
    });
  }, []);

  // Save seen repositories to localStorage
  const saveSeenRepositories = useCallback((seen: SeenRepositories) => {
    localStorage.setItem(
      SEEN_STORAGE_KEY,
      JSON.stringify(seen, (_, value) => {
        if (value instanceof Set) {
          return Array.from(value);
        }

        return value;
      })
    );
  }, []);

  // Get random search criteria and page
  const getRandomSearchParams = useCallback((seen: SeenRepositories) => {
    const availableCriterias = SEARCH_CRITERIAS.filter(
      (criteria) => !seen[JSON.stringify(criteria)]?.exhausted
    );

    // Reset seen repositories if all criterias are exhausted
    if (availableCriterias.length === 0) {
      localStorage.removeItem(SEEN_STORAGE_KEY);
      return {
        criteria: SEARCH_CRITERIAS[0],
        page: 1,
      };
    }

    const criteria =
      availableCriterias[Math.floor(Math.random() * availableCriterias.length)];
    const criteriaKey = JSON.stringify(criteria);
    const seenData = seen[criteriaKey];

    if (!seenData?.totalPages) {
      return { criteria, page: 1 };
    }

    // Ensure we don't exceed GitHub's limit
    const effectiveTotalPages = Math.min(seenData.totalPages, MAX_PAGES);

    let page;
    let attempts = 0;
    const maxAttempts = effectiveTotalPages; // Prevent infinite loop

    do {
      page = Math.floor(Math.random() * effectiveTotalPages) + 1;
      attempts++;

      // If we've tried too many times, move to next criteria
      if (attempts >= maxAttempts) {
        seenData.exhausted = true;
        seen[criteriaKey] = seenData;
        saveSeenRepositories(seen);
        return getRandomSearchParams(seen); // Recursively try next criteria
      }
    } while (seenData.seenPages.has(page));

    return { criteria, page };
  }, []);

  // Fetch repositories
  const fetchRepositories = useCallback(
    async (isInitial: boolean = false) => {
      try {
        const seen = loadSeenRepositories();
        const { criteria, page } = getRandomSearchParams(seen);
        const criteriaKey = JSON.stringify(criteria);

        const response = await searchRepositories(criteria, page);

        // Update seen pages
        const totalPages = Math.min(
          Math.ceil(response.total_count / 10),
          MAX_PAGES
        );

        const seenData = seen[criteriaKey] || {
          seenPages: new Set(),
          totalPages,
          exhausted: false,
        };

        seenData.seenPages.add(page);
        seenData.exhausted = seenData.seenPages.size >= totalPages;
        seen[criteriaKey] = seenData;

        saveSeenRepositories(seen);

        // Update repositories
        const newRepositories = response.items.map((repo) => ({
          ...repo,
          searchCriteria: criteriaKey,
        }));

        setRepositories((prev) =>
          isInitial ? newRepositories : [...prev, ...newRepositories]
        );
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);

        // If we hit the rate limit, stop fetching more
        if (errorMessage.includes('Rate limit exceeded')) {
          setIsFetchingMore(false);
        } else {
          // For other errors, try again with different criteria
          await fetchRepositories(isInitial);
        }
      } finally {
        setIsLoading(false);
        if (!error?.includes('Rate limit exceeded')) {
          setIsFetchingMore(false);
        }
      }
    },
    [loadSeenRepositories, getRandomSearchParams, saveSeenRepositories, error]
  );

  useEffect(() => {
    if (repositories.length === 0) {
      fetchRepositories(true);
    }
  }, [repositories.length, fetchRepositories]);

  return {
    repositories,
    isLoading,
    isFetchingMore,
    error,
    fetchMore: () => {
      setIsFetchingMore(true);
      fetchRepositories(false);
    },
    refresh: () => {
      setIsLoading(true);
      fetchRepositories(true);
    },
  };
}
