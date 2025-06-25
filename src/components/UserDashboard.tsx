import React, { useState } from 'react';
import { Coins, Gift, CreditCard, History, LogOut, User, Copy, Check, Users, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import UPIPaymentModal from './UPIPaymentModal';

const UserDashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'buy' | 'coupons' | 'history'>('dashboard');
  const [purchasing, setPurchasing] = useState(false);
  const [copiedCoupon] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCoinPackage, setSelectedCoinPackage] = useState<any>(null);

  // Coin packages from LandingPage
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
    console.log('Payment successful!');
  };

  if (!user) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'buy', label: 'Buy Coins', icon: CreditCard },
    { id: 'coupons', label: 'My Coupons', icon: Gift },
    { id: 'history', label: 'History', icon: History },
    { id: 'branch', label: 'Branch', icon: Users },
  ];

  function copyCouponCode(code: string): void {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">User Panel</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Welcome back,</div>
                <div className="font-semibold text-white">{user.name}</div>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-white">{user.coins}</span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Current Balance</p>
                        <p className="text-3xl font-bold text-white">{user.coins}</p>
                      </div>
                      <Coins className="w-10 h-10 text-yellow-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Active Coupons</p>
                        <p className="text-3xl font-bold text-white">
                          {user.coupons.filter(c => !c.isUsed).length}
                        </p>
                      </div>
                      <Gift className="w-10 h-10 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Stock</p>
                        <p className="text-3xl font-bold text-white">₹{user.totalSpent}</p>
                      </div>
                      <CreditCard className="w-10 h-10 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white">Account Created</p>
                          <p className="text-gray-300 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-green-400 font-semibold">+0 coins</div>
                      </div>
                    </div>
                    
                    {user.totalSpent > 0 && (
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-white">Coin Purchase</p>
                            <p className="text-gray-300 text-sm">Various packages</p>
                          </div>
                          <div className="text-green-400 font-semibold">₹{user.totalSpent}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'buy' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Choose Your Coin Package</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coinPackages.map((pkg, index) => {
                      const quantity = getQuantity(pkg.id);
                      const totalPrice = pkg.price * quantity;
                      const totalCoins = pkg.coins * quantity;
                      
                      return (
                        <div
                          key={pkg.id}
                          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300"
                        >
                          <div className="text-center">
                            {/* Fixed Size Coin Image Container */}
                            <div className="relative w-32 h-32 mx-auto mb-6">
                              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10">
                                <img
                                  src={pkg.image}
                                  alt={`${pkg.name} Coin`}
                                  className="w-full h-full object-cover"
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
                </div>
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">My Coupons</h3>
                  {user.coupons.length === 0 ? (
                    <div className="text-center py-8">
                      <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300">No coupons yet. Purchase coins to earn coupons!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {user.coupons.map((coupon) => (
                        <div
                          key={coupon.id}
                          className={`bg-white/10 backdrop-blur-lg rounded-lg p-4 border ${
                            coupon.isUsed 
                              ? 'border-gray-500 opacity-60' 
                              : 'border-green-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-lg font-bold text-white">
                                  {coupon.code}
                                </span>
                                <button
                                  onClick={() => copyCouponCode(coupon.code)}
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-gray-300 text-sm">
                                Value: ₹{coupon.value} • 
                                Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              coupon.isUsed 
                                ? 'bg-gray-600 text-gray-300' 
                                : 'bg-green-600 text-white'
                            }`}>
                              {coupon.isUsed ? 'Used' : 'Active'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white">Account Created</p>
                          <p className="text-gray-300 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-green-400 font-semibold">+0 coins</div>
                      </div>
                    </div>
                    
                    {user.totalSpent > 0 && (
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-white">Coin Purchase</p>
                            <p className="text-gray-300 text-sm">Various packages</p>
                          </div>
                          <div className="text-green-400 font-semibold">₹{user.totalSpent}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branch' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Branch Information</h3>
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">Branch features coming soon!</p>
                    <p className="text-sm text-gray-400">
                      Connect with other users and manage your network.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default UserDashboard;