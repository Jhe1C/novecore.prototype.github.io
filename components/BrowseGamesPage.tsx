import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useWishlist } from './WishlistContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  X,
  Calendar,
  DollarSign,
  Users,
  Gamepad2,
  Eye,
  Info
} from 'lucide-react';
import { 
  GAME_DATABASE, 
  searchGames, 
  getGamesByGenre, 
  getDiscountedGames,
  GENRE_COLLECTIONS,
  GameData 
} from './GameDatabase';
import { toast } from 'sonner@2.0.3';

interface BrowseGamesPageProps {
  onGameSelect: (game: GameData) => void;
  onAddToCart: (game: GameData) => void;
}

interface FilterState {
  genre: string;
  priceRange: [number, number];
  rating: number;
  platform: string;
  tags: string[];
}

const INITIAL_FILTERS: FilterState = {
  genre: 'all',
  priceRange: [0, 100],
  rating: 0,
  platform: 'all',
  tags: []
};

const SORT_OPTIONS = [
  { value: 'relevance', label: '相關性' },
  { value: 'newest', label: '最新發布' },
  { value: 'oldest', label: '發布較早' },
  { value: 'price-low', label: '價格：低到高' },
  { value: 'price-high', label: '價格：高到低' },
  { value: 'rating', label: '評分最高' },
  { value: 'popularity', label: '最受歡迎' }
];

const GENRES = [
  'all', 'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 
  'Sports', 'Racing', 'Puzzle', 'Platform', 'Shooter', 'Fighting',
  'Open World', 'FPS', 'Sandbox', 'Superhero', 'Sci-Fi'
];

const POPULAR_TAGS = [
  'Open World', 'Story Rich', 'RPG', 'Action', 'Adventure', 'Fantasy',
  'Sci-fi', 'Cyberpunk', 'Western', 'Third Person', 'First Person',
  'Character Customization', 'Choices Matter', 'Magic', 'Multiplayer',
  'Single Player', 'Co-op', 'Competitive', 'Building', 'Survival'
];

