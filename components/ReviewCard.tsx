import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Review, ReviewerBadge, formatPlaytime, formatReviewDate } from './ReviewSystem';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Flag, 
  Eye, 
  EyeOff,
  ChevronDown,
  ChevronUp,
  Shield,
  Crown,
  Check,
  Newspaper,
  Zap,
  Video,
  Heart,
  Image as ImageIcon,
  PlayCircle,
  MoreHorizontal
} from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  onVoteHelpful?: (reviewId: string, helpful: boolean) => void;
  onReport?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
  className?: string;
  compact?: boolean;
}

const BADGE_ICONS = {
  crown: Crown,
  check: Check,
  newspaper: Newspaper,
  zap: Zap,
  video: Video,
  heart: Heart,
  star: Star,
  shield: Shield
};

const BADGE_COLORS = {
  blue: 'modern-badge-blue',
  purple: 'modern-badge-purple',
  green: 'modern-badge-green',
  orange: 'modern-badge-cyan',
  cyan: 'modern-badge-cyan'
};

function ReviewerBadgeComponent({ badge }: { badge: ReviewerBadge }) {
  const IconComponent = BADGE_ICONS[badge.icon as keyof typeof BADGE_ICONS];
  const badgeClass = BADGE_COLORS[badge.color];

  return (
    <Badge className={`modern-badge ${badgeClass} text-xs`}>
      {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
      {badge.label}
    </Badge>
  );
}

function RatingStars({ rating, size = 'sm' }: { rating: number; size?: 'xs' | 'sm' | 'md' }) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating 
              ? 'text-[var(--accent-orange)] fill-current' 
              : 'text-[var(--text-muted)]'
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ 
  review, 
  onVoteHelpful, 
  onReport, 
  onReply, 
  className = '',
  compact = false
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [userVote, setUserVote] = useState<'helpful' | 'not-helpful' | null>(null);
  const [voteCounts, setVoteCounts] = useState({
    helpful: review.helpfulVotes,
    total: review.totalVotes
  });

  const handleVote = (helpful: boolean) => {
    const newVote = helpful ? 'helpful' : 'not-helpful';
    
    // If same vote, remove it
    if (userVote === newVote) {
      setUserVote(null);
      setVoteCounts(prev => ({
        helpful: helpful ? prev.helpful - 1 : prev.helpful,
        total: prev.total - 1
      }));
    } else {
      // If different vote or no previous vote
      const helpfulDelta = helpful ? 1 : (userVote === 'helpful' ? -1 : 0);
      const totalDelta = userVote === null ? 1 : 0;
      
      setUserVote(newVote);
      setVoteCounts(prev => ({
        helpful: prev.helpful + helpfulDelta,
        total: prev.total + totalDelta
      }));
    }

    onVoteHelpful?.(review.id, helpful);
  };

  const helpfulnessPercentage = voteCounts.total > 0 
    ? Math.round((voteCounts.helpful / voteCounts.total) * 100) 
    : 0;

  const shouldShowExpand = review.content.length > 300;
  const displayContent = isExpanded ? review.content : review.contentPreview;

  return (
    <Card className={`vanguard-card p-6 ${className}`}>
      {/* Reviewer Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <Avatar className="w-12 h-12 border-2 border-[var(--border-subtle)]">
          {review.reviewer.avatar ? (
            <ImageWithFallback
              src={review.reviewer.avatar}
              alt={review.reviewer.displayName || review.reviewer.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center">
              <span className="text-white font-semibold">
                {(review.reviewer.displayName || review.reviewer.username).charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Avatar>

        {/* Reviewer Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-[var(--text-primary)] truncate">
              {review.reviewer.displayName || review.reviewer.username}
            </h4>
            {review.reviewer.verified && (
              <Check className="w-4 h-4 text-[var(--accent-green)]" />
            )}
          </div>

          {/* Reviewer Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {review.reviewer.badges.map((badge) => (
              <ReviewerBadgeComponent key={badge.id} badge={badge} />
            ))}
          </div>

          {/* Reviewer Stats */}
          <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)]">
            <span>{review.reviewer.totalReviews} 評論</span>
            <span>{review.reviewer.helpfulVotes} 讚同</span>
            <span>遊戲時長: {formatPlaytime(review.playtime)}</span>
          </div>
        </div>

        {/* Review Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport?.(review.id)}
            className="vanguard-btn-ghost w-8 h-8 p-0"
          >
            <Flag className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="vanguard-btn-ghost w-8 h-8 p-0"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Review Header */}
      <div className="mb-4">
        {/* Rating and Recommendation */}
        <div className="flex items-center space-x-4 mb-3">
          <RatingStars rating={review.rating} size="md" />
          <div className="flex items-center space-x-2">
            {review.recommended ? (
              <Badge className="modern-badge modern-badge-green">
                <ThumbsUp className="w-3 h-3 mr-1" />
                推薦
              </Badge>
            ) : (
              <Badge className="modern-badge modern-badge-cyan">
                <ThumbsDown className="w-3 h-3 mr-1" />
                不推薦
              </Badge>
            )}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            {formatReviewDate(review.createdAt)}
          </div>
        </div>

        {/* Review Title */}
        {review.title && (
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {review.title}
          </h3>
        )}

        {/* Platform and Version Info */}
        <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)] mb-3">
          <span>{review.platform}</span>
          {review.gameVersion && <span>版本 {review.gameVersion}</span>}
          <span>來源: {review.source}</span>
          {review.purchaseType === 'verified' && (
            <Badge className="modern-badge modern-badge-green text-xs">
              <Check className="w-3 h-3 mr-1" />
              已驗證購買
            </Badge>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.hasSpoilers && !showSpoilers ? (
          <div className="bg-[var(--slate-medium)] border border-[var(--border-subtle)] rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <EyeOff className="w-5 h-5 text-[var(--text-muted)]" />
              <span className="font-medium text-[var(--text-secondary)]">此評論包含劇透</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSpoilers(true)}
              className="vanguard-btn-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              顯示內容
            </Button>
          </div>
        ) : (
          <div className="text-[var(--text-secondary)] leading-relaxed">
            <p>{displayContent}</p>
            
            {shouldShowExpand && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="vanguard-btn-ghost mt-2 p-0 h-auto"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    顯示較少
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    閱讀更多
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Media Content */}
        {review.hasMedia && review.mediaContent && review.mediaContent.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {review.mediaContent.map((media) => (
                <div key={media.id} className="relative aspect-video bg-[var(--slate-medium)] rounded-lg overflow-hidden group cursor-pointer">
                  <ImageWithFallback
                    src={media.thumbnail || media.url}
                    alt={media.caption || '評論媒體'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  {media.type === 'image' && (
                    <div className="absolute top-2 right-2">
                      <ImageIcon className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {review.tags.map((tag) => (
              <Badge key={tag} className="modern-badge modern-badge-blue text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Developer Response */}
      {review.developerResponse && (
        <div className="mb-4">
          <Separator className="mb-4" />
          <div className="bg-[var(--slate-medium)] border border-[var(--accent-blue)] rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-[var(--accent-blue)]" />
              <span className="font-semibold text-[var(--accent-blue)]">
                {review.developerResponse.author}
              </span>
              <Badge className="modern-badge modern-badge-blue text-xs">
                {review.developerResponse.authorTitle}
              </Badge>
              {review.developerResponse.verified && (
                <Check className="w-4 h-4 text-[var(--accent-green)]" />
              )}
            </div>
            <p className="text-[var(--text-secondary)] mb-2">
              {review.developerResponse.content}
            </p>
            <div className="text-xs text-[var(--text-muted)]">
              {formatReviewDate(review.developerResponse.createdAt)}
            </div>
          </div>
        </div>
      )}

      {/* Review Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
        {/* Helpfulness Voting */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--text-secondary)]">這篇評論有幫助嗎？</span>
            <div className="flex items-center space-x-1">
              <Button
                variant={userVote === 'helpful' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleVote(true)}
                className={`${userVote === 'helpful' ? 'vanguard-btn-primary' : 'vanguard-btn-ghost'} text-xs px-3 py-1`}
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                有用
              </Button>
              <Button
                variant={userVote === 'not-helpful' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleVote(false)}
                className={`${userVote === 'not-helpful' ? 'vanguard-btn-primary' : 'vanguard-btn-ghost'} text-xs px-3 py-1`}
              >
                <ThumbsDown className="w-3 h-3 mr-1" />
                沒用
              </Button>
            </div>
          </div>

          {voteCounts.total > 0 && (
            <div className="text-sm text-[var(--text-muted)]">
              {voteCounts.helpful} / {voteCounts.total} 人認為有幫助 ({helpfulnessPercentage}%)
            </div>
          )}
        </div>

        {/* Reply Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReply?.(review.id)}
          className="vanguard-btn-ghost"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          回覆 ({review.replyCount})
        </Button>
      </div>

      {/* Edit Indicator */}
      {review.isEdited && (
        <div className="text-xs text-[var(--text-muted)] mt-2">
          此評論已編輯 · 最後更新於 {review.updatedAt ? formatReviewDate(review.updatedAt) : '未知'}
        </div>
      )}
    </Card>
  );
}