import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Review } from './ReviewSystem';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Upload, 
  Eye, 
  EyeOff, 
  X, 
  Save, 
  Send, 
  AlertTriangle,
  Image as ImageIcon,
  Video
} from 'lucide-react';

interface ReviewFormProps {
  gameId: string;
  gameTitle: string;
  onSubmit: (review: Partial<Review>) => void;
  onCancel: () => void;
  existingReview?: Review;
  className?: string;
}

const COMMON_TAGS = [
  '劇情', '畫面', '音效', '操作', '難度', '多人模式', '單人遊戲', 
  '開放世界', 'RPG', '動作', '冒險', '射擊', '策略', '恐怖',
  '性價比', '優化', 'Bug', '更新', '社群', '創意', '重玩性'
];

function RatingSelector({ 
  rating, 
  onRatingChange, 
  size = 'lg' 
}: { 
  rating: number; 
  onRatingChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`${sizeClasses[size]} transition-all duration-200 hover:scale-110`}
        >
          <Star
            className={`w-full h-full ${
              star <= rating 
                ? 'text-[var(--accent-orange)] fill-current' 
                : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)]'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ 
  gameId, 
  gameTitle, 
  onSubmit, 
  onCancel, 
  existingReview,
  className = '' 
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [recommended, setRecommended] = useState(existingReview?.recommended ?? true);
  const [title, setTitle] = useState(existingReview?.title || '');
  const [content, setContent] = useState(existingReview?.content || '');
  const [playtime, setPlaytime] = useState(existingReview?.playtime?.toString() || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(existingReview?.tags || []);
  const [hasSpoilers, setHasSpoilers] = useState(existingReview?.hasSpoilers || false);
  const [isPreview, setIsPreview] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (content.trim().length < 50) {
      newErrors.content = '評論內容至少需要50個字符';
    }

    if (content.trim().length > 5000) {
      newErrors.content = '評論內容不能超過5000個字符';
    }

    if (playtime && (isNaN(Number(playtime)) || Number(playtime) < 0)) {
      newErrors.playtime = '請輸入有效的遊戲時長';
    }

    if (title.length > 100) {
      newErrors.title = '標題不能超過100個字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedMedia(prev => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData: Partial<Review> = {
        gameId,
        rating,
        recommended,
        title: title.trim() || undefined,
        content: content.trim(),
        playtime: playtime ? Number(playtime) : 0,
        tags: selectedTags,
        hasSpoilers,
        hasMedia: uploadedMedia.length > 0,
        // Note: In a real app, you'd upload media files and get URLs
        mediaContent: uploadedMedia.map((file, index) => ({
          id: `media-${index}`,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          url: URL.createObjectURL(file), // Temporary URL for preview
          caption: file.name
        }))
      };

      await onSubmit(reviewData);
    } catch (error) {
      console.error('提交評論失敗:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingLabels = {
    1: '非常差',
    2: '不推薦',
    3: '一般',
    4: '推薦',
    5: '非常棒'
  };

  return (
    <Card className={`vanguard-card ${className}`}>
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            {existingReview ? '編輯評論' : '撰寫評論'}
          </h3>
          <p className="text-[var(--text-secondary)]">
            分享你對《{gameTitle}》的遊戲體驗
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Rating and Recommendation */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
                評分 *
              </Label>
              <div className="space-y-3">
                <RatingSelector rating={rating} onRatingChange={setRating} />
                <p className="text-sm text-[var(--text-secondary)]">
                  {ratingLabels[rating as keyof typeof ratingLabels]}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
                推薦度
              </Label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setRecommended(true)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    recommended 
                      ? 'border-[var(--accent-green)] bg-[var(--accent-green)]/10 text-[var(--accent-green)]'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-green)]'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>推薦</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRecommended(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    !recommended 
                      ? 'border-[var(--destructive)] bg-[var(--destructive)]/10 text-[var(--destructive)]'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--destructive)]'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>不推薦</span>
                </button>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="review-title" className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
              評論標題 (可選)
            </Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="簡潔地總結你的遊戲體驗..."
              className="bg-[var(--slate-medium)] border-[var(--border-subtle)]"
              maxLength={100}
            />
            {errors.title && (
              <p className="text-sm text-[var(--destructive)] mt-1">{errors.title}</p>
            )}
            <div className="text-xs text-[var(--text-muted)] mt-1 text-right">
              {title.length}/100
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="review-content" className="text-sm font-medium text-[var(--text-primary)]">
                評論內容 *
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="vanguard-btn-ghost text-xs"
              >
                {isPreview ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                {isPreview ? '編輯' : '預覽'}
              </Button>
            </div>

            {isPreview ? (
              <div className="min-h-[200px] p-4 bg-[var(--slate-medium)] border border-[var(--border-subtle)] rounded-lg">
                <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {content || '在此顯示評論預覽...'}
                </div>
              </div>
            ) : (
              <Textarea
                id="review-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="詳細描述你的遊戲體驗，包括喜歡和不喜歡的地方..."
                className="min-h-[200px] bg-[var(--slate-medium)] border-[var(--border-subtle)] resize-none"
                maxLength={5000}
              />
            )}

            {errors.content && (
              <p className="text-sm text-[var(--destructive)] mt-1">{errors.content}</p>
            )}
            <div className="text-xs text-[var(--text-muted)] mt-1 text-right">
              {content.length}/5000 (最少50字符)
            </div>
          </div>

          {/* Playtime */}
          <div>
            <Label htmlFor="playtime" className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
              遊戲時長 (小時)
            </Label>
            <Input
              id="playtime"
              type="number"
              value={playtime}
              onChange={(e) => setPlaytime(e.target.value)}
              placeholder="你總共玩了多少小時？"
              className="bg-[var(--slate-medium)] border-[var(--border-subtle)] max-w-xs"
              min="0"
              step="0.5"
            />
            {errors.playtime && (
              <p className="text-sm text-[var(--destructive)] mt-1">{errors.playtime}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
              標籤 (最多選擇10個)
            </Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag)
                      ? 'modern-badge modern-badge-purple'
                      : 'modern-badge modern-badge-blue opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => selectedTags.length < 10 || selectedTags.includes(tag) ? handleTagToggle(tag) : null}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-2">
              已選擇 {selectedTags.length}/10 個標籤
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <Label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
              上傳圖片或影片 (可選)
            </Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="vanguard-btn-secondary"
                  onClick={() => document.getElementById('media-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  選擇檔案
                </Button>
                <span className="text-xs text-[var(--text-muted)]">
                  支援 JPG, PNG, GIF, MP4 格式，最大 10MB
                </span>
              </div>
              
              <input
                id="media-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />

              {uploadedMedia.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {uploadedMedia.map((file, index) => (
                    <div key={index} className="relative aspect-video bg-[var(--slate-medium)] rounded-lg overflow-hidden group">
                      <div className="w-full h-full flex items-center justify-center">
                        {file.type.startsWith('video/') ? (
                          <Video className="w-8 h-8 text-[var(--text-muted)]" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-[var(--text-muted)]" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedia(index)}
                          className="text-white hover:bg-white/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-xs text-white truncate">{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Switch
                id="spoilers"
                checked={hasSpoilers}
                onCheckedChange={setHasSpoilers}
              />
              <Label htmlFor="spoilers" className="text-sm text-[var(--text-secondary)]">
                此評論包含劇透內容
              </Label>
            </div>

            {hasSpoilers && (
              <div className="flex items-start space-x-2 p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-[var(--destructive)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--destructive)]">
                  標記為劇透的評論將默認隱藏，需要其他玩家主動點擊才能查看。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="vanguard-btn-ghost"
          >
            取消
          </Button>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              className="vanguard-btn-secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              儲存草稿
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim() || content.length < 50}
              className="vanguard-btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  提交中...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {existingReview ? '更新評論' : '發布評論'}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}