export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'superadmin';
  coins: number;
  coupons: Coupon[];
  createdAt: string;
  totalSpent: number;
  mobile?: string;
}

export interface Coupon {
  id: string;
  code: string;
  value: number;
  isUsed: boolean;
  createdAt: string;
  usedAt?: string;
  expiresAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'coupon_generation';
  amount: number;
  coins: number;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus: number;
  popular?: boolean;
}