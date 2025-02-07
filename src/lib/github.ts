import { Repository } from '../components/RepositoryCard';
import {
  InvalidTokenError,
  OnlyFirst1000ResultsError,
  RateLimitExceededError,
} from './errors';

const GITHUB_API_BASE = 'https://api.github.com';

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

export type SearchCriteria = {
  stars: string;
  language?: string;
};

export const PER_PAGE = 10;
export const MAX_PAGES = 100; // GitHub's 1000 result limit with 10 items per page

// search criteria in steps of 2000 i.e.
// [700...2000, 2000...4000, 4000...6000, 6000...8000]
export const SEARCH_CRITERIAS: SearchCriteria[] = (() => {
  const criterias: SearchCriteria[] = [];

  criterias.push({ stars: '700...2000' });

  for (let i = 2000; i < 50000; i += 2000) {
    criterias.push({
      stars: `${i}...${i + 2000}`,
    });
  }

  criterias.push({ stars: '>50000' });

  return criterias;
})();

function buildSearchQuery(criteria: SearchCriteria): string {
  const parts = [`stars:${criteria.stars}`];

  if (criteria.language) {
    parts.push(`language:${criteria.language}`);
  }

  return parts.join(' ');
}

export interface FetchRepositoriesParams {
  criteria: SearchCriteria;
  page: number;
}

export async function fetchRepositoriesPage(
  { criteria, page }: FetchRepositoriesParams,
  token?: string
): Promise<SearchResponse> {
  // GitHub only allows access to first 1000 results
  if (page > MAX_PAGES) {
    throw new Error('Only first 1000 results are available');
  }

  const query = buildSearchQuery(criteria);
  const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc&page=${page}&per_page=${PER_PAGE}`;

  const response = await fetch(
    url,
    token
      ? {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      : undefined
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new RateLimitExceededError(
        'Rate limit exceeded. Please try again later.'
      );
    }

    if (response.status === 422) {
      throw new OnlyFirst1000ResultsError(
        'Only first 1000 search results are available'
      );
    }

    if (response.status === 401) {
      throw new InvalidTokenError('Invalid token. Please try again.');
    }

    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}
