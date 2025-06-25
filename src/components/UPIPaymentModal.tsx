import React, { useState } from 'react';
import { X, CreditCard, Smartphone, QrCode, Copy, Check } from 'lucide-react';
import Button from './Button';

interface UPIPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  coinPackage: {
    id: string;
    name: string;
    coins: number;
    price: number;
  };
  quantity: number;
  onPaymentSuccess: () => void;
}

const UPIPaymentModal: React.FC<UPIPaymentModalProps> = ({
  isOpen,
  onClose,
  coinPackage,
  quantity,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'gpay' | 'phonepe' | 'paytm' | 'upi'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = coinPackage.price * quantity;
  const totalCoins = coinPackage.coins * quantity;
  const upiLink = `upi://pay?pa=betmaster@paytm&pn=BetMaster&am=${totalAmount}&cu=INR&tn=Coin Purchase - ${coinPackage.name} x${quantity}`;

  const paymentMethods = [
    { id: 'gpay', name: 'Google Pay', icon: '🟢', color: 'bg-green-600' },
    { id: 'phonepe', name: 'PhonePe', icon: '🟣', color: 'bg-purple-600' },
    { id: 'paytm', name: 'Paytm', icon: '🔵', color: 'bg-blue-600' },
    { id: 'upi', name: 'Other UPI', icon: '💳', color: 'bg-gray-600' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onPaymentSuccess();
    onClose();
  };

  const copyUPILink = () => {
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
   <div
  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  onClick={onClose} // 🔁 Close modal on backdrop click
>
<div className="bg-gray-900 rounded-xl p-4 sm:p-5 w-full max-w-sm sm:max-w-md border border-gray-700 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3 h-4" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>{coinPackage.name} x {quantity}</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Total Coins</span>
              <span className="text-yellow-400 font-bold">{totalCoins}</span>
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Choose Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className="text-white text-sm font-medium">{method.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* UPI ID Input for Other UPI */}
        {selectedMethod === 'upi' && (
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Enter UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* UPI Link */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm">UPI Payment Link</span>
              </div>
              <button
                onClick={copyUPILink}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400 break-all">
              {upiLink}
            </div>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            loading={isProcessing}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {isProcessing ? 'Processing Payment...' : `Pay ₹${totalAmount}`}
          </Button>
          
          <button
            onClick={() => window.open(upiLink, '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Open in UPI App
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          🔒 Your payment is secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
};

export default UPIPaymentModal;