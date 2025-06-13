import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ReviewCard } from './ReviewCard';
import { ReviewOverview } from './ReviewOverview';
import { ReviewFilters } from './ReviewFilters';
import { 
  Review, 
  ReviewFilters as ReviewFiltersType, 
  filterReviews, 
  sortReviews,
  MOCK_REVIEWS 
} from './ReviewSystem';
import { MessageCircle, Plus, Loader2 } from 'lucide-react';

interface ReviewListProps {
  gameId: string;
  reviews?: Review[];
  onWriteReview?: () => void;
  className?: string;
}

export function ReviewList({ 
  gameId, 
  reviews = MOCK_REVIEWS, 
  onWriteReview,
  className = '' 
}: ReviewListProps) {
  const [filters, setFilters] = useState<ReviewFiltersType>({});
  const [sortBy, setSortBy] = useState('helpful');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const REVIEWS_PER_PAGE = 10;

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    const gameReviews = reviews.filter(review => review.gameId === gameId);
    const filtered = filterReviews(gameReviews, filters);
    return sortReviews(filtered, sortBy);
  }, [reviews, gameId, filters, sortBy]);

  // Paginate reviews
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    return filteredAndSortedReviews.slice(startIndex, endIndex);
  }, [filteredAndSortedReviews, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedReviews.length / REVIEWS_PER_PAGE);
  const allGameReviews = reviews.filter(review => review.gameId === gameId);

  const handleVoteHelpful = (reviewId: string, helpful: boolean) => {
    console.log(`Vote ${helpful ? 'helpful' : 'not helpful'} for review ${reviewId}`);
    // Implement voting logic here
  };

  const handleReport = (reviewId: string) => {
    console.log(`Report review ${reviewId}`);
    // Implement reporting logic here
  };

  const handleReply = (reviewId: string) => {
    console.log(`Reply to review ${reviewId}`);
    // Implement reply logic here
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  // Reset page when filters change
  const handleFiltersChange = (newFilters: ReviewFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  if (allGameReviews.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="vanguard-card p-8 text-center">
          <div className="w-16 h-16 bg-[var(--slate-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            尚無評論
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            成為第一個評論這款遊戲的玩家！分享你的遊戲體驗。
          </p>
          {onWriteReview && (
            <Button onClick={onWriteReview} className="vanguard-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              撰寫評論
            </Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Review Overview */}
      <ReviewOverview reviews={allGameReviews} />

      {/* Write Review Button */}
      {onWriteReview && (
        <div className="flex justify-center">
          <Button onClick={onWriteReview} className="vanguard-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            撰寫評論
          </Button>
        </div>
      )}

      {/* Filters and Sorting */}
      <ReviewFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalReviews={allGameReviews.length}
        filteredReviews={filteredAndSortedReviews.length}
      />

      {/* Reviews List */}
      {filteredAndSortedReviews.length === 0 ? (
        <Card className="vanguard-card p-8 text-center">
          <div className="w-16 h-16 bg-[var(--slate-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            沒有符合條件的評論
          </h3>
          <p className="text-[var(--text-secondary)]">
            請嘗試調整篩選條件或搜尋關鍵字。
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Reviews */}
          {paginatedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onVoteHelpful={handleVoteHelpful}
              onReport={handleReport}
              onReply={handleReply}
            />
          ))}

          {/* Load More / Pagination */}
          {totalPages > 1 && (
            <div className="text-center">
              {currentPage < totalPages ? (
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="vanguard-btn-secondary"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      載入中...
                    </>
                  ) : (
                    <>
                      載入更多評論
                      <span className="ml-2 text-xs text-[var(--text-muted)]">
                        ({currentPage} / {totalPages})
                      </span>
                    </>
                  )}
                </Button>
              ) : (
                <div className="text-sm text-[var(--text-muted)] py-4">
                  已顯示所有 {filteredAndSortedReviews.length} 則評論
                </div>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center text-sm text-[var(--text-muted)] py-2">
            顯示 {Math.min(currentPage * REVIEWS_PER_PAGE, filteredAndSortedReviews.length)} / {filteredAndSortedReviews.length} 則評論
            {filteredAndSortedReviews.length !== allGameReviews.length && (
              <span> (共 {allGameReviews.length} 則)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}