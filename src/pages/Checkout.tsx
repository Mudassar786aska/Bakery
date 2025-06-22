import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building, User, MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotificationContext } from '../context/NotificationContext';
import { ShippingDetails, BankDetails } from '../types';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod'>('bank');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: user?.name || '',
    address: '',
    city: '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolder: '',
    accountNumber: '',
    bankName: '',
    branchCode: ''
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = {
      id: Date.now().toString(),
      user: user!,
      items,
      total,
      shippingDetails,
      bankDetails: paymentMethod === 'bank' ? bankDetails : undefined,
      status: 'pending',
      createdAt: new Date()
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Add order placed notification
    addNotification({
      type: 'order-placed',
      title: 'Order Placed Successfully!',
      message: `Your order #${order.id} has been placed and is being processed.`
    });
    
    clearCart();
    navigate('/order-confirmation', { state: { order } });
  };

  const deliveryFee = 150;
  const finalTotal = total + deliveryFee;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-3xl font-bold text-bakery-dark mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleShippingChange}
                    required
                    placeholder="House/Flat No, Street, Area"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'bank')}
                    className="mr-3"
                  />
                  <label htmlFor="bank" className="flex items-center text-gray-700">
                    <Building className="h-5 w-5 mr-2" />
                    Bank Transfer
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                    className="mr-3"
                  />
                  <label htmlFor="cod" className="flex items-center text-gray-700">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Cash on Delivery
                  </label>
                </div>
              </div>
              
              {paymentMethod === 'bank' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-bakery-dark mb-4">Bank Transfer Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        name="accountHolder"
                        value={bankDetails.accountHolder}
                        onChange={handleBankChange}
                        required={paymentMethod === 'bank'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleBankChange}
                        required={paymentMethod === 'bank'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                      <select
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={handleBankChange}
                        required={paymentMethod === 'bank'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                      >
                        <option value="">Select Bank</option>
                        <option value="HBL">Habib Bank Limited (HBL)</option>
                        <option value="UBL">United Bank Limited (UBL)</option>
                        <option value="NBP">National Bank of Pakistan (NBP)</option>
                        <option value="MCB">MCB Bank</option>
                        <option value="Allied">Allied Bank</option>
                        <option value="Meezan">Meezan Bank</option>
                        <option value="Standard Chartered">Standard Chartered</option>
                        <option value="Faysal">Faysal Bank</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Branch Code</label>
                      <input
                        type="text"
                        name="branchCode"
                        value={bankDetails.branchCode}
                        onChange={handleBankChange}
                        required={paymentMethod === 'bank'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      <strong>Our Bank Details:</strong><br />
                      Account Title: Mr Bakers<br />
                      Account Number: 1234567890<br />
                      Bank: HBL Main Branch<br />
                      Please transfer the amount and upload the receipt.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>PKR {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>PKR {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-bakery-dark border-t pt-2">
                  <span>Total:</span>
                  <span>PKR {finalTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-bakery-primary text-white py-3 rounded-md font-semibold hover:bg-bakery-accent transition-colors mt-6"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;