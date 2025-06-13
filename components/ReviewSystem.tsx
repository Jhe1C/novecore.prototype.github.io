// Review System Types and Interfaces
export interface ReviewerInfo {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  badges: ReviewerBadge[];
  totalReviews: number;
  helpfulVotes: number;
  joinDate: string;
  verified: boolean;
}

export interface ReviewerBadge {
  id: string;
  label: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'cyan';
  icon?: string;
}

export interface Review {
  id: string;
  gameId: string;
  reviewer: ReviewerInfo;
  rating: number; // 1-5 stars
  recommended: boolean;
  title?: string;
  content: string;
  contentPreview: string;
  playtime: number; // in hours
  purchaseType: 'verified' | 'free' | 'gift' | 'unknown';
  platform: string;
  gameVersion?: string;
  language: string;
  createdAt: string;
  updatedAt?: string;
  helpfulVotes: number;
  totalVotes: number;
  replyCount: number;
  hasSpoilers: boolean;
  hasMedia: boolean;
  mediaContent?: ReviewMedia[];
  tags: string[];
  source: 'novacore' | 'steam' | 'metacritic' | 'epic';
  reported: boolean;
  developerResponse?: DeveloperResponse;
  isEdited: boolean;
}

export interface ReviewMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface DeveloperResponse {
  id: string;
  content: string;
  author: string;
  authorTitle: string;
  createdAt: string;
  verified: boolean;
}

export interface ReviewFilters {
  keyword?: string;
}

export interface ReviewSortOption {
  id: string;
  label: string;
  value: string;
}

export const REVIEW_SORT_OPTIONS: ReviewSortOption[] = [
  { id: 'helpful', label: '最有幫助', value: 'helpful' },
  { id: 'newest', label: '最新評論', value: 'newest' },
  { id: 'oldest', label: '最早評論', value: 'oldest' },
  { id: 'rating-high', label: '評分最高', value: 'rating-high' },
  { id: 'rating-low', label: '評分最低', value: 'rating-low' },
  { id: 'length-long', label: '詳細評論', value: 'length-long' },
  { id: 'length-short', label: '簡潔評論', value: 'length-short' },
  { id: 'playtime-high', label: '遊戲時長最長', value: 'playtime-high' },
  { id: 'playtime-low', label: '遊戲時長最短', value: 'playtime-low' }
];

export const REVIEWER_BADGES: { [key: string]: ReviewerBadge } = {
  veteran: { id: 'veteran', label: '資深玩家', color: 'purple', icon: 'crown' },
  verified: { id: 'verified', label: '已驗證購買', color: 'green', icon: 'check' },
  media: { id: 'media', label: '媒體評測員', color: 'blue', icon: 'newspaper' },
  early: { id: 'early', label: '搶先體驗', color: 'orange', icon: 'zap' },
  creator: { id: 'creator', label: '內容創作者', color: 'cyan', icon: 'video' },
  helpful: { id: 'helpful', label: '樂於助人', color: 'green', icon: 'heart' },
  collector: { id: 'collector', label: '遊戲收藏家', color: 'purple', icon: 'star' }
};

