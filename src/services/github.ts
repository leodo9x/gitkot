const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepository {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export interface SearchResponse {
  total_count: number;
  items: GitHubRepository[];
}

export type SearchCriteria = {
  stars: string;
  timeframe?: string;
};

export const SEARCH_CRITERIAS: SearchCriteria[] = [
  { stars: '>1000' },
  { stars: '>5000' },
  { stars: '>10000' },
  { stars: '>1000', timeframe: 'created:>2024-02-24' }, // last month
  { stars: '>1000', timeframe: 'created:>2024-03-17' }, // last week
];

export class GitHubService {
  private buildSearchQuery(criteria: SearchCriteria): string {
    const parts = [`stars:${criteria.stars}`];
    if (criteria.timeframe) {
      parts.push(criteria.timeframe);
    }
    return parts.join(' ');
  }

  async searchRepositories(
    criteria: SearchCriteria,
    page: number
  ): Promise<SearchResponse> {
    // GitHub only allows access to first 1000 results
    if (page > 100) {
      throw new Error('Only first 1000 results are available');
    }

    const query = this.buildSearchQuery(criteria);
    const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(
      query
    )}&sort=stars&order=desc&page=${page}&per_page=10`;

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
}

export const githubService = new GitHubService();
