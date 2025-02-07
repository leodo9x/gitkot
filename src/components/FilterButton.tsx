import { ReactNode, useState, useEffect, useRef } from 'react';

interface FilterItem {
  label: string;
  value: string;
  icon: ReactNode;
}

interface FilterButtonProps {
  value: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
  selectedChild?: string;
  onClick: (value: string) => void;
  dropdownItems?: FilterItem[];
}

export function FilterButton(props: FilterButtonProps) {
  const { value, label, icon, isActive, onClick, dropdownItems = [] } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find the selected child item to display its label
  const selectedItem = dropdownItems?.find((item) => item.value === value);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => {
          if (dropdownItems.length > 0) {
            setIsOpen(!isOpen);
          } else {
            onClick(value);
          }
        }}
        className={`px-4 flex items-center gap-2 py-2 rounded-full text-sm font-medium transition-all
          ${
            isActive
              ? 'bg-white text-black'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          } ${isOpen ? 'bg-white/10 text-white' : ''}`}
      >
        {icon}
        {label}
        {selectedItem && (
          <span className='ml-1 text-xs opacity-70'>
            ({selectedItem.label})
          </span>
        )}
      </button>

      {dropdownItems.length > 0 && isOpen && (
        <div
          className='fixed mt-2 w-48 rounded-lg bg-zinc-800 shadow-lg py-1 z-50'
          style={{
            top: dropdownRef.current?.getBoundingClientRect().bottom ?? 0,
            left: dropdownRef.current?.getBoundingClientRect().left ?? 0,
          }}
        >
          {dropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onClick(item.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 text-sm
                ${
                  item.value === value
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
