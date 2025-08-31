import React from 'react';
import { Link } from 'react-router-dom';
import { Hash, TrendingUp, Users } from 'lucide-react';
import { mockTags } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Tags: React.FC = () => {
  const sortedTags = [...mockTags].sort((a, b) => b.count - a.count);
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explorez par <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">thématiques</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez les retours d'expérience organisés par domaines d'expertise IT. 
          Trouvez rapidement les REX qui correspondent à vos centres d'intérêt.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <Hash className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockTags.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tags Actifs</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTags.reduce((sum, tag) => sum + tag.count, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">REX Total</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Domaines</div>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTags.map((tag) => (
          <Link
            key={tag.id}
            to={`/tags/${tag.name.toLowerCase()}`}
            className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${tag.color}15` }}
              >
                <Hash 
                  className="w-6 h-6"
                  style={{ color: tag.color }}
                />
              </div>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-sm font-medium">
                {tag.count}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tag.name}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {tag.description}
            </p>
            
            <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
              Voir les REX →
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Votre expertise ne figure pas ici ?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Créez votre premier REX et contribuez à enrichir les thématiques de la communauté. 
          Les tags sont créés automatiquement selon vos contributions.
        </p>
        <Link
          to={isAuthenticated ? '/create' : '/login'}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Créer un REX
        </Link>
      </div>
    </div>
  );
};

export default Tags;
