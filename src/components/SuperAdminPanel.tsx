import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Gift, LogOut, User, Search, Filter, Plus, Edit, Eye, CreditCard, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockTransactions } from '../data/mockData';
import Button from './Button';

const SuperAdminPanel: React.FC = () => {
  const { user, logout, addAmountToUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'admins' | 'users' | 'transactions' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showAddAmountModal, setShowAddAmountModal] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [selectedUserForAmount, setSelectedUserForAmount] = useState<any>(null);

  if (!user || user.role !== 'superadmin') return null;

  // Mock admin data
  const admins = [
    {
      id: 'admin1',
      name: 'Admin User 1',
      email: 'admin1@betmaster.com',
      mobile: '9876543210',
      totalUsers: 25,
      totalRevenue: 50000,
      createdAt: '2024-01-01T00:00:00Z',
      status: 'active',
      coins: 1000
    },
    {
      id: 'admin2',
      name: 'Admin User 2',
      email: 'admin2@betmaster.com',
      mobile: '9876543211',
      totalUsers: 18,
      totalRevenue: 35000,
      createdAt: '2024-01-15T00:00:00Z',
      status: 'active',
      coins: 750
    }
  ];

  const totalAdmins = admins.length;
  const totalUsers = mockUsers.filter(u => u.role === 'user').length;
  const totalRevenue = mockUsers.reduce((sum, u) => sum + u.totalSpent, 0);
  const totalCoinsDistributed = mockUsers.reduce((sum, u) => sum + u.coins, 0);

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.mobile.includes(searchTerm)
  );

  const handleAddAmount = () => {
    if (selectedUserForAmount && amountToAdd) {
      const amount = parseFloat(amountToAdd);
      addAmountToUser(selectedUserForAmount.id, amount);
      console.log(`Added ₹${amount} to ${selectedUserForAmount.name}`);
      setShowAddAmountModal(false);
      setAmountToAdd('');
      setSelectedUserForAmount(null);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'admins', label: 'Admins', icon: Shield },
    { id: 'users', label: 'All Users', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Super Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Super Administrator</div>
                <div className="font-semibold text-white">{user.name}</div>
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Admins</p>
                        <p className="text-3xl font-bold text-white">{totalAdmins}</p>
                      </div>
                      <Shield className="w-10 h-10 text-red-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Users</p>
                        <p className="text-3xl font-bold text-white">{totalUsers}</p>
                      </div>
                      <Users className="w-10 h-10 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">₹{totalRevenue}</p>
                      </div>
                      <DollarSign className="w-10 h-10 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">Coins Distributed</p>
                        <p className="text-3xl font-bold text-white">{totalCoinsDistributed}</p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-yellow-400" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Admin Performance</h3>
                  <div className="space-y-4">
                    {admins.map((admin) => (
                      <div key={admin.id} className="flex items-center space-x-4 py-3 border-b border-white/10 last:border-b-0">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-2">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{admin.name}</p>
                          <p className="text-sm text-gray-300">{admin.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{admin.totalUsers} users</p>
                          <p className="text-xs text-gray-300">₹{admin.totalRevenue} revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admins' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Admin Management</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search admins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {filteredAdmins.map((admin) => (
                      <div key={admin.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-3">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{admin.name}</h4>
                              <p className="text-gray-300 text-sm">{admin.email}</p>
                              <p className="text-gray-300 text-sm">Mobile: {admin.mobile}</p>
                              <p className="text-yellow-400 text-sm">Coins: {admin.coins}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-white font-medium">{admin.totalUsers} Users</p>
                              <p className="text-green-400 font-medium">₹{admin.totalRevenue}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button
                                onClick={() => setSelectedAdmin(admin)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Users
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectedUserForAmount(admin);
                                  setShowAddAmountModal(true);
                                }}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Amount
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin's Users Modal */}
                {selectedAdmin && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {selectedAdmin.name}'s Users
                      </h3>
                      <Button
                        onClick={() => setSelectedAdmin(null)}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Close
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {mockUsers.filter(u => u.role === 'user').slice(0, 5).map((user) => (
                        <div key={user.id} className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-300">{user.email}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-white">{user.coins} coins</p>
                              <p className="text-gray-300 text-sm">₹{user.totalSpent} spent</p>
                            </div>
                            <Button
                              onClick={() => {
                                setSelectedUserForAmount(user);
                                setShowAddAmountModal(true);
                              }}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Amount
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">All Users</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 font-medium text-gray-300">User</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Coins</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Stock</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Joined</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.filter(u => u.role === 'user').map((user) => (
                          <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-sm text-gray-300">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-white">{user.coins}</td>
                            <td className="py-4 px-4 text-white">₹{user.totalSpent}</td>
                            <td className="py-4 px-4 text-gray-300">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                onClick={() => {
                                  setSelectedUserForAmount(user);
                                  setShowAddAmountModal(true);
                                }}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Amount
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">All Transactions</h3>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => {
                      const user = mockUsers.find(u => u.id === transaction.userId);
                      return (
                        <div key={transaction.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-white">
                                {user?.name || 'Unknown User'}
                              </p>
                              <p className="text-gray-300 text-sm">
                                {transaction.type === 'purchase' ? 'Coin Purchase' : 'Coupon Generation'} • 
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white">₹{transaction.amount}</p>
                              <p className="text-sm text-green-400">+{transaction.coins} coins</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Platform Growth</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Admins</span>
                        <span className="text-white font-semibold">{totalAdmins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Users</span>
                        <span className="text-white font-semibold">{totalUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Growth Rate</span>
                        <span className="text-green-400 font-semibold">+25%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Revenue</span>
                        <span className="text-white font-semibold">₹{totalRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Average per User</span>
                        <span className="text-white font-semibold">₹{totalUsers > 0 ? (totalRevenue / totalUsers).toFixed(2) : '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Revenue Growth</span>
                        <span className="text-green-400 font-semibold">+18%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Admin Performance Comparison</h3>
                  <div className="space-y-4">
                    {admins.map((admin) => (
                      <div key={admin.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{admin.name}</span>
                          <span className="text-green-400 font-bold">₹{admin.totalRevenue}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${(admin.totalRevenue / Math.max(...admins.map(a => a.totalRevenue))) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-300 mt-1">
                          {admin.totalUsers} users managed
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Amount Modal */}
      {showAddAmountModal && selectedUserForAmount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add Amount</h2>
              <button
                onClick={() => setShowAddAmountModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 mb-2">Adding amount to:</p>
              <p className="text-white font-semibold">{selectedUserForAmount.name}</p>
              <p className="text-gray-400 text-sm">{selectedUserForAmount.email}</p>
              <p className="text-yellow-400 text-sm">Current Coins: {selectedUserForAmount.coins}</p>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Amount (Coins)
              </label>
              <input
                type="number"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowAddAmountModal(false)}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAmount}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!amountToAdd || parseFloat(amountToAdd) <= 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Amount
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPanel;