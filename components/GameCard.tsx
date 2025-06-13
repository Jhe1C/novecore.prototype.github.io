import { useState } from 'react';
import { Star, ShoppingCart, Heart, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useWishlist } from './WishlistContext';
import { GameData } from './GameDatabase';
import { toast } from 'sonner@2.0.3';

interface GameCardProps {
  game: GameData;
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
  className?: string;
}

export function GameCard({ 
  game, 
  onGameSelect, 
  onAddToCart, 
  className = "" 
}: GameCardProps) {
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

  const handleGameClick = () => {
    onGameSelect?.(game);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(game);
  };

  const finalPrice = game.discount && game.originalPrice
    ? game.price
    : game.price;

  return (
    <Card className={`group overflow-visible bg-[var(--slate-dark)] border-[var(--border-subtle)] hover:border-[var(--accent-blue)]/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer ${className}`}>
      {/* Image Section - Fixed Height */}
      <div className="game-card-image-section" onClick={handleGameClick}>
        <ImageWithFallback
          src={game.coverImage}
          alt={game.titleCN || game.title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" className="modern-btn-primary">
              <Play className="w-4 h-4 mr-2" />
              查看詳情
            </Button>
          </div>
        </div>
        
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

        {/* Quick Actions (show on hover) - Bottom right */}
        <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={`transition-all duration-300 bg-black/50 backdrop-blur-sm border-white/20 hover:border-[var(--accent-orange)] ${
              inWishlist 
                ? 'text-[var(--accent-orange)] bg-[var(--accent-orange)]/20 border-[var(--accent-orange)]' 
                : 'text-white hover:text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/10'
            } ${isWishlistAnimating ? 'wishlist-bounce' : ''}`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      
      {/* Content Section - Flexible Height with Structured Layout */}
      <div className="game-card-content-section">
        {/* Title and Developer - Fixed Height */}
        <div className="space-y-1 m-[0px]" onClick={handleGameClick}>
          <h3 className="game-card-title group-hover:text-[var(--accent-blue)] transition-colors duration-200 m-[0px] mx-[0px] my-[4px] mx-[0px] my-[4px] mt-[4px] mr-[0px] mb-[0px] ml-[0px]">
            {game.titleCN || game.title}
          </h3>
          <p className="game-card-developer mt-[0px] mr-[0px] mb-[8px] ml-[0px]">
            by {game.developer}
          </p>
        </div>

        {/* Rating and Genre - Fixed Height */}
        <div className="game-card-meta">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
            <span className="text-sm font-medium">{game.rating}</span>
            <span className="text-xs text-[var(--text-muted)]">
              ({game.reviewCount.toLocaleString()})
            </span>
          </div>
          <Badge className="modern-badge modern-badge-purple text-xs">
            {game.genre[0]}
          </Badge>
        </div>
        
        {/* Price - Always at Bottom - Using Tailwind classes */}
        <div className="game-card-price flex items-center space-x-2">
          <span className="text-lg font-bold text-[var(--accent-green)]">
            ${finalPrice.toFixed(2)}
          </span>
          {game.discount && game.originalPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              ${game.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Wishlist indicator - Outside layout flow */}
        {inWishlist && (
          <div className="flex items-center space-x-1 text-xs text-[var(--accent-orange)] pt-2">
            <Heart className="w-3 h-3 fill-current" />
            <span>在願望清單中</span>
          </div>
        )}
      </div>
    </Card>
  );
}