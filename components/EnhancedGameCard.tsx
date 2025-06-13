import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useWishlist } from './WishlistContext';
import { 
  Heart, 
  Star, 
  Play, 
  ShoppingCart, 
  Info, 
  Users,
  Calendar,
  Download,
  Plus,
  Check
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface GameData {
  id: string;
  title: string;
  developer: string;
  publisher?: string;
  genre: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  releaseDate: string;
  description: string;
  tags: string[];
  coverImage: string;
  screenshots?: string[];
  platforms: string[];
  drmType: 'DRM-Free' | 'Light DRM' | 'Standard DRM';
  features: string[];
  systemRequirements?: {
    minimum: string;
    recommended: string;
  };
  playerCount: string;
  estimatedPlaytime?: string;
  isWishlisted?: boolean;
}

interface EnhancedGameCardProps {
  game: GameData;
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
  variant?: 'grid' | 'list' | 'featured';
  showQuickActions?: boolean;
}

// Sample game data with enhanced imagery
export const SAMPLE_GAMES: GameData[] = [
  {
    id: '1',
    title: 'Cyber Nexus 2077',
    developer: 'NeonStorm Studios',
    publisher: 'Future Games Publishing',
    genre: 'Action RPG',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 15420,
    releaseDate: '2024-03-15',
    description: 'Immerse yourself in a dystopian cyberpunk world where technology and humanity collide.',
    tags: ['Cyberpunk', 'Open World', 'Story Rich', 'Character Customization'],
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop&q=80'
    ],
    platforms: ['Windows', 'macOS', 'Linux'],
    drmType: 'Light DRM',
    features: ['Single Player', 'Achievements', 'Cloud Saves', 'Controller Support'],
    playerCount: 'Single Player',
    estimatedPlaytime: '40-60 hours',
    isWishlisted: false
  },
  {
    id: '2',
    title: 'Mystic Realms',
    developer: 'Enchanted Pixels',
    genre: 'Fantasy RPG',
    price: 49.99,
    rating: 4.9,
    reviewCount: 8765,
    releaseDate: '2024-01-20',
    description: 'Embark on an epic fantasy adventure through mystical lands filled with magic and dragons.',
    tags: ['Fantasy', 'Magic', 'Dragons', 'Co-op'],
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&q=80',
    platforms: ['Windows', 'macOS'],
    drmType: 'DRM-Free',
    features: ['Co-op', 'Character Creation', 'Magic System', 'Open World'],
    playerCount: '1-4 Players',
    estimatedPlaytime: '80-120 hours'
  },
  {
    id: '3',
    title: 'Stellar Command',
    developer: 'Cosmic Games',
    genre: 'Space Strategy',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 12340,
    releaseDate: '2023-11-08',
    description: 'Command vast fleets across the galaxy in this epic space strategy experience.',
    tags: ['Strategy', 'Space', 'Multiplayer', 'Fleet Combat'],
    coverImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&q=80',
    platforms: ['Windows', 'macOS', 'Linux'],
    drmType: 'Standard DRM',
    features: ['Multiplayer', 'Real-time Strategy', 'Fleet Management', 'Campaign Mode'],
    playerCount: '1-8 Players',
    estimatedPlaytime: '50-100 hours'
  },
  {
    id: '4',
    title: 'Neon Racers',
    developer: 'Velocity Interactive',
    genre: 'Racing',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 9876,
    releaseDate: '2024-02-14',
    description: 'Race through futuristic cities with cutting-edge vehicles in high-speed competition.',
    tags: ['Racing', 'Multiplayer', 'Futuristic', 'Competitive'],
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop&q=80',
    platforms: ['Windows'],
    drmType: 'Light DRM',
    features: ['Online Multiplayer', 'Customization', 'Leaderboards', 'VR Support'],
    playerCount: '1-16 Players',
    estimatedPlaytime: '20-40 hours'
  },
  {
    id: '5',
    title: 'Wilderness Survival',
    developer: 'Wild Adventures',
    genre: 'Survival',
    price: 24.99,
    rating: 4.5,
    reviewCount: 5432,
    releaseDate: '2024-04-01',
    description: 'Survive in the untamed wilderness with realistic survival mechanics and crafting.',
    tags: ['Survival', 'Crafting', 'Nature', 'Realistic'],
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&q=80',
    platforms: ['Windows', 'macOS', 'Linux'],
    drmType: 'DRM-Free',
    features: ['Crafting System', 'Weather Effects', 'Day/Night Cycle', 'Mod Support'],
    playerCount: 'Single Player',
    estimatedPlaytime: '30-50 hours'
  },
  {
    id: '6',
    title: 'Pixel Warriors',
    developer: 'Retro Studios',
    genre: 'Platformer',
    price: 19.99,
    rating: 4.8,
    reviewCount: 3210,
    releaseDate: '2024-05-10',
    description: 'A nostalgic pixel art platformer with modern gameplay mechanics and design.',
    tags: ['Pixel Art', 'Platformer', 'Retro', 'Indie'],
    coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop&q=80',
    platforms: ['Windows', 'macOS', 'Linux'],
    drmType: 'DRM-Free',
    features: ['Pixel Perfect', 'Chiptune Soundtrack', 'Local Co-op', 'Level Editor'],
    playerCount: '1-2 Players',
    estimatedPlaytime: '12-20 hours'
  }
];

