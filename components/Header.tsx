import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MiniCartPreview } from './MiniCartPreview';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useWishlist } from './WishlistContext';
import { searchGames, GameData } from './GameDatabase';
import Frame1 from '../imports/Frame1';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Heart,
  Menu,
  X,
  Code,
  ChevronDown,
  Star,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemCount: number;
  cartItems: any[];
  onUpdateCartQuantity: (itemId: string, quantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onGameSelect?: (game: GameData) => void;
  isOnline?: boolean;
}

// Navigation menu items - Icons removed as requested
const MAIN_MENU_ITEMS = [
  { 
    id: 'store', 
    label: '商店', 
    page: 'browse',
    submenu: [
      { id: 'browse', label: '瀏覽遊戲', page: 'browse', description: '探索我們完整的遊戲目錄' },
      { id: 'free-zone', label: '免費遊戲', page: 'free-zone', description: '發現精彩的免費遊戲' }
    ]
  },
  { 
    id: 'novaverse', 
    label: 'NovaVerse', 
    page: 'novaverse',
    submenu: [
      { id: 'forums', label: '社群論壇', page: 'forums', description: '與其他玩家討論遊戲' },
      { id: 'groups', label: '遊戲群組', page: 'groups', description: '加入志同道合的玩家群組' },
      { id: 'lfg', label: '尋找隊友', page: 'lfg', description: '找到完美的遊戲夥伴' },
      { id: 'creator-hub', label: '創作者中心', page: 'creator-hub', description: '創作者資源和工具' }
    ]
  },
  { 
    id: 'developers', 
    label: '開發者', 
    page: 'developers'
  }
];

const USER_MENU_ITEMS = [
  { id: 'profile', label: '我的檔案', page: 'profile', description: '管理您的帳戶設定' },
  { id: 'library', label: '遊戲庫', page: 'library', description: '查看您的遊戲收藏' },
  { id: 'wishlist', label: '我的願望清單', page: 'wishlist', description: '查看收藏的遊戲' },
  { id: 'order-history', label: '訂單記錄', page: 'order-history', description: '查看購買歷史' },
  { id: 'payment-methods', label: '付款方式', page: 'payment-methods', description: '管理付款選項' },
  { id: 'address-management', label: '地址管理', page: 'address-management', description: '管理送貨地址' },
  { id: 'support', label: '客戶支援', page: 'support', description: '獲得幫助和支援' }
];

function SearchResults({ 
  results, 
  onGameSelect, 
  onClose 
}: { 
  results: GameData[]; 
  onGameSelect: (game: GameData) => void;
  onClose: () => void;
}) {
  // Deduplicate results by game ID to prevent duplicate keys
  const uniqueResults = useMemo(() => {
    const gameMap = new Map<string, GameData>();
    results.forEach(game => {
      if (!gameMap.has(game.id)) {
        gameMap.set(game.id, game);
      }
    });
    return Array.from(gameMap.values());
  }, [results]);

  if (uniqueResults.length === 0) {
    return (
      <div className="dropdown-content w-80 sm:w-96">
        <div className="p-4 text-center">
          <Search className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
          <p className="text-[var(--text-secondary)]">找不到相關遊戲</p>
          <p className="text-sm text-[var(--text-muted)]">試試其他搜索詞</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown-content w-80 sm:w-96">
      <div className="p-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            搜索結果 ({uniqueResults.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-[var(--slate-medium)]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {uniqueResults.slice(0, 6).map((game, index) => (
          <button
            key={`search-result-${game.id}-${index}`}
            onClick={() => {
              onGameSelect(game);
              onClose();
            }}
            className="w-full p-3 flex items-center space-x-3 hover:bg-[var(--slate-medium)] transition-colors duration-200 text-left"
          >
            {/* Game Cover */}
            <div className="w-10 h-14 sm:w-12 sm:h-16 flex-shrink-0 overflow-hidden rounded">
              <ImageWithFallback
                src={game.coverImage}
                alt={game.titleCN || game.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Game Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-[var(--text-primary)] line-clamp-1 mb-1 text-sm sm:text-base">
                {game.titleCN || game.title}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 mb-1">
                {game.developer}
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-[var(--accent-orange)] fill-current" />
                  <span className="text-xs text-[var(--text-muted)]">{game.rating}</span>
                </div>
                <span className="text-xs text-[var(--accent-green)] font-medium">
                  ${game.price.toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Navigation Arrow */}
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
          </button>
        ))}
      </div>
      
      {uniqueResults.length > 6 && (
        <div className="p-3 border-t border-[var(--border-subtle)] text-center">
          <span className="text-sm text-[var(--text-muted)]">
            還有 {uniqueResults.length - 6} 個結果...
          </span>
        </div>
      )}
    </div>
  );
}

