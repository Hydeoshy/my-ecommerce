import React from 'react';

interface Signal {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TrustSignalsProps {
  signals?: Signal[];
  className?: string;
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({
  signals,
  className,
}) => {
  const defaultSignals: Signal[] = [
    {
      id: '1',
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping over $99',
    },
    {
      id: '2',
      icon: '↩️',
      title: 'Money Back',
      description: '30 days money back guarantee',
    },
    {
      id: '3',
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      id: '4',
      icon: '📞',
      title: '24/7 Support',
      description: 'Dedicated customer support',
    },
  ];

  const displaySignals = signals || defaultSignals;

  return (
    <section className={`w-full ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displaySignals.map((signal) => (
            <div key={signal.id} className="flex flex-col items-center text-center">
              <div className="text-4xl mb-3">{signal.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                {signal.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TrustSignals.displayName = 'TrustSignals';
