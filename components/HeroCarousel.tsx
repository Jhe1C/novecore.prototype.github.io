import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Heart, 
  Star, 
  Users, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';
import { getFeaturedGames, GameData } from './GameDatabase';

interface HeroCarouselProps {
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
}

export function HeroCarousel({ onGameSelect, onAddToCart }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Get featured games from the database
  const featuredGames = getFeaturedGames();

  useEffect(() => {
    if (!isAutoPlaying || featuredGames.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredGames.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredGames.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredGames.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredGames.length) % featuredGames.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Handle empty state
  if (featuredGames.length === 0) {
    return (
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-[var(--slate-dark)]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              載入中...
            </h2>
            <p className="text-[var(--text-secondary)]">
              正在載入精選遊戲
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentGame = featuredGames[currentSlide];
  const finalPrice = currentGame.discount && currentGame.originalPrice
    ? currentGame.price
    : currentGame.price;

  const handleGameSelect = () => {
    onGameSelect?.(currentGame);
  };

  const handleAddToCart = () => {
    onAddToCart?.(currentGame);
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={currentGame.heroImage || currentGame.coverImage}
          alt={`${currentGame.titleCN || currentGame.title} - Featured Game`}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight-black)]/90 via-[var(--midnight-black)]/70 to-[var(--midnight-black)]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-black)]/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 content-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Game Information */}
            <div className="space-y-8 modern-fade-in">
              {/* Game Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge className="modern-badge modern-badge-blue">
                  精選
                </Badge>
                <Badge className="modern-badge modern-badge-purple text-[rgba(167,128,255,1)]">
                  {currentGame.genre[0]}
                </Badge>
                {currentGame.discount && currentGame.discount > 0 && (
                  <Badge className="modern-badge modern-badge-green">
                    -{currentGame.discount}% OFF
                  </Badge>
                )}
                {currentGame.isBestSeller && (
                  <Badge className="modern-badge modern-badge-cyan">
                    暢銷
                  </Badge>
                )}
                {currentGame.isNewRelease && (
                  <Badge className="modern-badge modern-badge-orange">
                    新作
                  </Badge>
                )}
              </div>

              {/* Game Title */}
              <div>
                <h1 className="text-6xl lg:text-7xl mb-4 text-glow">
                  {currentGame.titleCN || currentGame.title}
                </h1>
                <p className="text-xl text-[var(--text-secondary)] mb-2">
                  by {currentGame.developer}
                </p>
              </div>

              {/* Game Stats */}
              <div className="flex flex-wrap gap-6 text-[var(--text-secondary)]">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[var(--accent-orange)] fill-current" />
                  <span className="font-medium">{currentGame.rating}</span>
                  <span className="text-sm text-[var(--text-muted)]">
                    ({currentGame.reviewCount.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{currentGame.multiplayer ? '多人遊戲' : '單人遊戲'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(currentGame.releaseDate).getFullYear()}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                {currentGame.shortDescriptionCN || currentGame.shortDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentGame.tags.slice(0, 4).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[var(--slate-medium)] text-[var(--text-secondary)] text-sm rounded-full border border-[var(--border-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-[var(--accent-green)]">
                    ${finalPrice.toFixed(2)}
                  </div>
                  {currentGame.discount && currentGame.originalPrice && (
                    <div className="text-lg text-[var(--text-muted)] line-through">
                      ${currentGame.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="modern-btn-primary px-8 group"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    加入購物車
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="modern-btn-secondary"
                    onClick={handleGameSelect}
                  >
                    <Play className="w-5 h-5 mr-3" />
                    查看詳情
                  </Button>
                </div>
              </div>
            </div>

            {/* Game Screenshot/Art */}
            <div className="lg:block hidden">
              <div className="relative">
                <div className="modern-card p-1 cyber-glow">
                  <ImageWithFallback
                    src={currentGame.screenshots?.[0] || currentGame.coverImage}
                    alt={`${currentGame.titleCN || currentGame.title} gameplay`}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute -bottom-4 -right-4 modern-card p-4 bg-[var(--slate-dark)]/90 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">觀看預告</div>
                      <div className="text-sm text-[var(--text-muted)]">2:45 mins</div>
                    </div>
                  </div>
                </div>

                {/* Game Features */}
                <div className="absolute -top-4 -left-4 modern-card p-3 bg-[var(--slate-dark)]/90 backdrop-blur-sm">
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--text-primary)] mb-1">支援平台</div>
                    <div className="text-[var(--text-muted)]">
                      {currentGame.platforms.slice(0, 2).join(', ')}
                      {currentGame.platforms.length > 2 && '...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--slate-dark)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-full flex items-center justify-center hover:bg-[var(--slate-medium)] transition-colors duration-300 group"
        aria-label="Previous game"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--slate-dark)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-full flex items-center justify-center hover:bg-[var(--slate-medium)] transition-colors duration-300 group"
        aria-label="Next game"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[var(--accent-blue)] shadow-glow' 
                : 'bg-[var(--slate-light)] hover:bg-[var(--slate-medium)]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Game Counter */}
      <div className="absolute bottom-8 right-8 bg-[var(--slate-dark)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-lg px-4 py-2">
        <span className="text-sm text-[var(--text-muted)]">
          {currentSlide + 1} / {featuredGames.length}
        </span>
      </div>


    </section>
  );
}