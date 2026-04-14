import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  className,
}) => {
  return (
    <nav
      className={`flex items-center text-sm text-gray-600 ${className || ''}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}
          {item.current || !item.href ? (
            <span
              className={item.current ? 'text-gray-900 font-medium' : ''}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => onNavigate?.(item.href!)}
              className="text-yellow-400 hover:text-yellow-500 hover:underline transition-colors font-medium"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
