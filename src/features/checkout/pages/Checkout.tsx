import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { Breadcrumb } from '@components/ui/Breadcrumb';

interface OrderData {
  [key: string]: string | number | boolean;
}

interface CheckoutProps {
  onOrderSubmit?: (orderData: OrderData) => void;
  onBackToCart?: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  onOrderSubmit,
  onBackToCart,
}) => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (
        !shippingData.firstName ||
        !shippingData.email ||
        !shippingData.address
      ) {
        alert('Please fill all required shipping fields');
        return;
      }
      setStep(2);
    }
  };

  const handleSubmitOrder = async () => {
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cvc) {
      alert('Please fill all payment fields');
      return;
    }

    setIsProcessing(true);

    // TODO: Send to backend for payment processing
    setTimeout(() => {
      onOrderSubmit?.({
        shipping: shippingData,
        payment: { ...paymentData, cardNumber: paymentData.cardNumber.slice(-4) },
        shippingMethod,
      });
      setIsProcessing(false);
    }, 2000);
  };

  const subtotal = 1049.98;
  const shipping = shippingMethod === 'express' ? 19.99 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout', current: true },
          ]}
          className="mb-8"
        />

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex gap-4 mb-8">
              <div
                className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition ${
                  step >= 1
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-300'
                }`}
                onClick={() => step > 1 && setStep(1)}
              >
                <div className="font-bold text-yellow-400">1</div>
                <div className="text-sm font-medium">Shipping</div>
              </div>
              <div
                className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition ${
                  step >= 2
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-300'
                }`}
              >
                <div className="font-bold text-yellow-400">2</div>
                <div className="text-sm font-medium">Payment</div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <Card className="p-6 space-y-6">
                <h2 className="text-xl font-bold">Shipping Address</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={shippingData.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>

                <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleShippingChange}
                  required
                />

                <Input
                  type="tel"
                  label="Phone"
                  name="phone"
                  value={shippingData.phone}
                  onChange={handleShippingChange}
                  required
                />

                <Input
                  label="Street Address"
                  name="address"
                  value={shippingData.address}
                  onChange={handleShippingChange}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={shippingData.state}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleShippingChange}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={shippingData.country}
                    onChange={handleShippingChange}
                  />
                </div>

                {/* Shipping Method */}
                <div className="pt-4 border-t">
                  <h3 className="font-bold mb-4">Shipping Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-600">5-7 business days - $9.99</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-gray-600">2-3 business days - $19.99</div>
                      </div>
                    </label>
                  </div>
                </div>

                <Button
                  size="lg"
                  fullWidth
                  onClick={handleNextStep}
                  className="font-bold"
                >
                  Continue to Payment
                </Button>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="p-6 space-y-6">
                <h2 className="text-xl font-bold">Payment Method</h2>

                <div className="space-y-4">
                  <Input
                    label="Cardholder Name"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                    required
                  />

                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="4532 1234 5678 9010"
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVC"
                      name="cvc"
                      value={paymentData.cvc}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    fullWidth
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    fullWidth
                    isLoading={isProcessing}
                    onClick={handleSubmitOrder}
                    className="font-bold"
                  >
                    Place Order
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-yellow-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                size="sm"
                fullWidth
                variant="outline"
                onClick={onBackToCart}
                className="mt-4"
              >
                Back to Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.displayName = 'Checkout';
