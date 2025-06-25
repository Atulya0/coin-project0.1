import { User, Transaction, CoinPackage, Coupon } from '../types';

export const coinPackages: CoinPackage[] = [
  {
    id: '1',
    name: 'Starter Pack',
    coins: 100,
    price: 100,
    bonus: 0
  },
  {
    id: '2',
    name: 'Popular Pack',
    coins: 500,
    price: 500,
    bonus: 50,
    popular: true
  },
  {
    id: '3',
    name: 'Premium Pack',
    coins: 1000,
    price: 1000,
    bonus: 150
  },
  {
    id: '4',
    name: 'Ultimate Pack',
    coins: 2500,
    price: 2500,
    bonus: 500
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@coinplatform.com',
    name: 'Admin User',
    role: 'admin',
    coins: 10000,
    coupons: [],
    createdAt: '2024-01-01T00:00:00Z',
    totalSpent: 0
  },
  {
    id: '2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    coins: 250,
    coupons: [
      {
        id: 'c1',
        code: 'WELCOME10',
        value: 10,
        isUsed: false,
        createdAt: '2024-01-15T10:30:00Z',
        expiresAt: '2024-12-31T23:59:59Z'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    totalSpent: 500
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    coins: 750,
    coupons: [
      {
        id: 'c2',
        code: 'LOYALTY25',
        value: 25,
        isUsed: true,
        createdAt: '2024-01-20T14:15:00Z',
        usedAt: '2024-01-25T09:30:00Z',
        expiresAt: '2024-12-31T23:59:59Z'
      }
    ],
    createdAt: '2024-01-20T14:00:00Z',
    totalSpent: 1000
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '2',
    type: 'purchase',
    amount: 500,
    coins: 550,
    createdAt: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    userId: '3',
    type: 'purchase',
    amount: 1000,
    coins: 1150,
    createdAt: '2024-01-20T14:15:00Z',
    status: 'completed'
  }
];