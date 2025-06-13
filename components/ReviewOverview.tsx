import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Review, ReviewStats, calculateReviewStats } from './ReviewSystem';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  ThumbsUp, 
  Users, 
  Clock,
  Tag
} from 'lucide-react';

interface ReviewOverviewProps {
  reviews: Review[];
  className?: string;
}

function RatingStars({ rating, size = 'lg' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.round(rating) 
              ? 'text-[var(--accent-orange)] fill-current' 
              : 'text-[var(--text-muted)]'
          }`}
        />
      ))}
    </div>
  );
}

function RatingDistributionBar({ 
  stars, 
  count, 
  total, 
  maxCount 
}: { 
  stars: number; 
  count: number; 
  total: number; 
  maxCount: number; 
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1 w-16">
        <span className="text-sm font-medium text-[var(--text-primary)] w-3">{stars}</span>
        <Star className="w-3 h-3 text-[var(--accent-orange)] fill-current" />
      </div>
      
      <div className="flex-1 relative">
        <div className="w-full bg-[var(--slate-medium)] rounded-full h-2">
          <div 
            className="bg-[var(--accent-orange)] h-2 rounded-full transition-all duration-500"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 w-20 justify-end">
        <span className="text-xs text-[var(--text-muted)]">{count}</span>
        <span className="text-xs text-[var(--text-secondary)]">({percentage.toFixed(0)}%)</span>
      </div>
    </div>
  );
}

export function ReviewOverview({ reviews, className = '' }: ReviewOverviewProps) {
  const stats = calculateReviewStats(reviews);

  if (stats.totalReviews === 0) {
    return (
      <Card className={`vanguard-card p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[var(--slate-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">尚無評論</h3>
          <p className="text-[var(--text-secondary)]">
            成為第一個評論這款遊戲的玩家！
          </p>
        </div>
      </Card>
    );
  }

  const maxRatingCount = Math.max(...Object.values(stats.ratingDistribution));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Rating Summary */}
      <Card className="vanguard-card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <div className="text-5xl font-bold text-[var(--text-primary)]">
                {stats.averageRating.toFixed(1)}
              </div>
              <div>
                <RatingStars rating={stats.averageRating} size="lg" />
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  共 {stats.totalReviews.toLocaleString()} 則評論
                </div>
              </div>
            </div>

            {/* Recommendation Percentage */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-[var(--accent-green)]" />
              <span className="text-lg font-semibold text-[var(--accent-green)]">
                {stats.recommendationPercentage.toFixed(0)}%
              </span>
              <span className="text-[var(--text-secondary)]">的玩家推薦此遊戲</span>
            </div>

            {/* Recent Trend */}
            {stats.recentRatingTrend !== 0 && (
              <div className="flex items-center justify-center md:justify-start space-x-2">
                {stats.recentRatingTrend > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-[var(--accent-green)]" />
                    <span className="text-sm text-[var(--accent-green)]">
                      近期評價上升 (+{stats.recentRatingTrend.toFixed(1)})
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-[var(--destructive)]" />
                    <span className="text-sm text-[var(--destructive)]">
                      近期評價下降 ({stats.recentRatingTrend.toFixed(1)})
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right: Rating Distribution */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">評分分佈</h4>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingDistributionBar
                  key={stars}
                  stars={stars}
                  count={stats.ratingDistribution[stars] || 0}
                  total={stats.totalReviews}
                  maxCount={maxRatingCount}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Verified Purchase Percentage */}
        <Card className="vanguard-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--accent-green)]/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--accent-green)]" />
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {stats.verifiedPurchasePercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">已驗證購買</div>
            </div>
          </div>
        </Card>

        {/* Average Playtime */}
        <Card className="vanguard-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--accent-blue)]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {stats.averagePlaytime.toFixed(0)}h
              </div>
              <div className="text-sm text-[var(--text-secondary)]">平均遊戲時長</div>
            </div>
          </div>
        </Card>

        {/* Most Mentioned Tags */}
        <Card className="vanguard-card p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-[var(--accent-purple)]/10 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-[var(--accent-purple)]" />
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {stats.mostMentionedTags.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">熱門標籤</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {stats.mostMentionedTags.slice(0, 3).map((tagData) => (
              <Badge key={tagData.tag} className="modern-badge modern-badge-purple text-xs">
                {tagData.tag} ({tagData.count})
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Tags Detail */}
      {stats.mostMentionedTags.length > 0 && (
        <Card className="vanguard-card p-6">
          <h4 className="font-semibold text-[var(--text-primary)] mb-4">最常提及的標籤</h4>
          <div className="flex flex-wrap gap-2">
            {stats.mostMentionedTags.map((tagData) => (
              <Badge key={tagData.tag} className="modern-badge modern-badge-blue">
                {tagData.tag} <span className="ml-1 opacity-70">({tagData.count})</span>
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}