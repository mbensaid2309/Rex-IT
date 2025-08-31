import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import REXCard from '../components/REXCard';
import SearchAndFilters from '../components/SearchAndFilters';
import { mockREX, mockTags } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const { isAuthenticated } = useAuth();

  const filteredREX = useMemo(() => {
    return mockREX.filter((rex) => {
      const matchesSearch = rex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rex.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rex.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => rex.tags.includes(tag));
      
      const matchesComplexity = !selectedComplexity || rex.complexity === selectedComplexity;

      return matchesSearch && matchesTags && matchesComplexity;
    });
  }, [searchTerm, selectedTags, selectedComplexity]);

  const stats = [
    { icon: BookOpen, label: 'REX Publiés', value: mockREX.length, color: 'text-blue-600' },
    { icon: Users, label: 'Contributeurs', value: '127', color: 'text-green-600' },
    { icon: Award, label: 'Tags Actifs', value: mockTags.length, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Vues ce mois', value: '12.5k', color: 'text-orange-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Partagez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">retours d'expérience</span> IT
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Découvrez, apprenez et partagez des retours d'expérience concrets sur vos projets techniques. 
          Une communauté d'experts IT pour enrichir vos compétences.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedComplexity={selectedComplexity}
        setSelectedComplexity={setSelectedComplexity}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Retours d'expérience
          {filteredREX.length !== mockREX.length && (
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredREX.length} résultat{filteredREX.length !== 1 ? 's' : ''})
            </span>
          )}
        </h2>
      </div>

      {/* REX Grid */}
      {filteredREX.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucun retour d'expérience trouvé
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Essayez de modifier vos critères de recherche ou{' '}
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedTags([]);
                setSelectedComplexity('');
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              effacer les filtres
            </button>
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredREX.map((rex) => (
            <REXCard key={rex.id} rex={rex} />
          ))}
        </div>
      )}

      {/* Call to Action */}
      {filteredREX.length > 0 && (
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Partagez votre expertise
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Vous avez vécu une expérience technique intéressante ? Aidez la communauté en partageant votre retour d'expérience.
          </p>
          <Link
            to={isAuthenticated ? '/create' : '/login'}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Créer mon premier REX
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
