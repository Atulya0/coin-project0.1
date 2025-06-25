import React, { useState } from 'react';
import { Coins, Gift, CreditCard, History, LogOut, User, Copy, Check, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { coinPackages } from '../data/mockData';
import Button from './Button';

const UserDashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'buy' | 'coupons' | 'history'>('dashboard');
  const [purchasing, setPurchasing] = useState(false);
  const [copiedCoupon] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setPurchasing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedPackage = coinPackages.find(p => p.id === packageId);
    if (selectedPackage && user) {
      const totalCoins = selectedPackage.coins + selectedPackage.bonus;
      const newCoupon = {
        id: Date.now().toString(),
        code: `COIN${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        value: Math.floor(selectedPackage.price * 0.1), // 10% of purchase as coupon value
        isUsed: false,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      };

      updateUser({
        coins: user.coins + totalCoins,
        totalSpent: user.totalSpent + selectedPackage.price,
        coupons: [...user.coupons, newCoupon]
      });
    }
    
    setPurchasing(false);
  };

  if (!user) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'buy', label: 'Buy Coins', icon: CreditCard },
    { id: 'coupons', label: 'My Coupons', icon: Gift },
    { id: 'history', label: 'History', icon: History },
    { id: 'branch', label: 'Branch', icon: Users }, // Added Branch tab
 ];

  // function generateFreeCoupon(): void {
  //   throw new Error('Function not implemented.');
  // }

  function copyCouponCode(code: string): void {
    throw new Error('Function not implemented.');
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

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab('buy')}
                      className="justify-center py-4"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Buy More Coins
                    </Button>
                    {/* <Button
                      onClick={generateFreeCoupon}
                      variant="outline"
                      disabled={user.coins < 100}
                      className="justify-center py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Generate Coupon (100 coins)
                    </Button> */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'buy' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Choose Your Coin Package</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {coinPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 hover:bg-white/20 hover:scale-105 ${
                          pkg.popular 
                            ? 'border-yellow-400 ring-2 ring-yellow-400/50' 
                            : 'border-white/20'
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                              Most Popular
                            </span>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
                          <div className="text-3xl font-bold text-white mb-2">₹{pkg.price}</div>
                          <div className="text-gray-300 mb-4">
                            {pkg.coins} coins
                            {pkg.bonus > 0 && (
                              <span className="text-green-400"> + {pkg.bonus} bonus</span>
                            )}
                          </div>
                          <Button
                            onClick={() => handlePurchase(pkg.id)}
                            loading={purchasing}
                            className="w-full"
                          >
                            Purchase Now
                          </Button>
                        </div>
                      </div>
                    ))}
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
                                  {copiedCoupon === coupon.code ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;