// Mock Review Data
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    gameId: 'red-dead-redemption-2',
    reviewer: {
      id: 'user-1',
      username: 'GameMaster2024',
      displayName: '遊戲大師',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face',
      badges: [REVIEWER_BADGES.veteran, REVIEWER_BADGES.verified],
      totalReviews: 47,
      helpfulVotes: 892,
      joinDate: '2022-03-15',
      verified: true
    },
    rating: 5,
    recommended: true,
    title: '西部世界的巔峰之作，沒有之一',
    content: `這是我玩過最震撼的開放世界遊戲。Rockstar在細節方面的用心程度令人咋舌，從馬匹的毛髮到天氣變化，每一個元素都經過精心打磨。劇情深度超乎想像，亞瑟摩根的角色塑造堪稱經典。雖然操作稍顯沉重，但這正是遊戲想要傳達的寫實感。音效和配樂更是無可挑剔，完全沉浸在西部世界中。唯一的缺點可能是節奏較慢，但這也是它的魅力所在。強烈推薦給所有喜歡劇情和開放世界的玩家。`,
    contentPreview: '這是我玩過最震撼的開放世界遊戲。Rockstar在細節方面的用心程度令人咋舌，從馬匹的毛髮到天氣變化...',
    playtime: 127,
    purchaseType: 'verified',
    platform: 'PC',
    gameVersion: '1.0.1311.23',
    language: 'zh-TW',
    createdAt: '2024-01-15T14:30:00Z',
    helpfulVotes: 234,
    totalVotes: 267,
    replyCount: 12,
    hasSpoilers: false,
    hasMedia: true,
    mediaContent: [
      {
        id: 'media-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
        caption: '遊戲中的日落景色'
      }
    ],
    tags: ['劇情', '開放世界', '畫面', '音效'],
    source: 'novacore',
    reported: false,
    developerResponse: {
      id: 'dev-response-1',
      content: '感謝您的詳細評論！我們很高興您喜歡遊戲中的細節設計。',
      author: 'Rockstar Games',
      authorTitle: '官方開發團隊',
      createdAt: '2024-01-16T09:15:00Z',
      verified: true
    },
    isEdited: false
  },
  {
    id: 'review-2',
    gameId: 'red-dead-redemption-2',
    reviewer: {
      id: 'user-2',
      username: 'SpeedRunner_Pro',
      displayName: '極速玩家',
      badges: [REVIEWER_BADGES.verified, REVIEWER_BADGES.helpful],
      totalReviews: 23,
      helpfulVotes: 445,
      joinDate: '2023-07-22',
      verified: true
    },
    rating: 4,
    recommended: true,
    title: '優秀但節奏偏慢的西部史詩',
    content: `作為一個習慣快節奏遊戲的玩家，RDR2確實需要一些適應時間。遊戲的畫面和劇情無可挑剔，但是移動和互動的速度相對較慢。不過一旦適應了這種節奏，你會發現這正是遊戲的魅力所在。建議新手玩家要有耐心，這不是一個可以快速通關的遊戲。`,
    contentPreview: '作為一個習慣快節奏遊戲的玩家，RDR2確實需要一些適應時間。遊戲的畫面和劇情無可挑剔...',
    playtime: 89,
    purchaseType: 'verified',
    platform: 'PC',
    language: 'zh-TW',
    createdAt: '2024-01-10T16:45:00Z',
    helpfulVotes: 156,
    totalVotes: 189,
    replyCount: 8,
    hasSpoilers: false,
    hasMedia: false,
    tags: ['節奏', '劇情', '適應性'],
    source: 'novacore',
    reported: false,
    isEdited: false
  },
  {
    id: 'review-3',
    gameId: 'red-dead-redemption-2',
    reviewer: {
      id: 'user-3',
      username: 'CasualGamer_TW',
      displayName: '休閒玩家',
      badges: [REVIEWER_BADGES.verified],
      totalReviews: 12,
      helpfulVotes: 78,
      joinDate: '2024-01-01',
      verified: true
    },
    rating: 3,
    recommended: false,
    title: '畫面很美但不適合休閒玩家',
    content: `遊戲畫面確實很棒，但對我來說太複雜了。需要花很多時間才能掌握各種系統，而且劇情推進很慢。可能更適合有大量時間的硬核玩家。`,
    contentPreview: '遊戲畫面確實很棒，但對我來說太複雜了。需要花很多時間才能掌握各種系統...',
    playtime: 15,
    purchaseType: 'verified',
    platform: 'PC',
    language: 'zh-TW',
    createdAt: '2024-01-08T11:20:00Z',
    helpfulVotes: 45,
    totalVotes: 67,
    replyCount: 3,
    hasSpoilers: false,
    hasMedia: false,
    tags: ['複雜度', '時間投入'],
    source: 'novacore',
    reported: false,
    isEdited: false
  }
];

