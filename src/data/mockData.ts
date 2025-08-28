import { User, REX, Comment, Tag } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'DevOps Engineer passionnée par l\'automatisation et le cloud computing',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Marc Dubois',
    email: 'marc@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Architecte Cloud spécialisé AWS/Azure, 10 ans d\'expérience',
    joinedDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Lisa Zhang',
    email: 'lisa@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Data Engineer, experte en pipelines big data et IA',
    joinedDate: '2023-02-10'
  }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'Kubernetes', description: 'Orchestration de conteneurs', count: 25, color: '#326CE5' },
  { id: '2', name: 'DevOps', description: 'Pratiques et outils DevOps', count: 42, color: '#FF6B35' },
  { id: '3', name: 'AWS', description: 'Amazon Web Services', count: 38, color: '#FF9900' },
  { id: '4', name: 'Docker', description: 'Conteneurisation', count: 31, color: '#2496ED' },
  { id: '5', name: 'Terraform', description: 'Infrastructure as Code', count: 22, color: '#623CE4' },
  { id: '6', name: 'Sécurité', description: 'Cybersécurité et bonnes pratiques', count: 19, color: '#E53E3E' },
  { id: '7', name: 'FinOps', description: 'Optimisation des coûts cloud', count: 15, color: '#10B981' },
  { id: '8', name: 'Monitoring', description: 'Surveillance et observabilité', count: 28, color: '#8B5CF6' }
];

export const mockREX: REX[] = [
  {
    id: '1',
    title: 'Migration Kubernetes : de la VM au Cloud Native',
    summary: 'Retour d\'expérience sur une migration complète d\'une architecture traditionnelle vers Kubernetes avec AWS EKS.',
    content: `# Migration Kubernetes : Leçons apprises

## Contexte
Notre équipe avait pour mission de migrer une application legacy tournant sur des VMs vers une architecture cloud-native avec Kubernetes.

## Défis rencontrés
- Configuration réseau complexe
- Gestion des secrets
- Monitoring et logging

## Solutions apportées
1. **Network Policies** : Mise en place de policies strictes
2. **Secrets Management** : Utilisation d'AWS Secrets Manager
3. **Observability** : Stack Prometheus + Grafana

## Résultats
- 40% de réduction des coûts
- 99.9% de disponibilité
- Déploiements 10x plus rapides`,
    tags: ['Kubernetes', 'AWS', 'DevOps', 'Monitoring'],
    complexity: 'Avancé',
    author: mockUsers[0],
    publishedDate: '2024-01-15',
    votes: { useful: 42, notUseful: 3 },
    userVote: null,
    commentsCount: 8
  },
  {
    id: '2',
    title: 'Optimisation FinOps : Réduire les coûts AWS de 50%',
    summary: 'Stratégies et outils pour optimiser les coûts cloud avec une approche FinOps structurée.',
    content: `# Optimisation FinOps AWS

## Introduction
Face à une facture AWS en constante augmentation, nous avons mis en place une démarche FinOps.

## Actions mises en œuvre
- Analyse des tags et ressources inutilisées
- Right-sizing des instances
- Reserved Instances et Spot Instances

## Outils utilisés
- AWS Cost Explorer
- AWS Trusted Advisor  
- Terraform pour l'automatisation

## Impact
50% de réduction sur 6 mois tout en maintenant les performances.`,
    tags: ['FinOps', 'AWS', 'Terraform'],
    complexity: 'Intermédiaire',
    author: mockUsers[1],
    publishedDate: '2024-01-10',
    votes: { useful: 28, notUseful: 1 },
    userVote: null,
    commentsCount: 5
  },
  {
    id: '3',
    title: 'Pipeline Data avec Apache Kafka et Python',
    summary: 'Construction d\'un pipeline de données en temps réel pour traiter 1M+ d\'événements par jour.',
    content: `# Pipeline Data temps réel

## Architecture
Pipeline basé sur Apache Kafka pour ingérer et traiter des événements en temps réel.

## Stack technique
- Apache Kafka
- Python (Kafka Streams)
- Apache Spark
- MongoDB

## Performance
- 1M+ événements/jour
- Latence < 100ms
- 99.99% de fiabilité`,
    tags: ['Data', 'Python', 'Kafka', 'Monitoring'],
    complexity: 'Avancé',
    author: mockUsers[2],
    publishedDate: '2024-01-08',
    votes: { useful: 35, notUseful: 2 },
    userVote: null,
    commentsCount: 12
  }
];

export const mockComments: { [rexId: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      content: 'Excellent REX ! Nous avons eu les mêmes problématiques sur notre migration. Avez-vous eu des difficultés avec les persistent volumes ?',
      author: mockUsers[1],
      publishedDate: '2024-01-16',
      replies: [
        {
          id: '2',
          content: 'Effectivement, les PV ont été un vrai challenge ! Nous avons opté pour AWS EBS CSI driver avec des snapshots automatiques.',
          author: mockUsers[0],
          publishedDate: '2024-01-16',
          replies: [],
          parentId: '1'
        }
      ]
    }
  ]
};