function getDRMColor(drmType: string) {
  switch (drmType) {
    case 'DRM-Free':
      return 'modern-badge-green';
    case 'Light DRM':
      return 'modern-badge-blue';
    case 'Standard DRM':
      return 'modern-badge-purple';
    default:
      return 'modern-badge-blue';
  }
}

export function EnhancedGameCard({ 
  game, 
  onGameSelect, 
  onAddToCart,
  variant = 'grid',
  showQuickActions = true 
}: EnhancedGameCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const isWishlisted = isInWishlist(game.id);
  const finalPrice = game.discount 
    ? (game.price * (1 - game.discount / 100))
    : game.price;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      if (isWishlisted) {
        await removeFromWishlist(game.id);
        toast.success(`Removed ${game.title} from wishlist`, {
          description: "Game removed from your wishlist",
          duration: 3000,
        });
      } else {
        await addToWishlist(game);
        toast.success(`Added ${game.title} to wishlist!`, {
          description: "Game added to your wishlist",
          action: {
            label: "View Wishlist",
            onClick: () => {
              // This would trigger navigation to wishlist page
              window.dispatchEvent(new CustomEvent('navigate-to-wishlist'));
            },
          },
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact support if the problem persists.",
        duration: 3000,
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (addingToCart) return;
    
    setAddingToCart(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onAddToCart?.(game);
    } catch (error) {
      toast.error("Failed to add to cart", {
        description: "Please try again or contact support if the problem persists.",
        duration: 3000,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleGameSelect = () => {
    onGameSelect?.(game);
  };

  if (variant === 'list') {
    return (
      <Card className="vanguard-card overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group" onClick={handleGameSelect}>
        <div className="flex">
          {/* Cover Image */}
          <div className="relative w-32 h-48 flex-shrink-0">
            <ImageWithFallback
              src={game.coverImage}
              alt={`${game.title} cover`}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {game.discount && (
              <div className="absolute top-2 left-2">
                <Badge className="modern-badge modern-badge-green text-xs">
                  -{game.discount}%
                </Badge>
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-[var(--accent-blue)] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm">{game.developer}</p>
                </div>
                {showQuickActions && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleWishlistToggle}
                          className={`p-2 transition-all duration-300 hover-cyber-glow ${
                            isWishlisted 
                              ? 'text-[var(--accent-blue)] hover:text-[var(--accent-blue)]' 
                              : 'text-[var(--text-secondary)] hover:text-[var(--accent-blue)]'
                          }`}
                        >
                          <Heart className={`w-5 h-5 transition-all duration-300 ${
                            isWishlisted 
                              ? 'fill-current scale-110' 
                              : 'hover:scale-110'
                          }`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="digital-vanguard-bg border-[var(--border-subtle)] text-[var(--text-primary)]">
                        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
                  <span className="text-sm font-medium">{game.rating}</span>
                  <span className="text-xs text-[var(--text-muted)]">({game.reviewCount.toLocaleString()})</span>
                </div>
                <Badge className={`modern-badge ${getDRMColor(game.drmType)} text-xs`}>
                  {game.drmType}
                </Badge>
                <Badge className="modern-badge modern-badge-blue text-xs">
                  {game.genre}
                </Badge>
              </div>

              <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">
                {game.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-[var(--accent-green)]">
                  ${finalPrice.toFixed(2)}
                </span>
                {game.discount && (
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    ${game.price.toFixed(2)}
                  </span>
                )}
              </div>

              {showQuickActions && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="vanguard-btn-secondary">
                    <Info className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleAddToCart} 
                    disabled={addingToCart}
                    className="vanguard-btn-primary"
                  >
                    {addingToCart ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Adding...
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="vanguard-card group cursor-pointer overflow-hidden" onClick={handleGameSelect}>
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          src={game.coverImage}
          alt={`${game.title} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button size="sm" className="vanguard-btn-primary">
              <Play className="w-4 h-4 mr-2" />
              View
            </Button>
            {showQuickActions && (
              <Button 
                size="sm" 
                onClick={handleAddToCart} 
                disabled={addingToCart}
                className="vanguard-btn-secondary"
              >
                {addingToCart ? (
                  <div className="w-4 h-4 border-2 border-[var(--accent-blue)]/30 border-t-[var(--accent-blue)] rounded-full animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {game.discount && (
            <Badge className="modern-badge modern-badge-green">
              -{game.discount}%
            </Badge>
          )}
          <Badge className={`modern-badge ${getDRMColor(game.drmType)}`}>
            {game.drmType}
          </Badge>
        </div>

        {/* Enhanced Wishlist Button */}
        {showQuickActions && (
          <div className="absolute top-3 right-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={`w-8 h-8 p-0 backdrop-blur-sm border transition-all duration-300 group/heart ${
                      isWishlisted 
                        ? 'bg-[var(--accent-blue)]/20 border-[var(--accent-blue)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/30 cyber-glow' 
                        : 'bg-[var(--slate-dark)]/80 border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--slate-medium)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-all duration-300 group-hover/heart:scale-110 ${
                      isWishlisted 
                        ? 'fill-current heart-beat' 
                        : 'group-hover/heart:fill-[var(--accent-blue)]/20'
                    }`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="digital-vanguard-bg border-[var(--border-subtle)] text-[var(--text-primary)]">
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-blue)] transition-colors duration-300 line-clamp-1">
            {game.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{game.developer}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
            <span className="text-sm font-medium">{game.rating}</span>
          </div>
          <Badge className="modern-badge modern-badge-blue text-xs">
            {game.genre}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
          <Users className="w-3 h-3" />
          <span>{game.playerCount}</span>
          {game.estimatedPlaytime && (
            <>
              <span>•</span>
              <span>{game.estimatedPlaytime}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {game.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-[var(--slate-medium)] text-[var(--text-muted)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[var(--accent-green)]">
              ${finalPrice.toFixed(2)}
            </span>
            {game.discount && (
              <span className="text-sm text-[var(--text-muted)] line-through">
                ${game.price.toFixed(2)}
              </span>
            )}
          </div>

          {showQuickActions && (
            <Button 
              size="sm" 
              onClick={handleAddToCart} 
              disabled={addingToCart}
              className="vanguard-btn-primary transition-all duration-300"
            >
              {addingToCart ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}