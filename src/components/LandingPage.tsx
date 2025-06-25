import React, { useState, useEffect } from 'react';
import { Coins, Shield, Gift, TrendingUp, Users, Star, Wallet, ArrowRight, Download, User, Menu, Triangle, ArrowLeft, MessageCircle, X, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import AuthForm from './AuthForm';
import Button from './Button';
import UPIPaymentModal from './UPIPaymentModal';

const LandingPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showAd, setShowAd] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCoinPackage, setSelectedCoinPackage] = useState<any>(null);

  const coinPackages = [
    {
      id: 'silver',
      name: 'Silver',
      coins: 100,
      price: 100,
      color: 'from-gray-400 to-gray-600',
      icon: '🥈',
      image: '/WhatsApp Image 2025-06-21 at 12.52.26 AM_resized.webp',
      metalColor: 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300',
      shadowColor: 'shadow-gray-400/50'
    },
    {
      id: 'gold18k',
      name: '18K Gold',
      coins: 500,
      price: 500,
      color: 'from-yellow-400 to-yellow-600',
      icon: '🥇',
      image: '/WhatsApp Image 2025-06-21 at 12.52.27 AM_resized.webp',
      metalColor: 'bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400',
      shadowColor: 'shadow-yellow-400/50'
    },
    {
      id: 'gold24k',
      name: '24K Gold',
      coins: 1000,
      price: 1000,
      color: 'from-yellow-500 to-orange-500',
      icon: '👑',
      image: '/WhatsApp Image 2025-06-21 at 12.52.27 AM_resized.webp',
      metalColor: 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400',
      shadowColor: 'shadow-orange-400/50'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      coins: 2500,
      price: 2500,
      color: 'from-blue-400 to-cyan-400',
      icon: '💎',
      image: '/diamond_resized.webp',
      metalColor: 'bg-gradient-to-br from-blue-100 via-white to-cyan-200',
      shadowColor: 'shadow-cyan-400/50'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      coins: 5000,
      price: 5000,
      color: 'from-purple-400 to-indigo-500',
      icon: '⭐',
      image: '/platinum_resized.webp',
      metalColor: 'bg-gradient-to-br from-purple-200 via-gray-100 to-indigo-300',
      shadowColor: 'shadow-purple-400/50'
    },
    {
      id: 'palladium',
      name: 'Palladium',
      coins: 10000,
      price: 10000,
      color: 'from-pink-500 to-rose-600',
      icon: '🚀',
      image: '/palladium image_resized.webp',
      metalColor: 'bg-gradient-to-br from-pink-200 via-rose-100 to-rose-300',
      shadowColor: 'shadow-rose-400/50'
    }
  ];

  const adImages = [
    '/WhatsApp Image 2025-06-17 at 13.20.38.jpeg',
     '/Game 1.jpg',
      '/Game 2.jpg',
       '/Game 3.jpg',
    // Add more ad images here if needed
  ];

  // Auto-slide ads every 5 seconds
  useEffect(() => {
    if (showAd && adImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % adImages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showAd, adImages.length]);

  const updateQuantity = (coinId: string, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[coinId] || 0;
      const newQty = Math.max(0, currentQty + change);
      return {
        ...prev,
        [coinId]: newQty
      };
    });
  };

  const getQuantity = (coinId: string) => quantities[coinId] || 1;

  const handleBuyCoin = (coinPackage: any) => {
    const quantity = getQuantity(coinPackage.id);
    if (quantity > 0) {
      setSelectedCoinPackage(coinPackage);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    // Handle successful payment
    console.log('Payment successful!');
    // You can add logic here to update user coins, etc.
  };

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % adImages.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + adImages.length) % adImages.length);
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-full animate-fade-in">
          <button
            onClick={() => setShowAuth(false)}
            className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors transform hover:scale-110"
          >
            ← Back to Home
          </button>
          <AuthForm 
            mode={authMode} 
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-20 bg-black/20 backdrop-blur-lg border-b border-gray-800 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-red-500 to-pink-600">
  <img 
    src="/WhatsApp Image 2025-06-18 at 00.51.14.jpeg" 
    alt="BetMaster Logo" 
    className="w-full h-full object-cover rounded-full"
  />
