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
      className="flex justify-around border-b-2 border-fgColor/15"
      role="tablist"
      onKeyDown={handleKeyDown}>
      {tabs.map((tab, index) => {
        const activeTab = pathname === tab.path;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab ? 'true' : 'false'}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab ? 0 : -1}
            className="flex-1 py-4 text-fgColor text-center font-medium hover:bg-fgColor/10"
            ref={(element) => {
              if (element) {
                tabRefs.current[index] = element;
              }
            }}>
            <span
              className={`py-4 ${
                activeTab ? 'border-b-2 border-fgColor' : ''
              }`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
