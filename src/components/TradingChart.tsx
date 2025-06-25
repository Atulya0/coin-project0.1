import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceData {
  price: number;
  timestamp: number;
}

const TradingChart: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(45.67);
  const [priceChange, setPriceChange] = useState(2.45);
  const [isPositive, setIsPositive] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic price data based on time period
  const generatePriceData = (period: string) => {
    const now = Date.now();
    let dataPoints = 50;
    let timeInterval = 60000; // 1 minute
    
    switch (period) {
      case '1H':
        dataPoints = 60;
        timeInterval = 60000; // 1 minute
        break;
      case '1D':
        dataPoints = 24;
        timeInterval = 3600000; // 1 hour
        break;
      case '1W':
        dataPoints = 7;
        timeInterval = 86400000; // 1 day
        break;
      case '1M':
        dataPoints = 30;
        timeInterval = 86400000; // 1 day
        break;
      case '1Y':
        dataPoints = 12;
        timeInterval = 2592000000; // 1 month
        break;
    }

    const data: PriceData[] = [];
    let basePrice = 45.67;
    
    for (let i = dataPoints - 1; i >= 0; i--) {
      const timestamp = now - (i * timeInterval);
      const volatility = period === '1H' ? 0.5 : period === '1D' ? 1 : period === '1W' ? 2 : period === '1M' ? 3 : 5;
      basePrice += (Math.random() - 0.5) * volatility;
      basePrice = Math.max(35, Math.min(55, basePrice));
      
      data.push({
        price: basePrice,
        timestamp
      });
    }
    
    return data;
  };

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    const data = generatePriceData(selectedPeriod);
    setPriceData(data);
    setCurrentPrice(data[data.length - 1].price);
    
    // Calculate price change
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;
    setPriceChange(Math.abs(changePercent));
    setIsPositive(changePercent >= 0);
    
    setIsLoading(false);
  }, [selectedPeriod]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => {
        if (prev.length === 0) return prev;
        
        const lastPrice = prev[prev.length - 1].price;
        const change = (Math.random() - 0.5) * 0.8;
        const newPrice = Math.max(35, Math.min(55, lastPrice + change));
        
        setCurrentPrice(newPrice);
        
        // Calculate price change from first price
        const changePercent = ((newPrice - prev[0].price) / prev[0].price) * 100;
        setPriceChange(Math.abs(changePercent));
        setIsPositive(changePercent >= 0);
        
        // Update the last data point for real-time effect
        const newData = [...prev];
        newData[newData.length - 1] = {
          price: newPrice,
          timestamp: Date.now()
        };
        
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Create SVG path from price data
  const createPath = (data: PriceData[]) => {
    if (data.length < 2) return '';
    
    const width = 600;
    const height = 120;
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((item.price - minPrice) / priceRange) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const createGradientPath = (data: PriceData[]) => {
    if (data.length < 2) return '';
    
    const path = createPath(data);
    const width = 600;
    const height = 120;
    
    return `${path} L ${width},${height} L 0,${height} Z`;
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="w-full">
      {/* Price Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-2xl font-bold text-white">
              ₹{currentPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">COIN/INR</div>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-bold">
              {isPositive ? '+' : '-'}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        {/* Time Period Buttons */}
        <div className="flex space-x-1">
          {['1H', '1D', '1W', '1M', '1Y'].map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                period === selectedPeriod 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart - Reduced Height */}
      <div className="relative h-32 bg-black/20 rounded-lg overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 120"
          className="absolute inset-0"
        >
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="60" height="24" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart Area Fill */}
          {priceData.length > 1 && (
            <path
              d={createGradientPath(priceData)}
              fill="url(#chartGradient)"
            />
          )}
          
          {/* Chart Line */}
          {priceData.length > 1 && (
            <path
              d={createPath(priceData)}
              fill="none"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth="2"
              className="drop-shadow-lg"
            />
          )}
          
          {/* Animated Dot at Current Price */}
          {priceData.length > 0 && (
            <circle
              cx="600"
              cy={120 - ((priceData[priceData.length - 1].price - Math.min(...priceData.map(d => d.price))) / 
                (Math.max(...priceData.map(d => d.price)) - Math.min(...priceData.map(d => d.price)) || 1)) * 120}
              r="3"
              fill={isPositive ? "#10B981" : "#EF4444"}
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading chart data...</div>
          </div>
        )}
      </div>

      {/* Chart Stats - Compact */}
      <div className="grid grid-cols-4 gap-4 mt-3 text-center">
        <div>
          <div className="text-xs text-gray-400">24h High</div>
          <div className="text-sm font-bold text-white">
            ₹{priceData.length > 0 ? Math.max(...priceData.map(d => d.price)).toFixed(2) : '0.00'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400">24h Low</div>
          <div className="text-sm font-bold text-white">
            ₹{priceData.length > 0 ? Math.min(...priceData.map(d => d.price)).toFixed(2) : '0.00'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Volume</div>
          <div className="text-sm font-bold text-white">₹2.4M</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Market Cap</div>
          <div className="text-sm font-bold text-white">₹45.2M</div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;