</div>

              <div>
                <h1 className="text-2xl font-bold text-white">BetMaster</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Replaced the ₹10 element with a Sign In button */}
              <button
                onClick={() => {
                  setAuthMode('login'); // Assuming 'login' is the mode for signing in
                  setShowAuth(true);
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-4 py-2 flex items-center space-x-2 text-white font-bold hover:from-green-600 hover:to-emerald-600 transition-colors"
              >
                <User className="w-5 h-5 text-white" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Trading Chart - Reduced Size */}
        {/* Coin Details Section (replacing Trading Chart) */}
        <section className="mb-8 animate-fade-in">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Coin Performance Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300 text-sm">
              <div>
                <p className="font-semibold text-white">1 Month</p>
                <p>Details Here</p> {/* Placeholder */}
              </div>
              <div>
                <p className="font-semibold text-white">6 Months</p>
                <p>Details Here</p> {/* Placeholder */}
              </div>
              <div>
                <p className="font-semibold text-white">1 Year</p>
                <p>Details Here</p> {/* Placeholder */}
              </div>
              <div>
                <p className="font-semibold text-white">2 Years</p>
                <p>Details Here</p> {/* Placeholder */}
              </div>
            </div>
          </div>
        </section>

        {/* Coin Packages Grid */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">Choose Your Coin Package</h2>
            <p className="text-gray-300 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Select the perfect package for your crypto journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coinPackages.map((pkg, index) => {
              const quantity = getQuantity(pkg.id);
              const totalPrice = pkg.price * quantity;
              const totalCoins = pkg.coins * quantity;
              
              return (
                <div
                  key={pkg.id}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    {/* Realistic Coin Image */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
<div className="relative w-[112px] h-[112px] mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10">
  <img
    src={pkg.image}
    alt={`${pkg.name} Coin`}
    className="absolute top-0 left-0 w-full h-full object-cover"
    style={{
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
    }}
  />
</div>


                      
                      {/* Coin Shadow */}
                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-6 ${pkg.shadowColor} rounded-full blur-md opacity-50`}></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {pkg.name}
                    </h3>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <button
                        onClick={() => updateQuantity(pkg.id, -1)}
                        disabled={quantity <= 0}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-5 h-5 text-white" />
                      </button>
                      <div className="bg-white/10 rounded-lg px-4 py-2 min-w-[3rem]">
                        <span className="text-white font-bold text-lg">{quantity}</span>
                      </div>
                      <button
                        onClick={() => updateQuantity(pkg.id, 1)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    <div className="text-2xl font-bold text-white mb-2">
                      {totalCoins.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300 mb-4">
                      coins
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-6">
                      ₹{totalPrice.toLocaleString()}
                    </div>
                    
                    {/* Buy Button */}
                    <Button
                      onClick={() => handleBuyCoin(pkg)}
                      disabled={quantity === 0}
                      className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center ${
                        quantity === 0 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {quantity === 0 ? 'Select Quantity' : 'Buy Now'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gaming Advertisement Slider - Reduced Size */}
        {showAd && (
          <section className="mb-12 animate-slide-up">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 max-w-4xl mx-auto">
              {/* Ad Label */}
              <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded z-20 font-bold">
                AD
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setShowAd(false)}
                className="absolute top-3 right-3 text-white/90 hover:text-white transition-colors z-20 bg-black/50 rounded-full p-2 transform hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Slider Container - Reduced Height */}
             <div className="relative h-72 md:h-96 w-full max-w-screen-lg mx-auto">
  <div 
    className="flex transition-transform duration-500 ease-in-out h-full w-full"
    style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
  >
    {adImages.map((image, index) => (
      <div key={index} className="w-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <img 
          src={image} 
          alt={`Advertisement ${index + 1}`} 
          className="w-full h-full object-contain"
        />
        {/* Click overlay */}
        <div 
          className="absolute inset-0 bg-transparent hover:bg-black/10 transition-all duration-300 cursor-pointer"
          onClick={() => {
            setAuthMode('register');
            setShowAuth(true);
          }}
        >
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-orange-500/0 hover:from-yellow-400/10 hover:to-orange-500/10 transition-all duration-300"></div>
        </div>
      </div>
    ))}
  </div>

  {/* Navigation arrows */}
  {adImages.length > 1 && (
    <>
      <button
        onClick={prevAd}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextAd}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  )}

  {/* Dots indicator */}
  {adImages.length > 1 && (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
      {adImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentAdIndex(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentAdIndex ? 'bg-white' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  )}
</div>

            </div>
          </section>
        )}

        {/* Telegram Section */}
        <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 animate-pulse">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">📱 Join Our Telegram Community</h3>
                  <p className="text-gray-300">
                    🔔 Get real-time updates • 📊 Market insights • 👥 Connect with 50K+ traders
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => window.open('https://telegram.org', '_blank')}
                size="lg"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300"
              >
                Join Now 🚀
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* UPI Payment Modal */}
      {showPaymentModal && selectedCoinPackage && (
        <UPIPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          coinPackage={selectedCoinPackage}
          quantity={getQuantity(selectedCoinPackage.id)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Floating particles for ambiance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;