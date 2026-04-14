import React from 'react';
import { SectionHeader } from './SectionHeader';

export interface BlogArticle {
  id: string;
  image: string;
  title: string;
  date: string;
  category: string;
}

interface BlogSectionProps {
  articles: BlogArticle[];
  onViewAll?: () => void;
  className?: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  articles,
  onViewAll,
  className,
}) => {
  return (
    <section className={`w-full ${className || ''}`}>
      <SectionHeader
        title="Just Landing"
        viewAllText="Read More"
        onViewAll={onViewAll}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-yellow-400 bg-yellow-50 px-2 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-yellow-400">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

BlogSection.displayName = 'BlogSection';
