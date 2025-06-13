import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useWishlist } from './WishlistContext';
import { GameData, getGameById } from './GameDatabase';
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  X, 
  Search,
  Filter,
  SortAsc,
  Calendar,
  DollarSign,
  TrendingUp,
  Grid3X3,
  List,
  Download,
  Users,
  Clock,
  Gamepad2,
  Sparkles,
  Package,
  ArrowRight,
  Eye,
  Share
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface WishlistPageProps {
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
}

interface WishlistFilters {
  search: string;
  genres: string[];
  priceRange: 'all' | 'free' | 'under20' | 'under50' | 'over50';
  availability: 'all' | 'available' | 'coming-soon';
}

const SORT_OPTIONS = [
  { value: 'date-added', label: 'Date Added (Newest)' },
  { value: 'date-added-old', label: 'Date Added (Oldest)' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' }
];

const GENRE_OPTIONS = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Puzzle',
  'Racing', 'Sports', 'Platformer', 'Fighting', 'Shooter', 'Horror',
  'Indie', 'Casual', 'Arcade'
];

export function WishlistPage({ onGameSelect, onAddToCart }: WishlistPageProps) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date-added');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState<WishlistFilters>({
    search: '',
    genres: [],
    priceRange: 'all',
    availability: 'all'
  });

  // Convert wishlist items to GameData format by fetching from database
  const wishlistGames: GameData[] = wishlistItems.map(item => {
    const gameData = getGameById(item.id);
    if (gameData) {
      return gameData;
    }
    
    // Fallback: create GameData from WishlistGame
    return {
      id: item.id,
      title: item.title,
      titleCN: item.title,
      developer: 'Unknown Developer',
      publisher: 'Unknown Publisher',
      price: parseFloat(item.price) || 0,
      originalPrice: item.originalPrice ? parseFloat(item.originalPrice) : undefined,
      discount: item.discount,
      rating: item.rating,
      reviewCount: 0,
      genre: [item.genre],
      tags: [item.genre],
      platforms: item.platforms,
      releaseDate: item.releaseDate?.toISOString() || new Date().toISOString(),
      coverImage: item.image,
      screenshots: [item.image],
      shortDescription: `${item.title} - A great gaming experience awaits!`,
      description: `${item.title} offers an incredible gaming experience with stunning visuals and engaging gameplay.`,
      features: [],
      systemRequirements: {
        minimum: {
          os: 'Windows 10',
          processor: 'Intel Core i5',
          memory: '8 GB RAM',
          graphics: 'DirectX 11 compatible',
          storage: '25 GB available space'
        },
        recommended: {
          os: 'Windows 11',
          processor: 'Intel Core i7',
          memory: '16 GB RAM',
          graphics: 'DirectX 12 compatible',
          storage: '25 GB available space'
        }
      },
      isNewRelease: false,
      isBestSeller: false,
      isEarlyAccess: !item.isReleased,
      multiplayer: false,
      achievements: 0,
      playtime: '10+ hours',
      languages: ['English', '中文']
    };
  });

  // Filter and sort wishlist items
  const filteredAndSortedItems = (() => {
    let filtered = [...wishlistGames];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(game => 
        (game.titleCN && game.titleCN.toLowerCase().includes(filters.search.toLowerCase())) ||
        game.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        game.developer.toLowerCase().includes(filters.search.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply genre filter
    if (filters.genres.length > 0) {
      filtered = filtered.filter(game =>
        filters.genres.some(genre => game.genre.includes(genre) || game.tags.includes(genre))
      );
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(game => {
        const price = game.discount && game.originalPrice
          ? game.price
          : game.price;
        
        switch (filters.priceRange) {
          case 'free':
            return price === 0;
          case 'under20':
            return price > 0 && price < 20;
          case 'under50':
            return price >= 20 && price < 50;
          case 'over50':
            return price >= 50;
          default:
            return true;
        }
      });
    }

    // Apply availability filter
    if (filters.availability !== 'all') {
      filtered = filtered.filter(game => {
        switch (filters.availability) {
          case 'available':
            return !game.isEarlyAccess;
          case 'coming-soon':
            return game.isEarlyAccess;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-added-old':
        // Find the corresponding wishlist item for date comparison
        filtered.sort((a, b) => {
          const itemA = wishlistItems.find(item => item.id === a.id);
          const itemB = wishlistItems.find(item => item.id === b.id);
          if (!itemA || !itemB) return 0;
          return itemA.addedDate.getTime() - itemB.addedDate.getTime();
        });
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.discount && a.originalPrice ? a.price : a.price;
          const priceB = b.discount && b.originalPrice ? b.price : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.discount && a.originalPrice ? a.price : a.price;
          const priceB = b.discount && b.originalPrice ? b.price : b.price;
          return priceB - priceA;
        });
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-az':
        filtered.sort((a, b) => (a.titleCN || a.title).localeCompare(b.titleCN || b.title));
        break;
      case 'name-za':
        filtered.sort((a, b) => (b.titleCN || b.title).localeCompare(a.titleCN || a.title));
        break;
      default: // date-added
        // Find the corresponding wishlist item for date comparison
        filtered.sort((a, b) => {
          const itemA = wishlistItems.find(item => item.id === a.id);
          const itemB = wishlistItems.find(item => item.id === b.id);
          if (!itemA || !itemB) return 0;
          return itemB.addedDate.getTime() - itemA.addedDate.getTime();
        });
        break;
    }

    return filtered;
  })();

  const handleRemoveFromWishlist = async (gameId: string) => {
    try {
      removeFromWishlist(gameId);
      setSelectedItems(prev => prev.filter(id => id !== gameId));
      
      const game = wishlistGames.find(g => g.id === gameId);
      if (game) {
        toast.success(`已從願望清單移除${game.titleCN || game.title}`, {
          description: "遊戲已從您的願望清單中移除",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("無法從願望清單移除", {
        description: "請重試或聯繫客服支援。",
        duration: 3000,
      });
    }
  };

  const handleBulkRemove = async () => {
    if (selectedItems.length === 0) return;

    try {
      selectedItems.forEach(gameId => {
        removeFromWishlist(gameId);
      });
      
      setSelectedItems([]);
      toast.success(`已從願望清單移除 ${selectedItems.length} 款遊戲`, {
        description: "選定的遊戲已被移除",
        duration: 3000,
      });
    } catch (error) {
      toast.error("無法移除遊戲", {
        description: "請重試或聯繫客服支援。",
        duration: 3000,
      });
    }
  };

  const handleBulkAddToCart = () => {
    if (selectedItems.length === 0) return;

    selectedItems.forEach(gameId => {
      const game = wishlistGames.find(g => g.id === gameId);
      if (game && onAddToCart) {
        onAddToCart(game);
      }
    });

    setSelectedItems([]);
    toast.success(`已將 ${selectedItems.length} 款遊戲加入購物車！`, {
      description: "選定的遊戲已加入您的購物車",
      action: {
        label: "查看購物車",
        onClick: () => {
          window.dispatchEvent(new CustomEvent('navigate-to-cart'));
        },
      },
      duration: 4000,
    });
  };

  const toggleItemSelection = (gameId: string) => {
    setSelectedItems(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems.map(game => game.id));
    }
  };

  const updateFilter = (key: keyof WishlistFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.genres.length > 0) count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.availability !== 'all') count++;
    return count;
  };

  // Empty state component
  const EmptyWishlist = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-purple)]/20 rounded-full flex items-center justify-center mb-8 relative">
        <Heart className="w-16 h-16 text-[var(--accent-blue)] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--accent-purple)]/10 rounded-full animate-pulse" />
      </div>
      
      <h3 className="text-2xl mb-4 text-gradient">您的願望清單是空的</h3>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md">
        探索精彩的遊戲並將它們加入願望清單，隨時追蹤您想要遊玩的遊戲。
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-browse'))}
          className="vanguard-btn-primary group"
        >
          <Gamepad2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          瀏覽遊戲
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-free-zone'))}
          className="vanguard-btn-secondary"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          免費遊戲
        </Button>
      </div>
    </div>
  );

  // Wishlist item component
  const WishlistItem = ({ game, isSelected }: { game: GameData; isSelected: boolean }) => {
    const finalPrice = game.discount && game.originalPrice
      ? game.price
      : game.price;

    if (viewMode === 'list') {
      return (
        <Card className="vanguard-card overflow-hidden hover:shadow-glow transition-all duration-300 group">
          <div className="flex items-center p-4">
            {/* Selection Checkbox */}
            <div className="mr-4">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleItemSelection(game.id)}
                className="w-4 h-4"
              />
            </div>

            {/* Game Cover */}
            <div className="relative w-16 h-24 flex-shrink-0 mr-4">
              <ImageWithFallback
                src={game.coverImage}
                alt={`${game.titleCN || game.title} cover`}
                className="w-full h-full object-cover rounded cursor-pointer"
                onClick={() => onGameSelect?.(game)}
              />
              {game.discount && (
                <Badge className="absolute -top-1 -right-1 modern-badge modern-badge-green text-xs px-1 py-0">
                  -{game.discount}%
                </Badge>
              )}
            </div>

            {/* Game Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 
                    className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1 cursor-pointer hover:text-[var(--accent-blue)] transition-colors"
                    onClick={() => onGameSelect?.(game)}
                  >
                    {game.titleCN || game.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{game.developer}</p>
                  
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-[var(--accent-orange)] fill-current" />
                      <span className="text-xs font-medium">{game.rating}</span>
                    </div>
                    <Badge className="modern-badge modern-badge-blue text-xs">
                      {game.genre[0]}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {game.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-[var(--slate-medium)] text-[var(--text-muted)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="text-right">
                  <div className="mb-3">
                    <div className="text-lg font-bold text-[var(--accent-green)]">
                      ${finalPrice.toFixed(2)}
                    </div>
                    {game.discount && game.originalPrice && (
                      <div className="text-sm text-[var(--text-muted)] line-through">
                        ${game.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(game.id)}
                            className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>從願望清單移除</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      size="sm"
                      onClick={() => onAddToCart?.(game)}
                      className="vanguard-btn-primary"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    // Grid view
    return (
      <Card className="vanguard-card group cursor-pointer overflow-hidden">
        {/* Selection Checkbox */}
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleItemSelection(game.id)}
            className="w-4 h-4 bg-[var(--slate-dark)]/80 backdrop-blur-sm border-[var(--border-subtle)]"
          />
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[3/4] overflow-hidden" onClick={() => onGameSelect?.(game)}>
          <ImageWithFallback
            src={game.coverImage}
            alt={`${game.titleCN || game.title} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="sm" className="vanguard-btn-primary">
                <Eye className="w-4 h-4 mr-2" />
                查看遊戲
              </Button>
            </div>
          </div>

          {/* Remove from Wishlist */}
          <div className="absolute top-3 right-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(game.id);
                    }}
                    className="w-8 h-8 p-0 bg-[var(--slate-dark)]/80 backdrop-blur-sm border border-[var(--border-subtle)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] hover:border-[var(--destructive)]"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>從願望清單移除</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Discount Badge */}
          {game.discount && (
            <div className="absolute bottom-3 left-3">
              <Badge className="modern-badge modern-badge-green">
                -{game.discount}%
              </Badge>
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-blue)] transition-colors duration-300 line-clamp-1">
              {game.titleCN || game.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{game.developer}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
              <span className="text-sm font-medium">{game.rating}</span>
            </div>
            <Badge className="modern-badge modern-badge-blue text-xs">
              {game.genre[0]}
            </Badge>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
            <Users className="w-3 h-3" />
            <span>{game.multiplayer ? '多人遊戲' : '單人遊戲'}</span>
            {game.playtime && (
              <>
                <span>•</span>
                <span>{game.playtime}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[var(--accent-green)]">
                ${finalPrice.toFixed(2)}
              </span>
              {game.discount && game.originalPrice && (
                <span className="text-sm text-[var(--text-muted)] line-through">
                  ${game.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(game);
              }}
              className="vanguard-btn-primary"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="container mx-auto px-6 py-8 content-width">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-xl flex items-center justify-center cosmic-glow">
            <Heart className="w-7 h-7 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-4xl mb-2 text-gradient">我的願望清單</h1>
            <p className="text-[var(--text-secondary)]">
              {wishlistItems.length} 款遊戲在您的願望清單中
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                placeholder="搜尋願望清單..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10 w-64 bg-[var(--slate-medium)] border-[var(--border-subtle)]"
              />
            </div>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="vanguard-btn-secondary"
            >
              <Filter className="w-4 h-4 mr-2" />
              篩選器
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 modern-badge modern-badge-blue">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-[var(--text-muted)]" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-[var(--slate-medium)] border-[var(--border-subtle)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[var(--slate-dark)] border-[var(--border-subtle)]">
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'vanguard-btn-primary' : 'vanguard-btn-ghost'}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'vanguard-btn-primary' : 'vanguard-btn-ghost'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <Card className="vanguard-card p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Genre Filter */}
              <div>
                <h4 className="font-medium mb-3">遊戲類型</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {GENRE_OPTIONS.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={filters.genres.includes(genre)}
                        onCheckedChange={(checked) => {
                          const newGenres = checked
                            ? [...filters.genres, genre]
                            : filters.genres.filter(g => g !== genre);
                          updateFilter('genres', newGenres);
                        }}
                      />
                      <label 
                        htmlFor={`genre-${genre}`} 
                        className="text-sm cursor-pointer"
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">價格區間</h4>
                <Select 
                  value={filters.priceRange} 
                  onValueChange={(value) => updateFilter('priceRange', value)}
                >
                  <SelectTrigger className="bg-[var(--slate-medium)] border-[var(--border-subtle)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--slate-dark)] border-[var(--border-subtle)]">
                    <SelectItem value="all">所有價格</SelectItem>
                    <SelectItem value="free">免費</SelectItem>
                    <SelectItem value="under20">$20 以下</SelectItem>
                    <SelectItem value="under50">$20 - $50</SelectItem>
                    <SelectItem value="over50">$50 以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div>
                <h4 className="font-medium mb-3">可用性</h4>
                <Select 
                  value={filters.availability} 
                  onValueChange={(value) => updateFilter('availability', value)}
                >
                  <SelectTrigger className="bg-[var(--slate-medium)] border-[var(--border-subtle)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--slate-dark)] border-[var(--border-subtle)]">
                    <SelectItem value="all">所有遊戲</SelectItem>
                    <SelectItem value="available">現已推出</SelectItem>
                    <SelectItem value="coming-soon">即將推出</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Card className="vanguard-card p-4 mb-6 border-[var(--accent-blue)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedItems.length === filteredAndSortedItems.length}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="font-medium">
                  已選擇 {selectedItems.length} / {filteredAndSortedItems.length} 款遊戲
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkRemove}
                  className="vanguard-btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  移除選定項目
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleBulkAddToCart}
                  className="vanguard-btn-primary"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  加入購物車
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Games Grid/List */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-purple)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-[var(--accent-blue)] opacity-30" />
          </div>
          <h3 className="text-xl mb-2">沒有找到符合條件的遊戲</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            請嘗試調整您的搜尋條件或篩選器。
          </p>
          <Button
            onClick={() => {
              setFilters({
                search: '',
                genres: [],
                priceRange: 'all',
                availability: 'all'
              });
              setShowFilters(false);
            }}
            className="vanguard-btn-primary"
          >
            清除篩選器
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' 
          : 'space-y-4'
        }>
          {filteredAndSortedItems.map((game) => (
            <WishlistItem
              key={game.id}
              game={game}
              isSelected={selectedItems.includes(game.id)}
            />
          ))}
        </div>
      )}

      {/* Clear Wishlist Button */}
      {wishlistItems.length > 0 && (
        <div className="mt-12 text-center pt-8 border-t border-[var(--border-subtle)]">
          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm('確定要清空整個願望清單嗎？此動作無法復原。')) {
                clearWishlist();
                toast.success('願望清單已清空', {
                  description: '所有遊戲已從您的願望清單中移除',
                  duration: 3000,
                });
              }
            }}
            className="text-[var(--destructive)] border-[var(--destructive)] hover:bg-[var(--destructive)]/10"
          >
            <X className="w-4 h-4 mr-2" />
            清空願望清單
          </Button>
        </div>
      )}
    </div>
  );
}