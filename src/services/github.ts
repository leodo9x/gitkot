import { Repository } from '../components/RepositoryCard';

const GITHUB_API_BASE = 'https://api.github.com';

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

export type SearchCriteria = {
  stars: string;
  language?: string;
};

export const PER_PAGE = 20;
export const MAX_PAGES = 50; // GitHub's 1000 result limit with 10 items per page

export const SEARCH_CRITERIAS: SearchCriteria[] = [
  { stars: '<1000' },
  { stars: '<2000' },
  { stars: '<5000' },
  { stars: '<8000' },
  { stars: '<10000' },
  { stars: '<15000' },
  { stars: '<20000' },
  { stars: '<30000' },
  { stars: '<50000' },
  { stars: '<70000' },
  { stars: '<100000' },
  { stars: '<200000' },
  { stars: '<500000' },
  { stars: '<1000000' },
  { stars: '<2000000' },
  { stars: '<5000000' },
];

function buildSearchQuery(criteria: SearchCriteria): string {
  const parts = [`stars:${criteria.stars}`];

  if (criteria.language) {
    parts.push(`language:${criteria.language}`);
  }

  return parts.join(' ');
}

export async function searchRepositories(
  criteria: SearchCriteria,
  page: number
): Promise<SearchResponse> {
  // GitHub only allows access to first 1000 results
  if (page > MAX_PAGES) {
    throw new Error('Only first 1000 results are available');
  }

  const query = buildSearchQuery(criteria);
  const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc&page=${page}&per_page=${PER_PAGE}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (response.status === 422) {
      throw new Error('Only first 1000 search results are available');
    }

    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}
