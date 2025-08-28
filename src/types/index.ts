export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export interface REX {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  complexity: 'Débutant' | 'Intermédiaire' | 'Avancé';
  author: User;
  publishedDate: string;
  votes: {
    useful: number;
    notUseful: number;
  };
  userVote?: 'useful' | 'notUseful' | null;
  commentsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  publishedDate: string;
  replies: Comment[];
  parentId?: string;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

export type Theme = 'light' | 'dark';