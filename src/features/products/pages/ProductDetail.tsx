import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Rating } from '@components/ui/Rating';
import { Breadcrumb } from '@components/ui/Breadcrumb';
import { Badge } from '@components/ui/Badge';

interface ProductDetailProps {
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: () => void;
  onNavigateBreadcrumb?: (href: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  onAddToCart,
  onBuyNow,
  onNavigateBreadcrumb,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('black');

  // Mock data - replace with props or API
  const product = {
    id: '1',
    name: 'Smartphone Pro Max 2024',
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    sku: 'SPM-2024-001',
    category: 'Electronics',
    images: [
      'https://via.placeholder.com/600x600?text=Phone+Front',
      'https://via.placeholder.com/600x600?text=Phone+Back',
      'https://via.placeholder.com/600x600?text=Phone+Side',
      'https://via.placeholder.com/600x600?text=Phone+Box',
    ],
    variants: {
      colors: ['black', 'silver', 'gold', 'blue'],
      storage: ['128GB', '256GB', '512GB'],
    },
    description:
      'Experience power and elegance with our flagship smartphone. Features a stunning 6.7" display, advanced camera system, and all-day battery life.',
    specs: [
      { label: 'Display', value: '6.7" AMOLED 120Hz' },
      { label: 'Processor', value: 'Latest Gen Snapdragon' },
      { label: 'RAM', value: '12GB' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Camera', value: '108MP Main' },
      { label: 'OS', value: 'Latest Android' },
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: '2-5',
      returnDays: 30,
    },
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.category, href: `/products?cat=${product.category}` },
            { label: product.name, current: true },
          ]}
          onNavigate={onNavigateBreadcrumb}
          className="mb-8"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg mb-4 h-96 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === idx
                      ? 'border-yellow-400'
                      : 'border-gray-300 hover:border-yellow-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Rating & Status */}
            <div className="flex items-center gap-4 mb-4">
              <Rating value={product.rating} readonly count={product.reviewCount} />
              {product.discount && (
                <Badge variant="danger">{product.discount}% OFF</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-yellow-400">
                  ${product.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Color</label>
              <div className="flex gap-2">
                {product.variants.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedVariant(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition capitalize ${
                      selectedVariant === color
                        ? 'border-yellow-400'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor:
                        color === 'black'
                          ? '#000'
                          : color === 'silver'
                          ? '#c0c0c0'
                          : color === 'gold'
                          ? '#ffd700'
                          : '#1e40af',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-3 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg font-bold hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flexgap-3 mb-6">
              <Button
                size="lg"
                fullWidth
                variant="primary"
                className="font-bold"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="outline"
                className="font-bold mt-3"
                onClick={onBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badge */}
            <Card className="p-4 bg-yellow-50">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    100% Secure Transaction
                  </p>
                  <p className="text-sm text-gray-600">
                    Free shipping over $99 | 30-day returns
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b">
                  <span className="font-medium text-gray-700">{spec.label}</span>
                  <span className="text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <Card className="p-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

ProductDetail.displayName = 'ProductDetail';
