import React from 'react';
import { Calendar, MapPin, Link as LinkIcon, Award, BookOpen, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import REXCard from '../components/REXCard';
import { mockUsers, mockREX } from '../data/mockData';

const Profile: React.FC = () => {
  // Using first user as current user for demo
  const user = mockUsers[0];
  const userREX = mockREX.filter(rex => rex.author.id === user.id);
  
  const stats = [
    { icon: BookOpen, label: 'REX Publiés', value: userREX.length },
    { icon: ThumbsUp, label: 'Votes Positifs', value: userREX.reduce((sum, rex) => sum + rex.votes.useful, 0) },
    { icon: Award, label: 'Tags Utilisés', value: [...new Set(userREX.flatMap(rex => rex.tags))].length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
          </div>
          
          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {user.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {user.bio}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Membre depuis {new Date(user.joinedDate).toLocaleDateString('fr-FR', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>France</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="w-4 h-4" />
                <span>sarah-chen.dev</span>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex-shrink-0">
            <Link
              to="/create"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nouveau REX
            </Link>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REX Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mes retours d'expérience
          </h2>
          {userREX.length === 0 && (
            <Link
              to="/create"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Créer mon premier REX
            </Link>
          )}
        </div>

        {userREX.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucun REX publié
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Partagez votre première expérience technique avec la communauté.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer mon premier REX
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userREX.map((rex) => (
              <REXCard key={rex.id} rex={rex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;