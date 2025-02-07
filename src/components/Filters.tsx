import { Earth } from 'lucide-react';

const filters = [
  {
    label: 'Discover',
    value: 'discover',
    icon: <Earth className='w-4 h-4' />,
  },
];

export function Filters(props: FiltersProps) {
  const { activeFilter, onFilterChange } = props;

  return (
    <div className='flex items-center space-x-2 z-50'>
      <Button variant='outline'>Discover</Button>
    </div>
  );
}
