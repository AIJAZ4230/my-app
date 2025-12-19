
import { NewsPost, CategoryItem } from './types';

export const ADMIN_PASSWORD = 'News@4230';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Jammu', slug: 'jammu' },
  { id: '2', name: 'Kashmir', slug: 'kashmir' },
  { id: '3', name: 'Education', slug: 'education' },
  { id: '4', name: 'Jobs', slug: 'jobs' },
  { id: '5', name: 'Sports', slug: 'sports' },
  { id: '6', name: 'World', slug: 'world' }
];

export const INITIAL_POSTS: NewsPost[] = [
  {
    id: '1',
    title: 'Historic Development in J&K: New Infrastructure Projects Announced',
    excerpt: 'The Union Territory administration has unveiled a comprehensive plan for road connectivity...',
    content: 'JAMMU: In a significant move towards regional development, the UT administration has announced several major infrastructure projects. These include the expansion of national highways and the introduction of smart city initiatives in both Jammu and Srinagar.',
    category: 'Jammu',
    author: 'Editorial Desk',
    publishedAt: new Date().toISOString(),
    imageUrl: 'https://picsum.photos/seed/jk1/800/600',
    isBreaking: true
  },
  {
    id: '2',
    title: 'Kashmir Valley Witnesses Record Tourist Influx this Winter',
    excerpt: 'Hotels and resorts in Gulmarg and Pahalgam report 100% occupancy as snowfall attracts visitors.',
    content: 'SRINAGAR: The tourism sector in Kashmir is seeing a massive boom. With heavy snowfall across the higher reaches, tourists from across the country are flocking to famous resorts like Gulmarg.',
    category: 'Kashmir',
    author: 'News Team',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/kashmir1/800/600'
  }
];
