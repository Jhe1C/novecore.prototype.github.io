import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ShoppingCart, 
  X, 
  ArrowRight,
  Package,
  Minus,
  Plus
} from 'lucide-react';
import { CartItem } from './ShoppingCart';

interface MiniCartPreviewProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onViewFullCart: () => void;
  onProceedToCheckout: () => void;
}

export function MiniCartPreview({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onViewFullCart,
  onProceedToCheckout
}: MiniCartPreviewProps) {
  const [removing, setRemoving] = useState<string | null>(null);

  const subtotal = items.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveItem = async (itemId: string) => {
    setRemoving(itemId);
    
    // Add a small delay for better UX
    setTimeout(() => {
      onRemoveItem(itemId);
      setRemoving(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />
      
      {/* Mini Cart Dropdown */}
      <div className="mini-cart-preview">
        <Card className="mini-cart-content">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--accent-blue)]/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-[var(--accent-blue)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Shopping Cart</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="vanguard-btn-ghost w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="mini-cart-items">
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[var(--slate-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-[var(--text-muted)]" />
                </div>
                <p className="text-[var(--text-secondary)] mb-2">Your cart is empty</p>
                <p className="text-sm text-[var(--text-muted)]">Add some games to get started!</p>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {items.map((item) => {
                  const finalPrice = item.discount 
                    ? item.price * (1 - item.discount / 100)
                    : item.price;
                  
                  const isRemoving = removing === item.id;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`group p-3 rounded-lg bg-[var(--slate-medium)]/30 hover:bg-[var(--slate-medium)]/50 transition-all duration-300 ${
                        isRemoving ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="flex space-x-3">
                        {/* Game Cover */}
                        <div className="relative w-12 h-16 flex-shrink-0">
                          <ImageWithFallback
                            src={item.coverImage}
                            alt={`${item.title} cover`}
                            className="w-full h-full object-cover rounded"
                          />
                          {item.discount && (
                            <div className="absolute -top-1 -right-1">
                              <Badge className="modern-badge modern-badge-green text-xs px-1 py-0">
                                -{item.discount}%
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Game Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-[var(--text-primary)] mb-1 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)] mb-1 line-clamp-1">
                            {item.developer}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] mb-2">
                            {item.edition}
                          </p>
                          
                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="w-6 h-6 p-0 hover:bg-[var(--slate-light)]"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-xs font-medium min-w-[1rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 p-0 hover:bg-[var(--slate-light)]"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-semibold text-[var(--accent-green)]">
                                  ${(finalPrice * item.quantity).toFixed(2)}
                                </div>
                                {item.discount && (
                                  <div className="text-xs text-[var(--text-muted)] line-through">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                )}
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)]"
                                disabled={isRemoving}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <>
              <Separator className="bg-[var(--border-subtle)]" />
              
              <div className="p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-lg font-bold text-[var(--accent-green)]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={onViewFullCart}
                    className="vanguard-btn-secondary w-full"
                  >
                    View Cart
                  </Button>
                  <Button
                    onClick={onProceedToCheckout}
                    className="vanguard-btn-primary w-full group"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Additional Info */}
                <p className="text-xs text-[var(--text-muted)] text-center">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}