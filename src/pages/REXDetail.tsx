import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Hash, Award, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { mockREX, mockComments } from '../data/mockData';
import VotingSystem from '../components/VotingSystem';
import CommentSection from '../components/CommentSection';
import { Comment } from '../types';

const REXDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rex = mockREX.find(r => r.id === id);
  const [comments, setComments] = useState<Comment[]>(mockComments[id || ''] || []);

  if (!rex) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            REX introuvable
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Le retour d'expérience que vous cherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleVote = (rexId: string, voteType: 'useful' | 'notUseful') => {
    // Simulate vote handling
    console.log(`Vote ${voteType} for REX ${rexId}`);
  };

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: '1',
        name: 'Utilisateur Actuel',
        email: 'user@example.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: '',
        joinedDate: new Date().toISOString()
      },
      publishedDate: new Date().toISOString(),
      replies: [],
      parentId
    };

    if (parentId) {
      // Add as reply
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, newComment] }
          : comment
      ));
    } else {
      // Add as top-level comment
      setComments(prev => [...prev, newComment]);
    }
  };

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux REX</span>
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          {/* Title and metadata */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(rex.complexity)}`}>
                <Award className="w-4 h-4 inline mr-1" />
                {rex.complexity}
              </span>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {rex.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {rex.summary}
            </p>

            {/* Author and date */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={rex.author.avatar}
                  alt={rex.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <Link 
                    to={`/profile/${rex.author.id}`}
                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {rex.author.name}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Publié le {formatDate(rex.publishedDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {rex.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag.toLowerCase()}`}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Hash className="w-3 h-3" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <ReactMarkdown>{rex.content}</ReactMarkdown>
          </div>

          {/* Voting */}
          <VotingSystem rex={rex} onVote={handleVote} />
        </div>
      </div>

      {/* Comments */}
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
};

export default REXDetail;