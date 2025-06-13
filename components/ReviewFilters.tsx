import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ReviewFilters as ReviewFiltersType, REVIEW_SORT_OPTIONS } from './ReviewSystem';
import { 
  Search, 
  X, 
  RotateCcw
} from 'lucide-react';

interface ReviewFiltersProps {
  filters: ReviewFiltersType;
  onFiltersChange: (filters: ReviewFiltersType) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  totalReviews: number;
  filteredReviews: number;
  className?: string;
}

export function ReviewFilters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  totalReviews,
  filteredReviews,
  className = ''
}: ReviewFiltersProps) {
  const updateFilters = (newFilters: Partial<ReviewFiltersType>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = !!filters.keyword;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Sort */}
      <Card className="vanguard-card p-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <Input
              type="search"
              placeholder="搜尋評論內容..."
              value={filters.keyword || ''}
              onChange={(e) => updateFilters({ keyword: e.target.value || undefined })}
              className="pl-10 bg-[var(--slate-medium)] border-[var(--border-subtle)]"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-[var(--slate-medium)] border-[var(--border-subtle)]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              {REVIEW_SORT_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary and Active Filters */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-subtle)]">
          <div className="text-sm text-[var(--text-secondary)]">
            顯示 {filteredReviews.toLocaleString()} / {totalReviews.toLocaleString()} 則評論
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              {filters.keyword && (
                <Badge className="modern-badge modern-badge-blue text-xs">
                  搜尋: "{filters.keyword}"
                  <button
                    onClick={() => updateFilters({ keyword: undefined })}
                    className="ml-1 hover:bg-white/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="vanguard-btn-ghost text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                清除
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}