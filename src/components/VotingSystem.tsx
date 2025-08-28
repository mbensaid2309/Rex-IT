import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { REX } from '../types';

interface VotingSystemProps {
  rex: REX;
  onVote: (rexId: string, voteType: 'useful' | 'notUseful') => void;
}

const VotingSystem: React.FC<VotingSystemProps> = ({ rex, onVote }) => {
  const [userVote, setUserVote] = useState<'useful' | 'notUseful' | null>(rex.userVote || null);

  const handleVote = (voteType: 'useful' | 'notUseful') => {
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    onVote(rex.id, voteType);
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Ce REX vous a-t-il été utile ?
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => handleVote('useful')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            userVote === 'useful'
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/10'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">{rex.votes.useful}</span>
        </button>
        <button
          onClick={() => handleVote('notUseful')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            userVote === 'notUseful'
              ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium">{rex.votes.notUseful}</span>
        </button>
      </div>
    </div>
  );
};

export default VotingSystem;