// Review Statistics Interface
export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  recommendationPercentage: number;
  ratingDistribution: { [key: number]: number };
  recentRatingTrend: number;
  verifiedPurchasePercentage: number;
  averagePlaytime: number;
  mostMentionedTags: Array<{ tag: string; count: number }>;
}

// Helper Functions
export function calculateReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      recommendationPercentage: 0,
      ratingDistribution: {},
      recentRatingTrend: 0,
      verifiedPurchasePercentage: 0,
      averagePlaytime: 0,
      mostMentionedTags: []
    };
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const recommendedCount = reviews.filter(review => review.recommended).length;
  const recommendationPercentage = (recommendedCount / totalReviews) * 100;

  // Rating distribution
  const ratingDistribution: { [key: number]: number } = {};
  for (let i = 1; i <= 5; i++) {
    ratingDistribution[i] = reviews.filter(review => review.rating === i).length;
  }

  // Recent rating trend (last 30 days vs overall)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentReviews = reviews.filter(review => new Date(review.createdAt) > thirtyDaysAgo);
  const recentAverageRating = recentReviews.length > 0 
    ? recentReviews.reduce((sum, review) => sum + review.rating, 0) / recentReviews.length 
    : averageRating;
  const recentRatingTrend = recentAverageRating - averageRating;

  // Verified purchase percentage
  const verifiedCount = reviews.filter(review => review.purchaseType === 'verified').length;
  const verifiedPurchasePercentage = (verifiedCount / totalReviews) * 100;

  // Average playtime
  const averagePlaytime = reviews.reduce((sum, review) => sum + review.playtime, 0) / totalReviews;

  // Most mentioned tags
  const tagCounts: { [key: string]: number } = {};
  reviews.forEach(review => {
    review.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  const mostMentionedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalReviews,
    averageRating,
    recommendationPercentage,
    ratingDistribution,
    recentRatingTrend,
    verifiedPurchasePercentage,
    averagePlaytime,
    mostMentionedTags
  };
}

export function filterReviews(reviews: Review[], filters: ReviewFilters): Review[] {
  return reviews.filter(review => {
    // Keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const searchText = `${review.title || ''} ${review.content}`.toLowerCase();
      if (!searchText.includes(keyword)) return false;
    }

    return true;
  });
}

export function sortReviews(reviews: Review[], sortBy: string): Review[] {
  const sorted = [...reviews];

  switch (sortBy) {
    case 'helpful':
      return sorted.sort((a, b) => {
        const aHelpfulness = a.totalVotes > 0 ? a.helpfulVotes / a.totalVotes : 0;
        const bHelpfulness = b.totalVotes > 0 ? b.helpfulVotes / b.totalVotes : 0;
        return bHelpfulness - aHelpfulness || b.helpfulVotes - a.helpfulVotes;
      });
    
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    case 'rating-high':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'rating-low':
      return sorted.sort((a, b) => a.rating - b.rating);
    
    case 'playtime-high':
      return sorted.sort((a, b) => b.playtime - a.playtime);
    
    case 'playtime-low':
      return sorted.sort((a, b) => a.playtime - b.playtime);
    
    case 'length-long':
      return sorted.sort((a, b) => b.content.length - a.content.length);
    
    case 'length-short':
      return sorted.sort((a, b) => a.content.length - b.content.length);
    
    default:
      return sorted;
  }
}

export function formatPlaytime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} 分鐘`;
  } else if (hours < 100) {
    return `${hours.toFixed(1)} 小時`;
  } else {
    return `${Math.round(hours)} 小時`;
  }
}

export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} 週前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} 個月前`;
  } else {
    return date.toLocaleDateString('zh-TW');
  }
}