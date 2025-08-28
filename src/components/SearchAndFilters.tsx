import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { mockTags } from '../data/mockData';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedComplexity: string;
  setSelectedComplexity: (complexity: string) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  selectedComplexity,
  setSelectedComplexity
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedComplexity('');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedComplexity || searchTerm;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher des retours d'expérience..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filtres</span>
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
            <span>Effacer les filtres</span>
          </button>
        )}
      </div>

      {/* Filters */}
      {isFilterOpen && (
        <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Tags Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Thématiques</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Complexité</h3>
            <div className="flex space-x-2">
              {['Débutant', 'Intermédiaire', 'Avancé'].map((complexity) => (
                <button
                  key={complexity}
                  onClick={() => setSelectedComplexity(selectedComplexity === complexity ? '' : complexity)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedComplexity === complexity
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {complexity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full"
            >
              <span>#{tag}</span>
              <button
                onClick={() => handleTagToggle(tag)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedComplexity && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded-full">
              <span>{selectedComplexity}</span>
              <button
                onClick={() => setSelectedComplexity('')}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;