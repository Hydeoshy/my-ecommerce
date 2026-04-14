import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: Date | string | number;
  onExpire?: () => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiresAt,
  onExpire,
  className,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expireTime = new Date(expiresAt).getTime();
      const difference = expireTime - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onExpire?.();
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const TimeUnit = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className="flex flex-col items-center">
      <div className="bg-yellow-400 text-gray-900 font-bold text-2xl px-3 py-2 rounded min-w-16 text-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-gray-600 mt-1 font-medium">{label}</span>
    </div>
  );

  return (
    <div className={`flex items-center justify-center gap-2 ${className || ''}`}>
      <TimeUnit value={timeRemaining.days} label="Days" />
      <span className="text-gray-400 font-bold">:</span>
      <TimeUnit value={timeRemaining.hours} label="Hours" />
      <span className="text-gray-400 font-bold">:</span>
      <TimeUnit value={timeRemaining.minutes} label="Minutes" />
      <span className="text-gray-400 font-bold">:</span>
      <TimeUnit value={timeRemaining.seconds} label="Seconds" />
    </div>
  );
};

CountdownTimer.displayName = 'CountdownTimer';