export function Header({
  currentPage,
  onNavigate,
  cartItemCount,
  cartItems,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onProceedToCheckout,
  onGameSelect,
  isOnline = true
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GameData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showCartPreview, setShowCartPreview] = useState(false);
  
  // Get wishlist count from context
  const { wishlistCount } = useWishlist();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Handle search functionality with deduplication
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const rawResults = searchGames(searchQuery);
        
        // Deduplicate results by game ID before setting state
        const gameMap = new Map<string, GameData>();
        rawResults.forEach(game => {
          if (!gameMap.has(game.id)) {
            gameMap.set(game.id, game);
          }
        });
        const uniqueResults = Array.from(gameMap.values());
        
        setSearchResults(uniqueResults);
        setShowSearchResults(true);
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
        setSearchQuery('');
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartPreview(false);
      }
      if (!event.target || !(event.target as Element).closest('.nav-dropdown-container')) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle game selection from search
  const handleGameSelect = (game: GameData) => {
    if (onGameSelect) {
      onGameSelect(game);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleDropdownToggle = (menuId: string) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const handleNavigateAndClose = (page: string) => {
    onNavigate(page);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (page: string) => {
    return currentPage === page;
  };

  // Cart preview handlers
  const handleViewFullCart = () => {
    handleNavigateAndClose('cart');
    setShowCartPreview(false);
  };

  const handleCheckout = () => {
    onProceedToCheckout();
    setShowCartPreview(false);
  };

  const handleCartClose = () => {
    setShowCartPreview(false);
  };

  return (
    <header className="header-main">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 content-width">
        <nav className="nav-main">
          <div className="grid grid-cols-12 items-center h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Left: Logo - Responsive sizing */}
            <div className="col-span-3 sm:col-span-3 lg:col-span-2">
              <button 
                onClick={() => handleNavigateAndClose('home')}
                className="flex items-center justify-start w-full hover:opacity-80 transition-opacity duration-200"
              >
                {/* Responsive logo sizing */}
                <div className="h-8 w-[105px] sm:h-10 sm:w-[132px] lg:h-[60px] lg:w-[198px] flex items-center justify-center">
                  <Frame1 />
                </div>
              </button>
            </div>

            {/* Center: Main Navigation + Search - Responsive layout */}
            <div className="col-span-6 sm:col-span-6 lg:col-span-8 flex items-center justify-center space-x-1 sm:space-x-4 lg:space-x-6">
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden xl:flex items-center space-x-2">
                {MAIN_MENU_ITEMS.map((item) => (
                  <div key={item.id} className="nav-dropdown-container">
                    {item.submenu ? (
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(item.id)}
                          className={`dropdown-item flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)] text-sm lg:text-base ${
                            isActivePage(item.page) ? 'dropdown-item-active' : ''
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {activeDropdown === item.id && (
                          <div className="dropdown-menu">
                            <div className="dropdown-content">
                              {item.submenu.map((subItem) => (
                                <button
                                  key={subItem.id}
                                  onClick={() => handleNavigateAndClose(subItem.page)}
                                  className={`dropdown-item ${
                                    isActivePage(subItem.page) ? 'dropdown-item-active' : ''
                                  }`}
                                >
                                  <div>
                                    <div className="font-medium text-[var(--text-primary)]">{subItem.label}</div>
                                    <div className="text-sm text-[var(--text-secondary)] mt-1">{subItem.description}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavigateAndClose(item.page)}
                        className={`dropdown-item flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)] text-sm lg:text-base ${
                          isActivePage(item.page) ? 'dropdown-item-active' : ''
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Search Bar - Responsive width and position */}
              <div className="hidden sm:block flex-1 max-w-xs lg:max-w-sm" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <Input
                    type="search"
                    placeholder="搜尋遊戲..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 lg:pl-10 text-sm bg-[var(--slate-medium)] border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                  />
                  
                  {/* Search Results Dropdown - Responsive positioning */}
                  {showSearchResults && (
                    <div className="absolute top-full left-0 mt-2 z-50 w-full min-w-80">
                      <SearchResults
                        results={searchResults}
                        onGameSelect={handleGameSelect}
                        onClose={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Loading indicator */}
                  {isSearching && (
                    <div className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-[var(--accent-blue)]/30 border-t-[var(--accent-blue)] rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: User Actions - Responsive spacing and sizing */}
            <div className="col-span-3 sm:col-span-3 lg:col-span-2 flex items-center justify-end space-x-1 sm:space-x-2">
              {/* Wishlist - Desktop Only with count */}
              <div className="relative hidden lg:block">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigateAndClose('wishlist')}
                  className={`vanguard-btn-ghost ${isActivePage('wishlist') ? 'text-[var(--accent-blue)]' : ''}`}
                >
                  <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 text-xs bg-[var(--accent-orange)] hover:bg-[var(--accent-orange)] p-0 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </Badge>
                )}
              </div>

              {/* Shopping Cart - Responsive icon size */}
              <div className="relative" ref={cartRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCartPreview(!showCartPreview)}
                  className={`vanguard-btn-ghost relative ${isActivePage('cart') ? 'text-[var(--accent-blue)]' : ''}`}
                >
                  <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 text-xs bg-[var(--accent-blue)] hover:bg-[var(--accent-blue)] p-0 flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </Badge>
                  )}
                </Button>

                {/* Mini Cart Preview - Responsive width */}
                <MiniCartPreview
                  items={cartItems}
                  isOpen={showCartPreview}
                  onClose={handleCartClose}
                  onUpdateQuantity={onUpdateCartQuantity}
                  onRemoveItem={onRemoveFromCart}
                  onViewFullCart={handleViewFullCart}
                  onProceedToCheckout={handleCheckout}
                />
              </div>

              {/* User Menu - Desktop Only, responsive text */}
              <div className="hidden lg:block nav-dropdown-container">
                <button
                  onClick={() => handleDropdownToggle('user')}
                  className="dropdown-item flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)]"
                >
                  <User className="w-4 h-4 lg:w-5 lg:h-5" />
                  <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${
                    activeDropdown === 'user' ? 'rotate-180' : ''
                  }`} />
                </button>

                {activeDropdown === 'user' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {USER_MENU_ITEMS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavigateAndClose(item.page)}
                          className={`dropdown-item ${
                            isActivePage(item.page) ? 'dropdown-item-active' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              {item.id === 'wishlist' && <Heart className="w-5 h-5 mr-3" />}
                              <div>
                                <div className="font-medium text-[var(--text-primary)]">{item.label}</div>
                                <div className="text-sm text-[var(--text-secondary)] mt-1">{item.description}</div>
                              </div>
                            </div>
                            {item.id === 'wishlist' && wishlistCount > 0 && (
                              <Badge className="bg-[var(--accent-orange)] text-white">
                                {wishlistCount > 9 ? '9+' : wishlistCount}
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle - Always visible on mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden vanguard-btn-ghost"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu xl:hidden">
              <div className="px-4 py-4 space-y-6">
                {/* Mobile Search - Full width */}
                <div ref={searchRef}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <Input
                      type="search"
                      placeholder="搜尋遊戲、開發商、類型..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[var(--slate-medium)] border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
                    />
                  </div>
                  
                  {/* Mobile Search Results */}
                  {showSearchResults && (
                    <div className="mt-2">
                      <SearchResults
                        results={searchResults}
                        onGameSelect={handleGameSelect}
                        onClose={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {MAIN_MENU_ITEMS.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => item.submenu ? handleDropdownToggle(item.id) : handleNavigateAndClose(item.page)}
                        className={`w-full dropdown-item flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)] ${
                          isActivePage(item.page) ? 'dropdown-item-active' : ''
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.submenu && (
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} />
                        )}
                      </button>

                      {item.submenu && activeDropdown === item.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavigateAndClose(subItem.page)}
                              className={`w-full dropdown-item px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)] ${
                                isActivePage(subItem.page) ? 'dropdown-item-active' : ''
                              }`}
                            >
                              <div className="text-left">
                                <div className="font-medium text-[var(--text-primary)]">{subItem.label}</div>
                                <div className="text-sm text-[var(--text-secondary)] mt-1">{subItem.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile User Actions */}
                <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2">
                  {/* User Menu Items - Mobile (including wishlist) */}
                  {USER_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigateAndClose(item.page)}
                      className={`w-full dropdown-item flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[var(--slate-medium)] ${
                        isActivePage(item.page) ? 'dropdown-item-active' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {item.id === 'wishlist' && <Heart className="w-5 h-5 mr-3" />}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.id === 'wishlist' && wishlistCount > 0 && (
                        <Badge className="bg-[var(--accent-orange)] text-white">
                          {wishlistCount}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}