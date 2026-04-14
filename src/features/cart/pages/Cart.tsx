import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Breadcrumb } from '@components/ui/Breadcrumb';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export const Cart: React.FC<CartProps> = ({
  onCheckout,
  onContinueShopping,
}) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Smartphone Pro',
      price: 899.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150x150?text=Phone',
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      price: 149.99,
      quantity: 2,
      image: 'https://via.placeholder.com/150x150?text=Headphones',
    },
  ]);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(id);
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shopping Cart', current: true },
          ]}
          className="mb-8"
        />

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything yet
            </p>
            <Button size="lg" onClick={onContinueShopping}>
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-bold text-yellow-400">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col justify-between items-end">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 mb-4">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded font-bold hover:bg-gray-100"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value))
                          }
                          className="w-12 text-center border border-gray-300 rounded py-1"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded font-bold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card className="p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-yellow-400 font-medium">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-yellow-400">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button
                  size="lg"
                  fullWidth
                  className="font-bold mb-3"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  variant="outline"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </Button>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-gray-700">
                  <p className="font-medium mb-1">💬 Promo Code?</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                    <Button size="sm" variant="primary">
                      Apply
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Cart.displayName = 'Cart';
