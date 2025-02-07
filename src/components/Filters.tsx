import { Calendar, Earth, Flame, Hash, Moon, Sun } from 'lucide-react';
import { FilterButton } from './FilterButton';

const filters = [
  {
    label: 'Discover',
    value: 'discover',
    icon: <Earth className='w-4 h-4' />,
  },
  {
    label: 'Rising',
    value: 'rising',
    icon: <Flame className='w-4 h-4 fill-current' />,
    children: [
      {
        label: 'Yearly',
        value: 'yearly',
        icon: <Calendar className='w-4 h-4' />,
      },
      {
        label: 'Monthly',
        value: 'monthly',
        icon: <Moon className='w-4 fill-current h-4' />,
      },
      {
        label: 'Weekly',
        value: 'weekly',
        icon: <Sun className='w-4 fill-current h-4' />,
      },
      {
        label: 'Daily',
        value: 'daily',
        icon: <Sun className='w-4 fill-current h-4' />,
      },
    ],
  },
];

interface FiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function Filters(props: FiltersProps) {
  const { activeFilter, onFilterChange } = props;

  return (
    <div className='flex items-center space-x-2 z-50'>
      {filters.map((filter) => {
        const isSelected = filter.value === activeFilter;
        const selectedChild = filter.children?.find(
          (child) => child.value === activeFilter
        );

        return (
          <FilterButton
            key={filter.value}
            value={filter.value}
            label={selectedChild ? selectedChild.label : filter.label}
            icon={selectedChild ? selectedChild.icon : filter.icon}
            isActive={isSelected || !!selectedChild}
            onClick={onFilterChange}
            dropdownItems={filter.children}
          />
        );
      })}
    </div>
  );
}
