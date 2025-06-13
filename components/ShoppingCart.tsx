import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart as CartIcon,
  ArrowRight,
  Tag,
  Gift
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CartItem {
  id: string;
  gameId: string;
  title: string;
  developer: string;
  edition: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  coverImage: string;
  drmType: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping
}: ShoppingCartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const total = subtotal - promoDiscount;

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'nova10') {
      setAppliedPromo({ code: promoCode, discount: 10 });
    } else if (promoCode.toLowerCase() === 'welcome15') {
      setAppliedPromo({ code: promoCode, discount: 15 });
    } else {
      // Invalid promo code - in real app, show error
      alert('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-12 bg-nova-surface border-nova-surface-light">
            <div className="w-24 h-24 bg-nova-surface-light rounded-full flex items-center justify-center mx-auto mb-6">
              <CartIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any games to your cart yet. 
              Discover amazing games in our store!
            </p>
            <Button 
              size="lg"
              onClick={onContinueShopping}
              className="bg-nova-cyan text-nova-dark hover:bg-nova-cyan/90"
            >
              Browse Games
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-6 bg-nova-surface border-nova-surface-light">
              <div className="flex gap-4">
                {/* Game Cover */}
                <div className="w-20 h-28 flex-shrink-0 rounded overflow-hidden">
                  <ImageWithFallback
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Game Info */}
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.developer}</p>
                    <Badge 
                      variant="outline" 
                      className="text-xs mt-1 border-nova-surface-light"
                    >
                      {item.edition}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="text-xs mt-1 ml-2 border-nova-cyan/30 text-nova-cyan"
                    >
                      {item.drmType}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 border-nova-surface-light"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 border-nova-surface-light"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                        <div className="text-lg font-bold text-nova-cyan">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.discount && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">
                            -{item.discount}%
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
          <Card className="p-6 bg-nova-surface border-nova-surface-light">
            <h3 className="font-semibold mb-4 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-nova-amber" />
              Promo Code
            </h3>
            {!appliedPromo ? (
              <div className="space-y-3">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-nova-dark border-nova-surface-light"
                />
                <Button
                  size="sm"
                  onClick={handleApplyPromo}
                  disabled={!promoCode}
                  className="w-full bg-nova-amber text-nova-dark hover:bg-nova-amber/90"
                >
                  Apply Code
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    {appliedPromo.code.toUpperCase()} applied
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRemovePromo}
                  className="text-red-400 hover:text-red-300 h-auto p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </Card>

          {/* Order Summary */}
          <Card className="p-6 bg-nova-surface border-nova-surface-light">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-green-400">
                  <span>Promo Discount ({appliedPromo.discount}%)</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              
              <Separator className="bg-nova-surface-light" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-nova-cyan">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={onProceedToCheckout}
              className="w-full mt-6 bg-nova-amber text-nova-dark hover:bg-nova-amber/90 nova-amber-hover text-[rgba(255,255,255,1)] bg-[rgba(0,218,255,0.2)]"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={onContinueShopping}
              className="w-full mt-3 border-nova-surface-light"
            >
              Continue Shopping
            </Button>
          </Card>

          {/* Security Info */}
          <Card className="p-4 bg-nova-indigo-light border-nova-surface-light">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">🔒 Secure Checkout</p>
              <p>Your payment information is encrypted and secure. We support all major payment methods.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}