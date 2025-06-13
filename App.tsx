import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { GameDiscovery } from './components/GameDiscovery';
import { NovaVerseTeaser } from './components/NovaVerseTeaser';
import { WishlistPage } from './components/WishlistPage';
import { BrowseGamesPage } from './components/BrowseGamesPage';
import { GameProductPage } from './components/GameProductPage';
import { ShoppingCart, CartItem } from './components/ShoppingCart';
import { DeveloperLandingPage } from './components/DeveloperLandingPage';
import { WishlistProvider } from './components/WishlistContext';
import { GameData } from './components/GameDatabase';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog';
import { 
  Shield, 
  Users, 
  Sparkles, 
  Download, 
  Globe, 
  Code, 
  DollarSign,
  ArrowRight,
  Github,
  Twitter,
  MessageCircle,
  ArrowLeft,
  ShoppingCart as CartIcon,
  Zap,
  Lock,
  Cloud,
  ChevronRight,
  Home,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  CreditCard,
  MapPin,
  Receipt,
  Package,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

// Enhanced Page Types with proper TypeScript enums for better consistency
enum PageType {
  HOME = 'home',
  BROWSE = 'browse',
  STORE = 'store',
  DISCOVER = 'discover',
  GAME_PRODUCT = 'game-product',
  WISHLIST = 'wishlist',
  CART = 'cart',
  DEVELOPERS = 'developers',
  FREE_ZONE = 'free-zone',
  GENRES = 'genres',
  NOVAVERSE = 'novaverse',
  FORUMS = 'forums',
  GROUPS = 'groups',
  LFG = 'lfg',
  CREATOR_HUB = 'creator-hub',
  NEWS = 'news',
  SUPPORT = 'support',
  PROFILE = 'profile',
  LAUNCHER = 'launcher',
  CHECKOUT = 'checkout',
  CHECKOUT_BILLING = 'checkout-billing',
  CHECKOUT_PAYMENT = 'checkout-payment',
  CHECKOUT_REVIEW = 'checkout-review',
  ORDER_COMPLETE = 'order-complete',
  SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
  ORDER_HISTORY = 'order-history',
  PAYMENT_METHODS = 'payment-methods',
  ADDRESS_MANAGEMENT = 'address-management'
}

// Enhanced Navigation State Interface for better type safety
interface NavigationState {
  currentPage: PageType;
  previousPage: PageType | null;
  navigationHistory: PageType[];
  selectedGameId: string | null;
  canGoBack: boolean;
}

// Application State Interface for better state management
interface AppState {
  navigation: NavigationState;
  ui: {
    isLoading: boolean;
    isOnline: boolean;
    lastAction: string | null;
    showConfirmDialog: boolean;
    confirmAction: (() => void) | null;
    confirmMessage: string;
  };
  cart: {
    items: CartItem[];
    isModified: boolean;
    lastModified: Date | null;
  };
}

// Page metadata with enhanced navigation context
const PAGE_METADATA: Record<PageType, {
  title: string;
  breadcrumb: string[];
  requiresAuth?: boolean;
  isPublic?: boolean;
  description?: string;
  keywords?: string[];
}> = {
  [PageType.HOME]: { 
    title: 'Home', 
    breadcrumb: ['Home'],
    isPublic: true,
    description: 'Discover amazing games on NovaCore',
    keywords: ['games', 'gaming', 'download', 'store']
  },
  [PageType.BROWSE]: { 
    title: 'Browse Games', 
    breadcrumb: ['Home', 'Browse Games'],
    isPublic: true,
    description: 'Browse our extensive game library',
    keywords: ['browse', 'games', 'library', 'catalog']
  },
  [PageType.STORE]: { 
    title: 'Game Store', 
    breadcrumb: ['Home', 'Game Store'],
    isPublic: true 
  },
  [PageType.DISCOVER]: { 
    title: 'Discover', 
    breadcrumb: ['Home', 'Discover'],
    isPublic: true 
  },
  [PageType.GAME_PRODUCT]: { 
    title: 'Game Details', 
    breadcrumb: ['Home', 'Browse Games', 'Game Details'],
    isPublic: true 
  },
  [PageType.WISHLIST]: { 
    title: 'My Wishlist', 
    breadcrumb: ['Home', 'My Wishlist'],
    requiresAuth: true 
  },
  [PageType.CART]: { 
    title: 'Shopping Cart', 
    breadcrumb: ['Home', 'Shopping Cart'],
    isPublic: true 
  },
  [PageType.DEVELOPERS]: { 
    title: 'For Developers', 
    breadcrumb: ['Home', 'For Developers'],
    isPublic: true 
  },
  [PageType.FREE_ZONE]: { 
    title: 'Free Games', 
    breadcrumb: ['Home', 'Free Games'],
    isPublic: true 
  },
  [PageType.GENRES]: { 
    title: 'Game Genres', 
    breadcrumb: ['Home', 'Game Genres'],
    isPublic: true 
  },
  [PageType.NOVAVERSE]: { 
    title: 'NovaVerse Community', 
    breadcrumb: ['Home', 'NovaVerse'],
    isPublic: true 
  },
  [PageType.FORUMS]: { 
    title: 'Community Forums', 
    breadcrumb: ['Home', 'NovaVerse', 'Forums'],
    isPublic: true 
  },
  [PageType.GROUPS]: { 
    title: 'Gaming Groups', 
    breadcrumb: ['Home', 'NovaVerse', 'Groups'],
    isPublic: true 
  },
  [PageType.LFG]: { 
    title: 'Looking for Group', 
    breadcrumb: ['Home', 'NovaVerse', 'LFG'],
    isPublic: true 
  },
  [PageType.CREATOR_HUB]: { 
    title: 'Creator Hub', 
    breadcrumb: ['Home', 'NovaVerse', 'Creator Hub'],
    requiresAuth: true 
  },
  [PageType.NEWS]: { 
    title: 'News & Updates', 
    breadcrumb: ['Home', 'News'],
    isPublic: true 
  },
  [PageType.SUPPORT]: { 
    title: 'Customer Support', 
    breadcrumb: ['Home', 'Support'],
    isPublic: true 
  },
  [PageType.PROFILE]: { 
    title: 'My Profile', 
    breadcrumb: ['Home', 'My Profile'],
    requiresAuth: true 
  },
  [PageType.LAUNCHER]: { 
    title: 'Download Launcher', 
    breadcrumb: ['Home', 'Download'],
    isPublic: true 
  },
  [PageType.CHECKOUT]: { 
    title: 'Checkout', 
    breadcrumb: ['Home', 'Shopping Cart', 'Checkout'],
    isPublic: true 
  },
  [PageType.CHECKOUT_BILLING]: { 
    title: 'Checkout - Billing', 
    breadcrumb: ['Home', 'Shopping Cart', 'Checkout', 'Billing'],
    isPublic: true 
  },
  [PageType.CHECKOUT_PAYMENT]: { 
    title: 'Checkout - Payment', 
    breadcrumb: ['Home', 'Shopping Cart', 'Checkout', 'Payment'],
    isPublic: true 
  },
  [PageType.CHECKOUT_REVIEW]: { 
    title: 'Checkout - Review', 
    breadcrumb: ['Home', 'Shopping Cart', 'Checkout', 'Review'],
    isPublic: true 
  },
  [PageType.ORDER_COMPLETE]: { 
    title: 'Order Complete', 
    breadcrumb: ['Home', 'Order Complete'],
    isPublic: true 
  },
  [PageType.SIGN_UP]: { 
    title: 'Sign Up', 
    breadcrumb: ['Home', 'Sign Up'],
    isPublic: true 
  },
  [PageType.SIGN_IN]: { 
    title: 'Sign In', 
    breadcrumb: ['Home', 'Sign In'],
    isPublic: true 
  },
  [PageType.ORDER_HISTORY]: { 
    title: 'Order History', 
    breadcrumb: ['Home', 'My Profile', 'Order History'],
    requiresAuth: true 
  },
  [PageType.PAYMENT_METHODS]: { 
    title: 'Payment Methods', 
    breadcrumb: ['Home', 'My Profile', 'Payment Methods'],
    requiresAuth: true 
  },
  [PageType.ADDRESS_MANAGEMENT]: { 
    title: 'Address Management', 
    breadcrumb: ['Home', 'My Profile', 'Address Management'],
    requiresAuth: true 
  }
};

// Enhanced Breadcrumb Component with better accessibility
function Breadcrumb({ 
  navigationState, 
  onNavigate 
}: { 
  navigationState: NavigationState;
  onNavigate: (page: PageType) => void;
}) {
  const metadata = PAGE_METADATA[navigationState.currentPage];
  if (!metadata || navigationState.currentPage === PageType.HOME) return null;

  const handleBreadcrumbClick = (index: number) => {
    // Navigate to appropriate page based on breadcrumb position
    if (index === 0) {
      onNavigate(PageType.HOME);
    } else if (index === 1 && metadata.breadcrumb[1] === 'Browse Games') {
      onNavigate(PageType.BROWSE);
    } else if (index === 1 && metadata.breadcrumb[1] === 'NovaVerse') {
      onNavigate(PageType.NOVAVERSE);
    } else if (index === 1 && metadata.breadcrumb[1] === 'My Profile') {
      onNavigate(PageType.PROFILE);
    } else if (index === 1 && metadata.breadcrumb[1] === 'Shopping Cart') {
      onNavigate(PageType.CART);
    }
    // Add more specific navigation logic as needed
  };

  return (
    <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--border-subtle)]" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 sm:space-x-2 text-sm">
        {metadata.breadcrumb.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-[var(--text-muted)]" />}
            {index === metadata.breadcrumb.length - 1 ? (
              <span className="text-[var(--text-primary)] font-medium text-sm sm:text-base" aria-current="page">
                {crumb}
              </span>
            ) : (
              <button 
                className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-opacity-50 rounded text-sm sm:text-base"
                onClick={() => handleBreadcrumbClick(index)}
                aria-label={`Navigate to ${crumb}`}
              >
                {crumb}
              </button>
            )}
          </li>
        ))}
      </ol>

      {/* Back Button for Better Navigation Control */}
      {navigationState.canGoBack && (
        <div className="mt-2 sm:mt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] h-8 sm:h-9"
            onClick={() => onNavigate(navigationState.previousPage!)}
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            返回
          </Button>
        </div>
      )}
    </nav>
  );
}

