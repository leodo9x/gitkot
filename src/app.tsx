// Repository type definitions
type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
};

type Owner = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  [key: string]: any; // for other properties
};

type Repository = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  topics: string[];
  license: License;
  visibility: string;
  [key: string]: any; // for other properties
};

// Example repository data
const repository: Repository = {
  id: 927022202,
  node_id: 'R_kgDON0E8eg',
  name: 'MEV-BOT-Ethereum',
  full_name: 'Shenovrtre/MEV-BOT-Ethereum',
  private: false,
  owner: {
    login: 'Shenovrtre',
    id: 197475464,
    node_id: 'U_kgDOC8U8iA',
    avatar_url: 'https://avatars.githubusercontent.com/u/197475464?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Shenovrtre',
    html_url: 'https://github.com/Shenovrtre',
    followers_url: 'https://api.github.com/users/Shenovrtre/followers',
    following_url:
      'https://api.github.com/users/Shenovrtre/following{/other_user}',
    gists_url: 'https://api.github.com/users/Shenovrtre/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/Shenovrtre/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Shenovrtre/subscriptions',
    organizations_url: 'https://api.github.com/users/Shenovrtre/orgs',
    repos_url: 'https://api.github.com/users/Shenovrtre/repos',
    events_url: 'https://api.github.com/users/Shenovrtre/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/Shenovrtre/received_events',
    type: 'User',
    user_view_type: 'public',
    site_admin: false,
  },
  html_url: 'https://github.com/Shenovrtre/MEV-BOT-Ethereum',
  description:
    '🔰 A JavaScript-based Ethereum trading bot with local execution, advanced configurations, and DEX (MEV-Bot) integration for automated and reliable trading.',
  fork: false,
  url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum',
  forks_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/forks',
  keys_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/keys{/key_id}',
  collaborators_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/collaborators{/collaborator}',
  teams_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/teams',
  hooks_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/hooks',
  issue_events_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/issues/events{/number}',
  events_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/events',
  assignees_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/assignees{/user}',
  branches_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/branches{/branch}',
  tags_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/tags',
  blobs_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/git/blobs{/sha}',
  git_tags_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/git/tags{/sha}',
  git_refs_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/git/refs{/sha}',
  trees_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/git/trees{/sha}',
  statuses_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/statuses/{sha}',
  languages_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/languages',
  stargazers_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/stargazers',
  contributors_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/contributors',
  subscribers_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/subscribers',
  subscription_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/subscription',
  commits_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/commits{/sha}',
  git_commits_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/git/commits{/sha}',
  comments_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/comments{/number}',
  issue_comment_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/issues/comments{/number}',
  contents_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/contents/{+path}',
  compare_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/compare/{base}...{head}',
  merges_url: 'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/merges',
  archive_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/{archive_format}{/ref}',
  downloads_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/downloads',
  issues_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/issues{/number}',
  pulls_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/pulls{/number}',
  milestones_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/milestones{/number}',
  notifications_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/notifications{?since,all,participating}',
  labels_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/labels{/name}',
  releases_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/releases{/id}',
  deployments_url:
    'https://api.github.com/repos/Shenovrtre/MEV-BOT-Ethereum/deployments',
  created_at: '2025-02-04T09:17:44Z',
  updated_at: '2025-02-05T00:33:34Z',
  pushed_at: '2025-02-05T00:33:31Z',
  git_url: 'git://github.com/Shenovrtre/MEV-BOT-Ethereum.git',
  ssh_url: 'git@github.com:Shenovrtre/MEV-BOT-Ethereum.git',
  clone_url: 'https://github.com/Shenovrtre/MEV-BOT-Ethereum.git',
  svn_url: 'https://github.com/Shenovrtre/MEV-BOT-Ethereum',
  homepage: '',
  size: 232,
  stargazers_count: 63,
  watchers_count: 63,
  language: 'JavaScript',
  has_issues: false,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 53,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: {
    key: 'mit',
    name: 'MIT License',
    spdx_id: 'MIT',
    url: 'https://api.github.com/licenses/mit',
    node_id: 'MDc6TGljZW5zZTEz',
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: ['blockchain', 'smart-contracts', 'solidity', 'sushiswap', 'uniswap'],
  visibility: 'public',
  forks: 53,
  open_issues: 0,
  watchers: 63,
  default_branch: 'main',
  score: 1.0,
};

// Add these imports at the top
import {
  Star,
  Share2,
  GitFork,
  CircleDot,
  GitPullRequest,
  AlertCircle,
} from 'lucide-react';

export function App() {
  return (
    <div className='h-[100dvh] bg-zinc-950 text-white overflow-hidden'>
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 sticky top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'>
        <div className='flex items-center justify-between max-w-4xl mx-auto'>
          <div className='flex items-center space-x-1'>
            {['Discover', 'My Feed'].map((item) => (
              <button
                key={item}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        item === 'Discover'
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className='p-2 text-zinc-400 hover:text-white transition-colors sm:hidden'>
            <Share2 className='w-5 h-5' />
          </button>
        </div>
      </nav>

      {/* Main Content Area - Adjusted padding and overflow */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 overflow-y-auto h-[calc(100dvh-61px)]'>
        {/* Repository Stats Banner */}
        <div className='bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50 backdrop-blur-xl mb-6'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col items-center justify-center p-3'>
              <Star className='w-5 h-5 text-blue-400 mb-1.5' />
              <div className='text-2xl font-bold text-zinc-100'>
                {repository.stargazers_count}
              </div>
              <div className='text-xs text-zinc-400 font-medium'>Stars</div>
            </div>

            <div className='flex flex-col items-center justify-center p-3 border-x border-zinc-800/50'>
              <GitFork className='w-5 h-5 text-purple-400 mb-1.5' />
              <div className='text-2xl font-bold text-zinc-100'>
                {repository.forks_count}
              </div>
              <div className='text-xs text-zinc-400 font-medium'>Forks</div>
            </div>

            <div className='flex flex-col items-center justify-center p-3'>
              <GitPullRequest className='w-5 h-5 text-green-400 mb-1.5' />
              <div className='text-2xl font-bold text-zinc-100'>
                {repository.watchers_count}
              </div>
              <div className='text-xs text-zinc-400 font-medium'>Watchers</div>
            </div>
          </div>
        </div>

        {/* User Info - Made more prominent */}
        <div className='flex items-center space-x-4 mb-6 sm:mb-8'>
          <div className='relative'>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className='w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-zinc-700/50'
            />
            <span className='absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-medium'>
              JS
            </span>
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-1'>
              <h2 className='text-xl sm:text-2xl font-bold text-zinc-100 truncate'>
                {repository.owner.login}
              </h2>
              <button className='bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700 transition-colors ml-2'>
                Follow
              </button>
            </div>
            <p className='text-zinc-400 text-sm'>
              Created on {new Date(repository.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Repository Info - Refined hierarchy */}
        <div className='bg-zinc-900/30 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-8 border border-zinc-800/50'>
          <div className='flex items-start justify-between gap-4 mb-5'>
            <div className='min-w-0'>
              <h1 className='text-xl sm:text-2xl font-bold mb-2 text-zinc-100 truncate'>
                {repository.name}
              </h1>
              <p className='text-zinc-500 text-xs mb-4'>
                Created on {new Date(repository.created_at).toLocaleDateString()}
              </p>
              <div className='flex flex-wrap items-center gap-2 sm:gap-3 text-sm'>
                <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                  <span className='w-2 h-2 rounded-full bg-yellow-400'></span>
                  {repository.language}
                </div>
                
                <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                  <CircleDot className='w-4 h-4 text-blue-400' />
                  {repository.license?.name || 'No License'}
                </div>
                
                <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                  <AlertCircle className='w-4 h-4 text-red-400' />
                  {repository.open_issues_count} issues
                </div>
              </div>
            </div>
          </div>
          <p className='text-zinc-300 text-sm sm:text-base mb-6 leading-relaxed'>
            {repository.description}
          </p>
          <div className='flex flex-wrap gap-1.5 sm:gap-2'>
            {repository?.topics?.map((topic) => (
              <span
                key={topic}
                className='px-2.5 py-1 bg-zinc-800/30 text-zinc-400 rounded-full text-xs hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors cursor-pointer'
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - Made more prominent */}
        <div className='fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/50 sm:relative sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none'>
          <div className='flex space-x-3 max-w-4xl mx-auto'>
            <button className='flex-1 bg-zinc-100 text-zinc-900 p-4 rounded-xl font-semibold text-base hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2'>
              <Star className='w-5 h-5' />
              Star Repository
            </button>
            <button className='w-14 h-14 hidden sm:flex items-center justify-center bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-colors'>
              <Share2 className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
