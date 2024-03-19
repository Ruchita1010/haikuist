import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type TabListProps = {
  tabs: {
    id: string;
    path: string;
    label: string;
  }[];
};

export default function TabList({ tabs }: TabListProps) {
  const { pathname } = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const tabRefs = useRef<HTMLAnchorElement[]>([]);

  const setTabFocus = (index: number) => {
    if (tabRefs.current) {
      tabRefs.current[index].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabLength = tabs.length;
    switch (e.key) {
      case 'ArrowLeft':
        setCurrentIndex(() => {
          const newIndex = (currentIndex - 1 + tabLength) % tabLength;
          setTabFocus(newIndex);
          return newIndex;
        });
        break;
      case 'ArrowRight':
        setCurrentIndex(() => {
          const newIndex = (currentIndex + 1) % tabLength;
          setTabFocus(newIndex);
          return newIndex;
        });
        break;
      case 'Home':
        setCurrentIndex(() => {
          setTabFocus(0);
          return 0;
        });
        break;
      case 'End':
        setCurrentIndex(() => {
          setTabFocus(tabLength - 1);
          return tabLength - 1;
        });
        break;
      default:
        return;
    }
  };

  return (
    <div
      className="flex justify-around p-4 mt-2 border-b-2"
      role="tablist"
      onKeyDown={handleKeyDown}>
      {tabs.map((tab, index) => (
        <div role="presentation" key={tab.id}>
          <Link
            to={tab.path}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={pathname === tab.path ? 'true' : 'false'}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={pathname === tab.path ? 0 : -1}
            ref={(element) => {
              if (element) {
                tabRefs.current[index] = element;
              }
            }}>
            {tab.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