// Enhanced Loading Component with Progress Indication
function LoadingSpinner({ 
  message = "Loading...", 
  progress,
  showCancel = false,
  onCancel 
}: { 
  message?: string;
  progress?: number;
  showCancel?: boolean;
  onCancel?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 space-y-3 sm:space-y-4 px-4">
      <div className="relative">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-[var(--accent-blue)]" />
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-[var(--accent-blue)]">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
      <p className="text-[var(--text-secondary)] text-center max-w-sm text-sm sm:text-base" role="status" aria-live="polite">
        {message}
      </p>
      {progress !== undefined && (
        <div className="w-32 sm:w-48 h-2 bg-[var(--slate-medium)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--accent-blue)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {showCancel && onCancel && (
        <Button variant="outline" size="sm" onClick={onCancel}>
          取消
        </Button>
      )}
    </div>
  );
}

// Enhanced Error Boundary Component with Better Recovery Options
function ErrorFallback({ 
  error, 
  resetError,
  currentPage 
}: { 
  error: Error; 
  resetError: () => void;
  currentPage?: PageType;
}) {
  const getErrorAdvice = (error: Error) => {
    if (error.message.includes('Network')) {
      return {
        title: '網路連線問題',
        description: '請檢查您的網路連線並重試。',
        actions: [
          { label: '重新連線', action: resetError, primary: true },
          { label: '離線瀏覽', action: () => window.location.reload() }
        ]
      };
    }
    
    if (error.message.includes('Not Found')) {
      return {
        title: '頁面不存在',
        description: '您訪問的頁面可能已被移動或刪除。',
        actions: [
          { label: '返回首頁', action: () => window.location.href = '/', primary: true },
          { label: '瀏覽遊戲', action: () => window.location.href = '/?page=browse' }
        ]
      };
    }

    return {
      title: '發生了未預期的錯誤',
      description: '我們遇到了技術問題，請稍後再試。',
      actions: [
        { label: '重試', action: resetError, primary: true },
        { label: '重新整理頁面', action: () => window.location.reload() }
      ]
    };
  };

  const errorAdvice = getErrorAdvice(error);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <Card className="vanguard-card p-6 sm:p-8 max-w-lg text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--destructive)]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--destructive)]" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{errorAdvice.title}</h2>
        <p className="text-[var(--text-secondary)] mb-4 sm:mb-6 text-sm sm:text-base">
          {errorAdvice.description}
        </p>
        
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {errorAdvice.actions.map((action, index) => (
            <Button 
              key={index}
              onClick={action.action} 
              className={action.primary ? "vanguard-btn-primary w-full" : "vanguard-btn-secondary w-full"}
              variant={action.primary ? "default" : "outline"}
              size="sm"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* Contact Support Option */}
        <div className="border-t border-[var(--border-subtle)] pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-2 sm:mb-3">
            問題持續發生嗎？
          </p>
          <Button variant="ghost" size="sm" className="text-[var(--accent-blue)]">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            聯繫客服支援
          </Button>
        </div>

        {/* Error Details for Debug */}
        <details className="mt-4 sm:mt-6 text-left">
          <summary className="text-xs sm:text-sm text-[var(--text-muted)] cursor-pointer hover:text-[var(--accent-blue)]">
            錯誤詳細資訊
          </summary>
          <pre className="text-xs text-[var(--text-muted)] mt-2 p-2 sm:p-3 bg-[var(--slate-medium)] rounded overflow-auto">
            {error.message}
            {error.stack && '\n\n' + error.stack}
          </pre>
        </details>
      </Card>
    </div>
  );
}

// Enhanced Confirmation Dialog Component
function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "確認",
  cancelText = "取消",
  variant = "default"
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="vanguard-card border-[var(--border-subtle)] w-[90vw] max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg">
            {variant === "destructive" ? (
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--destructive)]" />
            ) : (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-blue)]" />
            )}
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)] text-sm sm:text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-2 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {cancelText}
          </Button>
          <Button 
            onClick={onConfirm}
            className={variant === "destructive" ? "bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 w-full sm:w-auto" : "vanguard-btn-primary w-full sm:w-auto"}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Network Status Indicator