function GameCard({ game, onSelect, onAddToCart, viewMode, index, pageIndex }: {
  game: GameData;
  onSelect: (game: GameData) => void;
  onAddToCart: (game: GameData) => void;
  viewMode: 'grid' | 'list';
  index: number;
  pageIndex: number;
}) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  
  const inWishlist = isInWishlist(game.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistAnimating(true);
    
    if (inWishlist) {
      removeFromWishlist(game.id);
      toast.success(`已從願望清單移除${game.titleCN || game.title}`, {
        description: "遊戲已從您的願望清單中移除",
        duration: 2000,
      });
    } else {
      // Convert GameData to WishlistGame format
      const wishlistGame = {
        id: game.id,
        title: game.titleCN || game.title,
        price: game.price.toString(),
        originalPrice: game.originalPrice?.toString(),
        image: game.coverImage,
        rating: game.rating,
        drmType: 'Platform' as const, // Default DRM type
        platforms: game.platforms.map(p => {
          switch (p.toLowerCase()) {
            case 'windows': return 'Windows' as const;
            case 'mac': case 'macos': return 'Mac' as const;
            case 'linux': return 'Linux' as const;
            default: return 'Windows' as const;
          }
        }).filter((p, i, arr) => arr.indexOf(p) === i), // Remove duplicates
        discount: game.discount,
        genre: game.genre[0] || 'Action',
        isReleased: !game.isEarlyAccess,
        releaseDate: new Date(game.releaseDate)
      };
      
      addToWishlist(wishlistGame);
      toast.success(`已加入願望清單${game.titleCN || game.title}`, {
        description: "遊戲已加入您的願望清單",
        action: {
          label: "查看願望清單",
          onClick: () => {
            window.dispatchEvent(new CustomEvent('navigate-to-wishlist'));
          },
        },
        duration: 3000,
      });
    }

    setTimeout(() => setIsWishlistAnimating(false), 600);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(game);
  };

  const handleGameDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(game);
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="vanguard-card p-4 cursor-pointer transition-all duration-200 hover:border-[var(--accent-blue)] hover-cyber-glow"
        onClick={() => onSelect(game)}
      >
        <div className="flex space-x-4">
          {/* Game Cover - Fixed with proper rounded corners and overflow */}
          <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg group">
            <ImageWithFallback
              src={game.coverImage}
              alt={game.titleCN || game.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Game Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 mb-1">
                  {game.titleCN || game.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-1">
                  {game.developer} • {game.publisher}
                </p>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
                    <span className="text-sm">{game.rating}</span>
                    <span className="text-xs text-[var(--text-muted)]">
                      ({game.reviewCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(game.releaseDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wishlist Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleWishlistToggle}
                className={`transition-all duration-300 bg-transparent border-[var(--border-subtle)] hover:border-[var(--accent-orange)] ${
                  inWishlist 
                    ? 'text-[var(--accent-orange)] bg-[var(--accent-orange)]/20 border-[var(--accent-orange)]' 
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/10'
                } ${isWishlistAnimating ? 'wishlist-bounce' : ''}`}
              >
                <Heart className={`w-4 h-4 transition-all duration-300 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
              {game.shortDescriptionCN || game.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {game.genre.slice(0, 3).map((genre, genreIndex) => (
                <Badge key={`${game.id}-genre-${genreIndex}`} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {game.tags.slice(0, 2).map((tag, tagIndex) => (
                <Badge key={`${game.id}-tag-${tagIndex}`} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Bottom Row - Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {game.discount && game.originalPrice ? (
                  <>
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                    <span className="font-semibold text-[var(--accent-green)]">
                      ${game.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-[var(--text-primary)]">
                    ${game.price.toFixed(2)}
                  </span>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                className="vanguard-btn-primary"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                加入購物車
              </Button>
            </div>

            {/* Wishlist indicator - Shows when item is in wishlist */}
            {inWishlist && (
              <div className="flex items-center space-x-1 text-xs text-[var(--accent-orange)] pt-2">
                <Heart className="w-3 h-3 fill-current" />
                <span>在願望清單中</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Grid view - Updated with three action buttons on hover
  return (
    <Card 
      className="vanguard-card group cursor-pointer transition-all duration-300 hover:border-[var(--accent-blue)] hover-cyber-glow"
      onClick={() => onSelect(game)}
    >
      <div className="relative">
        {/* Game Cover - Fixed with proper rounded corners and overflow */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={game.coverImage}
            alt={game.titleCN || game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {game.discount && game.discount > 0 && (
            <Badge className="absolute top-2 left-2 modern-badge modern-badge-green text-[rgba(16,185,129,1)]">
              -{game.discount}%
            </Badge>
          )}

          {/* New Release / Best Seller Badges */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {game.isNewRelease && (
              <Badge className="modern-badge modern-badge-orange text-xs">
                新作
              </Badge>
            )}
            {game.isBestSeller && (
              <Badge className="modern-badge modern-badge-cyan text-xs">
                暢銷
              </Badge>
            )}
          </div>

          {/* Hover Overlay with three action buttons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              {/* Details Button */}
              <Button
                onClick={handleGameDetails}
                size="sm"
                variant="outline"
                className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10"
              >
                <Info className="w-4 h-4" />
              </Button>
              
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="vanguard-btn-primary"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
              
              {/* Wishlist Button */}
              <Button
                onClick={handleWishlistToggle}
                size="sm"
                variant="outline"
                className={`transition-all duration-300 bg-black/50 backdrop-blur-sm border-white/20 hover:border-[var(--accent-orange)] ${
                  inWishlist 
                    ? 'text-[var(--accent-orange)] bg-[var(--accent-orange)]/20 border-[var(--accent-orange)]' 
                    : 'text-white hover:text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/10'
                } ${isWishlistAnimating ? 'wishlist-bounce' : ''}`}
              >
                <Heart className={`w-4 h-4 transition-all duration-300 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Game Info - 保持穩定，不會移動 */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent-blue)] transition-colors duration-200" title={game.titleCN || game.title}>
            {game.titleCN || game.title}
          </h3>
          
          <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
            {game.developer}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
            <span className="text-sm text-[var(--text-primary)]">{game.rating}</span>
            <span className="text-xs text-[var(--text-muted)]">
              ({game.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {game.genre.slice(0, 2).map((genre, genreIndex) => (
              <Badge key={`${game.id}-grid-genre-${genreIndex}`} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {game.discount && game.originalPrice ? (
                <>
                  <span className="text-xs text-[var(--text-muted)] line-through">
                    ${game.originalPrice.toFixed(2)}
                  </span>
                  <span className="font-semibold text-[var(--accent-green)]">
                    ${game.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-[var(--text-primary)]">
                  ${game.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Wishlist indicator - Shows when item is in wishlist */}
          {inWishlist && (
            <div className="flex items-center space-x-1 text-xs text-[var(--accent-orange)] pt-2">
              <Heart className="w-3 h-3 fill-current" />
              <span>在願望清單中</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function BrowseGamesPage({ onGameSelect, onAddToCart }: BrowseGamesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 24;

  // Filter and search games
  const filteredGames = useMemo(() => {
    let games = GAME_DATABASE;

    // Search
    if (searchQuery.trim()) {
      games = searchGames(searchQuery);
    }

    // Genre filter
    if (filters.genre !== 'all') {
      games = games.filter(game => 
        game.genre.some(g => g.toLowerCase() === filters.genre.toLowerCase())
      );
    }

    // Price filter
    games = games.filter(game => {
      return game.price >= filters.priceRange[0] && game.price <= filters.priceRange[1];
    });

    // Rating filter
    if (filters.rating > 0) {
      games = games.filter(game => game.rating >= filters.rating);
    }

    // Platform filter
    if (filters.platform !== 'all') {
      games = games.filter(game => 
        game.platforms.some(p => p.toLowerCase().includes(filters.platform.toLowerCase()))
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      games = games.filter(game =>
        filters.tags.some(tag => 
          game.tags.some(gameTag => 
            gameTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        games.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'oldest':
        games.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        break;
      case 'price-low':
        games.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        games.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        games.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        games.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return games;
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    updateFilter('tags', newTags);
  };

  return (
    <div className="container mx-auto px-6 py-8 content-width">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          瀏覽遊戲
        </h1>
        <p className="text-[var(--text-secondary)]">
          從我們豐富的遊戲目錄中探索你的下一款最愛遊戲
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <Input
            placeholder="搜尋遊戲、開發商、類型..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="排序方式" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View Mode */}
        <div className="flex border border-[var(--border-subtle)] rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="vanguard-btn-secondary"
        >
          <Filter className="w-4 h-4 mr-2" />
          篩選
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="vanguard-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Genre Filter */}
            <div>
              <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                遊戲類型
              </label>
              <Select value={filters.genre} onValueChange={(value) => updateFilter('genre', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="所有類型" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? '所有類型' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                價格範圍: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                最低評分: {filters.rating}+
              </label>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => updateFilter('rating', value[0])}
                max={5}
                step={0.5}
                className="mt-2"
              />
            </div>

            {/* Platform Filter */}
            <div>
              <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
                平台
              </label>
              <Select value={filters.platform} onValueChange={(value) => updateFilter('platform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="所有平台" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有平台</SelectItem>
                  <SelectItem value="windows">Windows</SelectItem>
                  <SelectItem value="playstation">PlayStation</SelectItem>
                  <SelectItem value="xbox">Xbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">
              標籤
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag, tagIndex) => (
                <button
                  key={`filter-tag-${tag}-${tagIndex}`}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)] text-white'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-blue)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="vanguard-btn-ghost"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                清除所有
              </Button>
              <span className="text-sm text-[var(--text-muted)]">
                找到 {filteredGames.length} 款遊戲
              </span>
            </div>
            <Button
              onClick={() => setShowFilters(false)}
              className="vanguard-btn-primary"
              size="sm"
            >
              套用篩選
            </Button>
          </div>
        </Card>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {searchQuery ? `「${searchQuery}」的搜尋結果` : '所有遊戲'}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            顯示 {startIndex + 1}-{Math.min(startIndex + gamesPerPage, filteredGames.length)} / 共 {filteredGames.length} 款遊戲
          </p>
        </div>
      </div>

      {/* Games Grid/List */}
      {paginatedGames.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            : "space-y-4 mb-8"
        }>
          {paginatedGames.map((game, index) => (
            <GameCard
              key={`browse-page-${currentPage}-${game.id}-${index}`} // Use page, game ID, and index for unique keys
              game={game}
              onSelect={onGameSelect}
              onAddToCart={onAddToCart}
              viewMode={viewMode}
              index={index}
              pageIndex={currentPage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Gamepad2 className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            找不到相關遊戲
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            請嘗試調整搜尋條件或篩選器
          </p>
          <Button onClick={clearFilters} className="vanguard-btn-primary">
            清除篩選
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="vanguard-btn-secondary"
          >
            上一頁
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <Button
                key={`pagination-${pageNum}`}
                variant={pageNum === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                className={pageNum === currentPage ? "vanguard-btn-primary" : "vanguard-btn-secondary"}
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="vanguard-btn-secondary"
          >
            下一頁
          </Button>
        </div>
      )}
    </div>
  );
}