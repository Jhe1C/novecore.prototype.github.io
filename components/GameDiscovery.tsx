import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GameCard } from './GameCard';
import { 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Gift,
  TrendingUp,
  Crown,
  Zap,
  Clock,
  Star
} from 'lucide-react';
import { 
  GAME_DATABASE, 
  getFeaturedGames, 
  getDiscountedGames, 
  getBestSellerGames,
  getRecommendedGames,
  GENRE_COLLECTIONS,
  GameData 
} from './GameDatabase';

interface GameSectionProps {
  title: string;
  subtitle?: string;
  games: GameData[];
  icon?: any;
  viewAllLink?: string;
  showRating?: boolean;
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
  sectionId?: string;
}

function GameSection({ 
  title, 
  subtitle, 
  games, 
  icon: Icon, 
  viewAllLink, 
  showRating = true,
  onGameSelect,
  onAddToCart,
  sectionId = 'default'
}: GameSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = Math.min(3, games.length);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < games.length - visibleCount;

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(games.length - visibleCount, currentIndex + 1));
  };

  // Calculate transform based on card width and gap
  const cardWidth = 256; // CSS variable --game-card-width in px
  const cardGap = 24; // CSS variable --game-card-gap in px
  const transformOffset = currentIndex * (cardWidth + cardGap);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-10 h-10 bg-[var(--accent-blue)]/10 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
            {subtitle && (
              <p className="text-[var(--text-secondary)]">{subtitle}</p>
            )}
          </div>
        </div>

        {viewAllLink && (
          <Button variant="ghost" className="vanguard-btn-ghost group">
            查看全部
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        )}
      </div>

      {/* Games Carousel */}
      <div className="relative game-section-container">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </Button>
        )}

        {/* Games Grid */}
        <div className="overflow-hidden">
          <div 
            className="game-section-scroll"
            style={{ transform: `translateX(-${transformOffset}px)` }}
          >
            {games.map((game, index) => (
              <div key={`${sectionId}-${game.id}-${index}`} className="game-card-container flex-shrink-0">
                <GameCard 
                  game={game} 
                  onGameSelect={onGameSelect}
                  onAddToCart={onAddToCart}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface GameDiscoveryProps {
  onGameSelect?: (game: GameData) => void;
  onAddToCart?: (game: GameData) => void;
}

export function GameDiscovery({ onGameSelect, onAddToCart }: GameDiscoveryProps) {
  const featuredGames = getFeaturedGames();
  const discountedGames = getDiscountedGames();
  const bestSellerGames = getBestSellerGames();
  const recommendedGames = getRecommendedGames();

  return (
    <div className="container mx-auto px-6 py-16 content-width">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
          探索你的下一場冒險
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          探索我們精心挑選的遊戲收藏，從最新的大作到隱藏的獨立遊戲珍品。找到屬於你的完美遊戲體驗。
        </p>
      </div>

      {/* Featured Games Section */}
      {featuredGames.length > 0 && (
        <GameSection
          title="精選遊戲"
          subtitle="我們為您精心挑選的頂級遊戲"
          games={featuredGames}
          icon={Crown}
          viewAllLink="/featured"
          onGameSelect={onGameSelect}
          onAddToCart={onAddToCart}
          sectionId="featured"
        />
      )}

      {/* Discounted Games Section */}
      {discountedGames.length > 0 && (
        <GameSection
          title="特價優惠"
          subtitle="限時優惠，不容錯過"
          games={discountedGames}
          icon={Zap}
          viewAllLink="/deals"
          onGameSelect={onGameSelect}
          onAddToCart={onAddToCart}
          sectionId="discounted"
        />
      )}

      {/* Best Seller Section */}
      {bestSellerGames.length > 0 && (
        <GameSection
          title="暢銷排行"
          subtitle="全球玩家熱愛的遊戲"
          games={bestSellerGames}
          icon={TrendingUp}
          viewAllLink="/bestsellers"
          onGameSelect={onGameSelect}
          onAddToCart={onAddToCart}
          sectionId="bestsellers"
        />
      )}

      {/* Recommended Games Section */}
      {recommendedGames.length > 0 && (
        <GameSection
          title="高評分推薦"
          subtitle="玩家評分最高的遊戲作品"
          games={recommendedGames}
          icon={Star}
          viewAllLink="/recommended"
          onGameSelect={onGameSelect}
          onAddToCart={onAddToCart}
          sectionId="recommended"
        />
      )}

      {/* Genre Spotlight */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            熱門類型
          </h2>
          <p className="text-[var(--text-secondary)]">
            探索不同遊戲類型，找到最適合你的遊戲風格
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(GENRE_COLLECTIONS).map(([genre, games], index) => (
            <Card 
              key={`genre-${genre}-${index}`}
              className="vanguard-card p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[var(--accent-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--accent-blue)]/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-medium text-[var(--text-primary)] mb-2">
                {genre}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {games.length} 款遊戲
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="mt-20">
        <Card className="vanguard-card p-8 bg-gradient-to-r from-[var(--accent-purple)]/10 to-[var(--accent-blue)]/10 border-[var(--accent-blue)]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-6 h-6 text-[var(--accent-blue)]" />
                <Badge className="modern-badge-blue">特別優惠</Badge>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                發現你的下一款最愛遊戲
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                瀏覽我們精心策劃的遊戲收藏，包含各種類型和價位的優質遊戲。無論你是喜歡動作冒險、角色扮演還是策略遊戲，都能在這裡找到心儀的作品。
              </p>
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-sm text-[var(--text-muted)]">
                  特價優惠隨時更新
                </span>
              </div>
              <Button 
                className="vanguard-btn-primary"
                onClick={() => {
                  // Navigate to browse page
                  window.dispatchEvent(new CustomEvent('navigate-to-browse'));
                }}
              >
                瀏覽所有遊戲
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="relative">
              {featuredGames[0] && (
                <div className="relative">
                  <ImageWithFallback
                    src={featuredGames[0].heroImage || featuredGames[0].coverImage}
                    alt={featuredGames[0].titleCN || featuredGames[0].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-lg font-bold text-white mb-1">
                      {featuredGames[0].titleCN || featuredGames[0].title}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {featuredGames[0].developer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}