function NetworkStatus({ isOnline }: { isOnline: boolean }) {
  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-[var(--destructive)] text-white py-2 px-4 text-center z-50">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">您目前處於離線狀態</span>
      </div>
    </div>
  );
}

// Enhanced Placeholder Page Component
function PlaceholderPage({ 
  title, 
  description, 
  icon: Icon,
  actions = []
}: { 
  title: string; 
  description: string; 
  icon: any;
  actions?: Array<{ label: string; onClick: () => void; variant?: "default" | "outline" }>;
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 content-width text-center">
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 cosmic-glow">
        <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
      </div>
      <h1 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-gradient">{title}</h1>
      <p className="text-[var(--text-secondary)] text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <Button 
              key={index}
              onClick={action.onClick}
              variant={action.variant || "default"}
              className={action.variant === "outline" ? "vanguard-btn-secondary w-full sm:w-auto" : "vanguard-btn-primary w-full sm:w-auto"}
              size="sm"
            >
              {action.label}
            </Button>
          ))
        ) : (
          <Button className="vanguard-btn-primary w-full sm:w-auto">
            敬請期待
          </Button>
        )}
      </div>
    </div>
  );
}

// Main App Component with Enhanced State Management
export default function App() {
  // Enhanced App State Management
  const [appState, setAppState] = useState<AppState>({
    navigation: {
      currentPage: PageType.HOME,
      previousPage: null,
      navigationHistory: [PageType.HOME],
      selectedGameId: null,
      canGoBack: false
    },
    ui: {
      isLoading: false,
      isOnline: navigator.onLine,
      lastAction: null,
      showConfirmDialog: false,
      confirmAction: null,
      confirmMessage: ''
    },
    cart: {
      items: [],
      isModified: false,
      lastModified: null
    }
  });

  // Network Status Monitoring
  useEffect(() => {
    const handleOnline = () => {
      setAppState(prev => ({
        ...prev,
        ui: { ...prev.ui, isOnline: true }
      }));
      toast.success('網路連線已恢復');
    };

    const handleOffline = () => {
      setAppState(prev => ({
        ...prev,
        ui: { ...prev.ui, isOnline: false }
      }));
      toast.error('網路連線中斷');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enhanced Navigation Handler with History Management
  const handleNavigate = useCallback((newPage: PageType, options?: { 
    gameId?: string;
    replaceHistory?: boolean;
    confirmNavigation?: boolean;
  }) => {
    const { gameId, replaceHistory = false, confirmNavigation = false } = options || {};

    // Check if navigation confirmation is needed (e.g., unsaved changes)
    if (confirmNavigation && appState.cart.isModified) {
      setAppState(prev => ({
        ...prev,
        ui: {
          ...prev.ui,
          showConfirmDialog: true,
          confirmMessage: '您有未保存的購物車變更，確定要離開嗎？',
          confirmAction: () => performNavigation(newPage, gameId, replaceHistory)
        }
      }));
      return;
    }

    performNavigation(newPage, gameId, replaceHistory);
  }, [appState.cart.isModified]);

  const performNavigation = useCallback((newPage: PageType, gameId?: string, replaceHistory = false) => {
    setAppState(prev => {
      const newHistory = replaceHistory 
        ? [...prev.navigation.navigationHistory.slice(0, -1), newPage]
        : [...prev.navigation.navigationHistory, newPage];

      return {
        ...prev,
        navigation: {
          currentPage: newPage,
          previousPage: prev.navigation.currentPage,
          navigationHistory: newHistory,
          selectedGameId: gameId || (newPage === PageType.GAME_PRODUCT ? prev.navigation.selectedGameId : null),
          canGoBack: newHistory.length > 1
        },
        ui: {
          ...prev.ui,
          showConfirmDialog: false,
          confirmAction: null,
          lastAction: `Navigated to ${newPage}`
        }
      };
    });

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced Game Selection Handler
  const handleGameSelect = useCallback((game: GameData) => {
    handleNavigate(PageType.GAME_PRODUCT, { gameId: game.id });
    
    toast.success(`正在查看${game.titleCN || game.title}`, {
      description: `${game.developer} 開發`,
      duration: 2000,
    });
  }, [handleNavigate]);

  // Enhanced Cart Management with Better State Tracking
  const handleAddToCart = useCallback((game: GameData, edition?: any) => {
    const cartItem: CartItem = {
      id: `${game.id}-${edition?.id || 'standard'}`,
      gameId: game.id,
      title: game.titleCN || game.title,
      developer: game.developer,
      edition: edition?.name || 'Standard Edition',
      price: edition?.price || game.price,
      discount: edition?.discount || game.discount,
      coverImage: game.coverImage,
      quantity: 1
    };

    setAppState(prev => {
      const existingItem = prev.cart.items.find(item => item.id === cartItem.id);
      const newItems = existingItem 
        ? prev.cart.items.map(item =>
            item.id === cartItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev.cart.items, cartItem];

      return {
        ...prev,
        cart: {
          items: newItems,
          isModified: true,
          lastModified: new Date()
        },
        ui: {
          ...prev.ui,
          lastAction: `Added ${game.titleCN || game.title} to cart`
        }
      };
    });

    toast.success(`已將${game.titleCN || game.title}加入購物車！`, {
      description: `${edition?.name || 'Standard Edition'} 已加入你的購物車`,
      action: {
        label: "查看購物車",
        onClick: () => handleNavigate(PageType.CART),
      },
      duration: 3000,
    });
  }, [handleNavigate]);

  const handleUpdateCartQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setAppState(prev => ({
      ...prev,
      cart: {
        ...prev.cart,
        items: prev.cart.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        ),
        isModified: true,
        lastModified: new Date()
      }
    }));
  }, []);

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setAppState(prev => {
      const removedItem = prev.cart.items.find(item => item.id === itemId);
      
      if (removedItem) {
        toast.success(`已移除${removedItem.title}`, {
          description: '商品已從購物車中移除',
          action: {
            label: "復原",
            onClick: () => {
              setAppState(current => ({
                ...current,
                cart: {
                  ...current.cart,
                  items: [...current.cart.items, removedItem],
                  isModified: true,
                  lastModified: new Date()
                }
              }));
            },
          },
          duration: 5000,
        });
      }

      return {
        ...prev,
        cart: {
          ...prev.cart,
          items: prev.cart.items.filter(item => item.id !== itemId),
          isModified: true,
          lastModified: new Date()
        }
      };
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      ui: {
        ...prev.ui,
        showConfirmDialog: true,
        confirmMessage: `確定要清空購物車嗎？這將移除所有 ${prev.cart.items.length} 個商品。`,
        confirmAction: () => {
          setAppState(current => ({
            ...current,
            cart: {
              items: [],
              isModified: false,
              lastModified: new Date()
            }
          }));
          toast.success('購物車已清空');
        }
      }
    }));
  }, []);

  const handleProceedToCheckout = useCallback(() => {
    if (appState.cart.items.length === 0) {
      toast.error("購物車是空的", {
        description: "請先添加一些遊戲到購物車再進行結帳。",
        action: {
          label: "瀏覽遊戲",
          onClick: () => handleNavigate(PageType.BROWSE),
        },
        duration: 5000,
      });
      return;
    }
    handleNavigate(PageType.CHECKOUT);
  }, [appState.cart.items.length, handleNavigate]);

  // Custom event listeners for navigation (Enhanced for consistency)
  useEffect(() => {
    const navigationEventHandlers = {
      'navigate-to-wishlist': () => handleNavigate(PageType.WISHLIST),
      'navigate-to-cart': () => handleNavigate(PageType.CART),
      'navigate-to-browse': () => handleNavigate(PageType.BROWSE),
      'navigate-to-free-zone': () => handleNavigate(PageType.FREE_ZONE),
    };

    Object.entries(navigationEventHandlers).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.entries(navigationEventHandlers).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [handleNavigate]);

  // Keyboard Shortcuts for Better Accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'h':
            event.preventDefault();
            handleNavigate(PageType.HOME);
            break;
          case 'b':
            event.preventDefault();
            handleNavigate(PageType.BROWSE);
            break;
          case 'w':
            event.preventDefault();
            handleNavigate(PageType.WISHLIST);
            break;
          case 'k':
            event.preventDefault();
            // Focus on search input (would need to implement)
            toast.info('搜尋功能即將推出');
            break;
        }
      }

      // ESC key handling
      if (event.key === 'Escape') {
        if (appState.ui.showConfirmDialog) {
          setAppState(prev => ({
            ...prev,
            ui: { ...prev.ui, showConfirmDialog: false, confirmAction: null }
          }));
        }
      }

      // Go back with Alt + Left Arrow
      if (event.altKey && event.key === 'ArrowLeft' && appState.navigation.canGoBack) {
        event.preventDefault();
        handleNavigate(appState.navigation.previousPage!);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState.ui.showConfirmDialog, appState.navigation.canGoBack, appState.navigation.previousPage, handleNavigate]);

  // Memoized calculations for performance
  const cartItemCount = useMemo(() => 
    appState.cart.items.reduce((total, item) => total + item.quantity, 0),
    [appState.cart.items]
  );

  // Page content renderer with better error handling
  const renderPageContent = useCallback(() => {
    const { currentPage, selectedGameId } = appState.navigation;

    try {
      switch (currentPage) {
        case PageType.HOME:
          return (
            <>
              <HeroCarousel 
                onGameSelect={handleGameSelect}
                onAddToCart={handleAddToCart}
              />
              <GameDiscovery 
                onGameSelect={handleGameSelect}
                onAddToCart={handleAddToCart}
              />
              <NovaVerseTeaser onNavigate={(page) => handleNavigate(page as PageType)} />
            </>
          );

        case PageType.BROWSE:
          return (
            <BrowseGamesPage
              onGameSelect={handleGameSelect}
              onAddToCart={handleAddToCart}
            />
          );

        case PageType.GAME_PRODUCT:
          return (
            <GameProductPage
              gameId={selectedGameId}
              onAddToCart={handleAddToCart}
              onBack={() => handleNavigate(appState.navigation.previousPage || PageType.BROWSE)}
            />
          );

        case PageType.WISHLIST:
          return (
            <WishlistPage
              onGameSelect={handleGameSelect}
              onAddToCart={handleAddToCart}
            />
          );

        case PageType.CART:
          return (
            <ShoppingCart
              items={appState.cart.items}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onProceedToCheckout={handleProceedToCheckout}
              onContinueShopping={() => handleNavigate(PageType.BROWSE)}
            />
          );

        case PageType.DEVELOPERS:
          return <DeveloperLandingPage onNavigate={(page) => handleNavigate(page as PageType)} />;

        case PageType.FREE_ZONE:
          return (
            <PlaceholderPage
              title="免費遊戲專區"
              description="探索精選的免費遊戲，從獨立製作到3A大作，找到您的下一個最愛遊戲，完全免費。"
              icon={Sparkles}
              actions={[
                { label: '瀏覽免費遊戲', onClick: () => handleNavigate(PageType.BROWSE) },
                { label: '查看熱門遊戲', onClick: () => handleNavigate(PageType.BROWSE), variant: 'outline' }
              ]}
            />
          );

        case PageType.GENRES:
          return (
            <PlaceholderPage
              title="遊戲分類"
              description="按類型探索遊戲。無論您喜歡動作冒險、策略挑戰還是沉浸式RPG，都能找到您想要的內容。"
              icon={Package}
              actions={[
                { label: '探索分類', onClick: () => handleNavigate(PageType.BROWSE) }
              ]}
            />
          );

        case PageType.NOVAVERSE:
        case PageType.FORUMS:
        case PageType.GROUPS:
        case PageType.LFG:
        case PageType.CREATOR_HUB:
          return (
            <PlaceholderPage
              title="NovaVerse 社群"
              description="與玩家夥伴連接、加入群組、參與論壇討論，一起發現新的遊戲體驗。社群功能即將推出！"
              icon={Users}
              actions={[
                { label: '加入等候名單', onClick: () => toast.info('感謝您的關注！我們會在功能推出時通知您。') },
                { label: '瀏覽遊戲', onClick: () => handleNavigate(PageType.BROWSE), variant: 'outline' }
              ]}
            />
          );

        case PageType.SUPPORT:
          return (
            <PlaceholderPage
              title="客戶支援"
              description="需要幫助嗎？我們的24/7支援團隊隨時為您解答遊戲、帳戶或技術問題。"
              icon={MessageCircle}
              actions={[
                { label: '聯繫客服', onClick: () => toast.info('客服系統即將推出') },
                { label: '常見問題', onClick: () => toast.info('FAQ頁面開發中'), variant: 'outline' }
              ]}
            />
          );

        case PageType.PROFILE:
          return (
            <PlaceholderPage
              title="我的檔案"
              description="管理您的帳戶設定、查看遊戲庫、檢查訂單歷史，自訂您的遊戲體驗。"
              icon={Shield}
              actions={[
                { label: '編輯檔案', onClick: () => toast.info('檔案編輯功能開發中') },
                { label: '檢視遊戲庫', onClick: () => handleNavigate(PageType.BROWSE), variant: 'outline' }
              ]}
            />
          );

        case PageType.LAUNCHER:
          return (
            <PlaceholderPage
              title="NovaCore 啟動器"
              description="下載NovaCore啟動器，享受終極遊戲體驗。存取您的遊戲庫、自動更新和專屬功能。"
              icon={Download}
              actions={[
                { label: '下載啟動器', onClick: () => toast.info('啟動器即將推出') },
                { label: '系統需求', onClick: () => toast.info('系統需求頁面開發中'), variant: 'outline' }
              ]}
            />
          );

        case PageType.CHECKOUT:
          return (
            <PlaceholderPage
              title="結帳"
              description="安全完成您的購買。我們支援多種付款方式，確保您的交易安全加密。"
              icon={CreditCard}
              actions={[
                { label: '返回購物車', onClick: () => handleNavigate(PageType.CART) },
                { label: '繼續購物', onClick: () => handleNavigate(PageType.BROWSE), variant: 'outline' }
              ]}
            />
          );

        default:
          return (
            <PlaceholderPage
              title="頁面不存在"
              description="您尋找的頁面尚不存在。我們持續新增新功能來提升您的遊戲體驗。"
              icon={AlertCircle}
              actions={[
                { label: '返回首頁', onClick: () => handleNavigate(PageType.HOME) },
                { label: '瀏覽遊戲', onClick: () => handleNavigate(PageType.BROWSE), variant: 'outline' }
              ]}
            />
          );
      }
    } catch (error) {
      console.error('Error rendering page content:', error);
      return (
        <ErrorFallback 
          error={error instanceof Error ? error : new Error('Unknown error')}
          resetError={() => handleNavigate(PageType.HOME)}
          currentPage={currentPage}
        />
      );
    }
  }, [appState.navigation, appState.cart.items, handleGameSelect, handleAddToCart, handleNavigate, handleUpdateCartQuantity, handleRemoveFromCart, handleClearCart, handleProceedToCheckout]);

  return (
    <WishlistProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] digital-vanguard-bg">
        {/* Network Status Indicator */}
        <NetworkStatus isOnline={appState.ui.isOnline} />

        {/* Header with Enhanced Props */}
        <Header
          currentPage={appState.navigation.currentPage}
          onNavigate={(page) => handleNavigate(page as PageType)}
          cartItemCount={cartItemCount}
          cartItems={appState.cart.items}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onProceedToCheckout={handleProceedToCheckout}
          onGameSelect={handleGameSelect}
          isOnline={appState.ui.isOnline}
        />

        {/* Enhanced Breadcrumb */}
        <Breadcrumb 
          navigationState={appState.navigation}
          onNavigate={handleNavigate}
        />

        {/* Main Content */}
        <main className="flex-1" role="main">
          {appState.ui.isLoading ? (
            <LoadingSpinner message="載入您的遊戲體驗中..." />
          ) : (
            renderPageContent()
          )}
        </main>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={appState.ui.showConfirmDialog}
          onClose={() => setAppState(prev => ({
            ...prev,
            ui: { ...prev.ui, showConfirmDialog: false, confirmAction: null }
          }))}
          onConfirm={() => {
            appState.ui.confirmAction?.();
            setAppState(prev => ({
              ...prev,
              ui: { ...prev.ui, showConfirmDialog: false, confirmAction: null }
            }));
          }}
          title="確認操作"
          description={appState.ui.confirmMessage}
          variant={appState.ui.confirmMessage.includes('清空') ? 'destructive' : 'default'}
        />

        {/* Enhanced Responsive Footer */}
        <footer className="border-t border-[var(--border-subtle)] mt-16 sm:mt-20">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 content-width">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gradient">NovaCore</h3>
                    <p className="text-xs text-[var(--text-muted)]">Gaming Platform</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                  終極遊戲目的地。發現、遊玩並與全球遊戲社群連接。
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <Button variant="ghost" size="sm" className="vanguard-btn-ghost w-8 h-8 sm:w-10 sm:h-10 p-0" aria-label="GitHub">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="vanguard-btn-ghost w-8 h-8 sm:w-10 sm:h-10 p-0" aria-label="Twitter">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="vanguard-btn-ghost w-8 h-8 sm:w-10 sm:h-10 p-0" aria-label="Discord">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 text-sm sm:text-base">快速連結</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.BROWSE)}>瀏覽遊戲</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.FREE_ZONE)}>免費遊戲</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.WISHLIST)}>願望清單</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.LAUNCHER)}>下載啟動器</Button></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 text-sm sm:text-base">支援</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.SUPPORT)}>客戶支援</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => toast.info('開發中')}>常見問題</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => handleNavigate(PageType.DEVELOPERS)}>開發者資源</Button></li>
                  <li><Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]" onClick={() => toast.info('開發中')}>系統需求</Button></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-[var(--border-subtle)] mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    © 2024 NovaCore. 版權所有。
                  </p>
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-xs text-[var(--text-muted)] hover:text-[var(--accent-blue)]" onClick={() => toast.info('開發中')}>隱私政策</Button>
                    <Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-xs text-[var(--text-muted)] hover:text-[var(--accent-blue)]" onClick={() => toast.info('開發中')}>使用條款</Button>
                    <Button variant="ghost" size="sm" className="vanguard-btn-ghost h-auto p-0 text-xs text-[var(--text-muted)] hover:text-[var(--accent-blue)]" onClick={() => toast.info('開發中')}>Cookie 政策</Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--text-muted)]" />
                  <span className="text-xs sm:text-sm text-[var(--text-muted)]">繁體中文</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--slate-dark)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            },
          }}
        />
      </div>
    </WishlistProvider>
  );
}