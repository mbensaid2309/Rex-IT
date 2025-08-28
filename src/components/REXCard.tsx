import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { REX } from '../types';

interface REXCardProps {
  rex: REX;
}

const REXCard: React.FC<REXCardProps> = ({ rex }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Débutant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Avancé': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={rex.author.avatar}
              alt={rex.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{rex.author.name}</p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(rex.publishedDate)}</span>
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(rex.complexity)}`}>
            {rex.complexity}
          </span>
        </div>

        {/* Content */}
        <Link to={`/rex/${rex.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {rex.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {rex.summary}
          </p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rex.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <ThumbsUp className="w-4 h-4 text-green-500" />
              <span>{rex.votes.useful}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <ThumbsDown className="w-4 h-4 text-red-500" />
              <span>{rex.votes.notUseful}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span>{rex.commentsCount}</span>
            </div>
          </div>
          <Link
            to={`/rex/${rex.id}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Lire la suite →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default REXCard;