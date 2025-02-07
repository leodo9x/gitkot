import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import {
  MAX_PAGES,
  SEARCH_CRITERIAS,
  fetchRepositoriesPage,
  SearchCriteria,
  SearchResponse,
} from '../lib/github';
import { Repository } from '../components/RepositoryCard';

const SEEN_STORAGE_KEY = 'github_seen_repositories';

interface SeenRepositories {
  [key: string]: {
    seenPages: Set<number>;
    totalPages: number | null;
    exhausted: boolean;
  };
}

interface PageParam {
  criteria: SearchCriteria;
  page: number;
}

interface QueryResponse extends SearchResponse {
  nextPage: PageParam;
  items: Array<Repository & { searchCriteria: string }>;
}

export function useGitHub() {
  const seenRef = useRef<SeenRepositories>({});

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

  const getNextSearchParams = useCallback((seen: SeenRepositories) => {
    const availableCriterias = SEARCH_CRITERIAS.filter(
      (criteria) => !seen[JSON.stringify(criteria)]?.exhausted
    );

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

    const effectiveTotalPages = Math.min(seenData.totalPages, MAX_PAGES);

    for (let page = 1; page <= effectiveTotalPages; page++) {
      if (!seenData.seenPages.has(page)) {
        return { criteria, page };
      }
    }

    seenData.exhausted = true;
    seen[criteriaKey] = seenData;
    saveSeenRepositories(seen);
    return getNextSearchParams(seen);
  }, []);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, refetch, error } =
    useInfiniteQuery<QueryResponse, Error>({
      queryKey: ['repositories'],
      initialPageParam: null as PageParam | null,
      queryFn: async ({ pageParam = null }) => {
        const seen = (seenRef.current = loadSeenRepositories());
        const { criteria, page } = (pageParam ||
          getNextSearchParams(seen)) as PageParam;
        const criteriaKey = JSON.stringify(criteria);

        const response = await fetchRepositoriesPage({ criteria, page });

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

        return {
          ...response,
          items: response.items.map((repo) => ({
            ...repo,
            searchCriteria: criteriaKey,
          })),
          nextPage: { criteria, page: page + 1 },
        };
      },
      getNextPageParam: (lastPage: QueryResponse) => lastPage.nextPage,
      retry: (failureCount, error: Error) => {
        return (
          !error.message.includes('Rate limit exceeded') && failureCount < 3
        );
      },
    });

  const repositories =
    data?.pages.flatMap((page: QueryResponse) => page.items) ?? [];

  return {
    repositories,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    error: error ? (error as Error).message : null,
    fetchMore: () => fetchNextPage(),
    refresh: () => refetch(),
  };
}
