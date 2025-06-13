import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { Review } from "./ReviewSystem";
import { useWishlist } from "./WishlistContext";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Download,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Calendar,
  Globe,
  Users,
  Trophy,
  Play,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Clock,
  DollarSign,
  MessageCircle,
  Edit,
} from "lucide-react";
import { getGameById, GameData } from "./GameDatabase";
import { toast } from "sonner@2.0.3";

interface GameProductPageProps {
  gameId: string | null;
  onAddToCart: (game: GameData, edition?: any) => void;
  onBack: () => void;
}

interface GameEdition {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  features: string[];
  isRecommended?: boolean;
}

export function GameProductPage({
  gameId,
  onAddToCart,
  onBack,
}: GameProductPageProps) {
  const [selectedEdition, setSelectedEdition] = useState<string>("standard");
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  
  // Use wishlist context instead of local state
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const game = gameId ? getGameById(gameId) : null;
  
  // Check if game is in wishlist
  const isWishlisted = game ? isInWishlist(game.id) : false;

  // 遊戲版本配置
  const gameEditions: GameEdition[] = [
    {
      id: "standard",
      name: "標準版",
      price: game?.price || 0,
      originalPrice: game?.originalPrice,
      discount: game?.discount,
      features: ["基礎遊戲", "線上多人模式（如適用）"],
    },
    {
      id: "deluxe",
      name: "豪華版",
      price: (game?.price || 0) + 20,
      originalPrice: (game?.originalPrice || 0) + 30,
      discount: 33,
      features: [
        "基礎遊戲",
        "季票",
        "獨家內容包",
        "數位音軌",
        "數位藝術集",
      ],
      isRecommended: true,
    },
    {
      id: "ultimate",
      name: "終極版",
      price: (game?.price || 0) + 40,
      originalPrice: (game?.originalPrice || 0) + 60,
      discount: 33,
      features: [
        "基礎遊戲",
        "季票",
        "所有DLC",
        "獨家裝備",
        "早期存取",
        "數位收藏品",
        "實體收藏品",
      ],
    },
  ];

  useEffect(() => {
    if (!game) {
      // 如果找不到遊戲，返回瀏覽頁面
      onBack();
    }
  }, [game, onBack]);

  if (!game) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          找不到遊戲
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          抱歉，我們找不到您要查看的遊戲。
        </p>
        <Button
          onClick={onBack}
          className="vanguard-btn-primary"
        >
          返回瀏覽
        </Button>
      </div>
    );
  }

  const currentEdition =
    gameEditions.find(
      (edition) => edition.id === selectedEdition,
    ) || gameEditions[0];

  const handleAddToCart = () => {
    onAddToCart(game, {
      id: selectedEdition,
      name: currentEdition.name,
      price: currentEdition.price,
      discount: currentEdition.discount,
    });
  };

  // Handle wishlist toggle with proper context integration
  const handleWishlistToggle = () => {
    setIsWishlistAnimating(true);
    
    if (isWishlisted) {
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
        drmType: 'Platform' as const,
        platforms: game.platforms.map(p => {
          switch (p.toLowerCase()) {
            case 'windows': return 'Windows' as const;
            case 'mac': case 'macos': return 'Mac' as const;
            case 'linux': return 'Linux' as const;
            default: return 'Windows' as const;
          }
        }).filter((p, i, arr) => arr.indexOf(p) === i),
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

  const nextScreenshot = () => {
    setSelectedScreenshot(
      (prev) => (prev + 1) % game.screenshots.length,
    );
  };

  const prevScreenshot = () => {
    setSelectedScreenshot(
      (prev) =>
        (prev - 1 + game.screenshots.length) %
        game.screenshots.length,
    );
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleSubmitReview = async (
    reviewData: Partial<Review>,
  ) => {
    try {
      // In a real app, this would submit to your API
      console.log("Submitting review:", reviewData);

      toast.success("評論已提交！", {
        description:
          "感謝您的評論，這將幫助其他玩家做出更好的決定。",
        duration: 3000,
      });

      setShowReviewForm(false);
    } catch (error) {
      toast.error("提交失敗", {
        description: "評論提交時發生錯誤，請稍後再試。",
        duration: 3000,
      });
    }
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
  };

  return (
    <div className="container mx-auto px-6 py-8 content-width">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="vanguard-btn-ghost mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回瀏覽
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Media */}
        <div className="lg:col-span-2">
          {/* Main Screenshot */}
          <div className="relative mb-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={game.screenshots[selectedScreenshot]}
                alt={`${game.titleCN || game.title} screenshot ${selectedScreenshot + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Screenshot Navigation */}
              {game.screenshots.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevScreenshot}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextScreenshot}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </Button>

                  {/* Play Button */}
                  <Button
                    variant="ghost"
                    className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/20 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Screenshot Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {game.screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setSelectedScreenshot(index)}
                className={`relative w-20 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                  selectedScreenshot === index
                    ? "border-[var(--accent-blue)]"
                    : "border-transparent hover:border-[var(--border-subtle)]"
                }`}
              >
                <ImageWithFallback
                  src={screenshot}
                  alt={`${game.titleCN || game.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Game Details Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概述</TabsTrigger>
                <TabsTrigger value="system">
                  系統需求
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>評論</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="related">
                  相關內容
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="vanguard-card p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    關於此遊戲
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {game.descriptionCN || game.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-[var(--text-primary)] mb-3">
                        遊戲特色
                      </h4>
                      <ul className="space-y-2">
                        {game.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]"
                          >
                            <div className="w-1 h-1 bg-[var(--accent-blue)] rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-[var(--text-primary)] mb-3">
                        遊戲資訊
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">
                            類型:
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {game.genre.join(", ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">
                            發行日期:
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {new Date(
                              game.releaseDate,
                            ).toLocaleDateString("zh-TW")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">
                            年齡分級:
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {game.ageRating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">
                            檔案大小:
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {game.fileSize}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">
                            支援語言:
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {game.languages.length} 種語言
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="vanguard-card p-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                      <Monitor className="w-5 h-5 mr-2 text-[var(--accent-blue)]" />
                      最低需求
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            作業系統
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {game.systemRequirements.minimum.os}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Cpu className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            處理器
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements.minimum
                                .processor
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MemoryStick className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            記憶體
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements.minimum
                                .memory
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            顯示卡
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements.minimum
                                .graphics
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <HardDrive className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            儲存空間
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements.minimum
                                .storage
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="vanguard-card p-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-[var(--accent-green)]" />
                      建議需求
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            作業系統
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements
                                .recommended.os
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Cpu className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            處理器
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements
                                .recommended.processor
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MemoryStick className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            記憶體
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements
                                .recommended.memory
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            顯示卡
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements
                                .recommended.graphics
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <HardDrive className="w-4 h-4 text-[var(--text-muted)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            儲存空間
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {
                              game.systemRequirements
                                .recommended.storage
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Reviews Tab - Complete Review System */}
              <TabsContent value="reviews" className="mt-6">
                {showReviewForm ? (
                  <ReviewForm
                    gameId={game.id}
                    gameTitle={game.titleCN || game.title}
                    onSubmit={handleSubmitReview}
                    onCancel={handleCancelReview}
                    existingReview={userReview || undefined}
                  />
                ) : (
                  <ReviewList
                    gameId={game.id}
                    onWriteReview={handleWriteReview}
                  />
                )}
              </TabsContent>

              <TabsContent value="related" className="mt-6">
                <Card className="vanguard-card p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    相關內容
                  </h3>

                  {game.dlcAvailable && (
                    <div className="mb-6">
                      <h4 className="font-medium text-[var(--text-primary)] mb-3 flex items-center">
                        <Download className="w-4 h-4 mr-2 text-[var(--accent-blue)]" />
                        可下載內容 (DLC)
                      </h4>
                      <p className="text-[var(--text-secondary)] text-sm">
                        本遊戲提供額外的可下載內容，包含新的故事章節、角色裝備和遊戲模式。
                      </p>
                    </div>
                  )}

                  {game.achievements && (
                    <div className="mb-6">
                      <h4 className="font-medium text-[var(--text-primary)] mb-3 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-[var(--accent-orange)]" />
                        成就系統
                      </h4>
                      <p className="text-[var(--text-secondary)] text-sm">
                        遊戲包含 {game.achievements}{" "}
                        項成就，挑戰各種遊戲目標並獲得獎勵。
                      </p>
                    </div>
                  )}

                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                    <p className="text-[var(--text-secondary)]">
                      更多相關內容即將推出
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column - Purchase Options */}
        <div className="lg:col-span-1">
          <Card className="vanguard-card p-6 sticky top-8">
            {/* Game Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                {game.titleCN || game.title}
              </h1>
              <p className="text-[var(--text-secondary)] mb-4">
                {game.developer}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-[var(--accent-orange)] fill-current" />
                  <span className="font-medium text-[var(--text-primary)]">
                    {game.rating}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    ({game.reviewCount.toLocaleString()})
                  </span>
                </div>
                {game.isBestSeller && (
                  <Badge className="modern-badge-purple">
                    暢銷
                  </Badge>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {game.genre.slice(0, 3).map((genre, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Edition Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                選擇版本
              </h3>
              <div className="space-y-3">
                {gameEditions.map((edition) => (
                  <button
                    key={edition.id}
                    onClick={() =>
                      setSelectedEdition(edition.id)
                    }
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedEdition === edition.id
                        ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10"
                        : "border-[var(--border-subtle)] hover:border-[var(--accent-blue)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[var(--text-primary)]">
                        {edition.name}
                      </span>
                      {edition.isRecommended && (
                        <Badge className="modern-badge-green text-xs">
                          推薦
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {edition.discount &&
                      edition.originalPrice ? (
                        <>
                          <span className="text-sm text-[var(--text-muted)] line-through">
                            ${edition.originalPrice.toFixed(2)}
                          </span>
                          <span className="font-semibold text-[var(--accent-green)]">
                            ${edition.price.toFixed(2)}
                          </span>
                          <Badge className="modern-badge-green text-xs">
                            -{edition.discount}%
                          </Badge>
                        </>
                      ) : (
                        <span className="font-semibold text-[var(--text-primary)]">
                          ${edition.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <ul className="text-xs text-[var(--text-secondary)]">
                      {edition.features
                        .slice(0, 3)
                        .map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-1"
                          >
                            <div className="w-1 h-1 bg-[var(--accent-blue)] rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      {edition.features.length > 3 && (
                        <li className="text-[var(--text-muted)]">
                          +{edition.features.length - 3}{" "}
                          項更多內容
                        </li>
                      )}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={handleAddToCart}
                className="vanguard-btn-primary w-full"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                加入購物車
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={`vanguard-btn-secondary flex-1 transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-[var(--accent-orange)]/10 border-[var(--accent-orange)]/30 text-[var(--accent-orange)]" 
                      : ""
                  } ${isWishlistAnimating ? "wishlist-bounce" : ""}`}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 transition-all duration-300 ${
                      isWishlisted ? "fill-current" : ""
                    }`}
                  />
                  {isWishlisted ? "已收藏" : "收藏"}
                </Button>

                <Button variant="outline" className="vanguard-btn-secondary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Platform Support */}
            <div className="mb-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                支援平台
              </h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-[var(--slate-medium)] px-3 py-2 rounded-lg"
                  >
                    <Monitor className="w-4 h-4 text-[var(--accent-blue)]" />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {platform}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-[var(--slate-medium)] rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="text-[var(--text-secondary)]">
                    預計遊戲時間
                  </span>
                </div>
                <span className="font-medium text-[var(--text-primary)]">
                  {game.playtime}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--slate-medium)] rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="text-[var(--text-secondary)]">
                    玩家模式
                  </span>
                </div>
                <span className="font-medium text-[var(--text-primary)]">
                  {game.multiplayer ? "多人" : "單人"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--slate-medium)] rounded-lg">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="text-[var(--text-secondary)]">
                    支援語言
                  </span>
                </div>
                <span className="font-medium text-[var(--text-primary)]">
                  {game.languages.length} 種
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}