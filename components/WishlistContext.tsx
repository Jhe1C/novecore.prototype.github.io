import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistGame {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  drmType: 'DRM-Free' | 'Light' | 'Platform';
  platforms: ('Windows' | 'Mac' | 'Linux')[];
  discount?: number;
  genre: string;
  addedDate: Date;
  releaseDate?: Date;
  isReleased: boolean;
}

interface WishlistContextType {
  wishlistItems: WishlistGame[];
  addToWishlist: (game: Omit<WishlistGame, 'addedDate'>) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistGame[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('novacore-wishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        // Convert date strings back to Date objects
        const itemsWithDates = parsed.map((item: any) => ({
          ...item,
          addedDate: new Date(item.addedDate),
          releaseDate: item.releaseDate ? new Date(item.releaseDate) : undefined
        }));
        setWishlistItems(itemsWithDates);
      } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('novacore-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (game: Omit<WishlistGame, 'addedDate'>) => {
    const newGame: WishlistGame = {
      ...game,
      addedDate: new Date()
    };
    
    setWishlistItems(prev => {
      // Avoid duplicates
      if (prev.some(item => item.id === game.id)) {
        return prev;
      }
      return [...prev, newGame];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== gameId));
  };

  const isInWishlist = (gameId: string) => {
    return wishlistItems.some(item => item.id === gameId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}