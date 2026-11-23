import { useState } from 'react';

interface TabsProps {
  items: string[];
  initialIndex?: number;
  onSelect?: (index: number) => void;
}

export function Tabs({ items, initialIndex = 0, onSelect }: TabsProps) {
  const [selected, setSelected] = useState(initialIndex);

  return (
    <div className="tabs">
      {items.map((item, index) => (
        <button
          key={item}
          className={index === selected ? 'on' : ''}
          onClick={() => {
            setSelected(index);
            onSelect?.(index);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
