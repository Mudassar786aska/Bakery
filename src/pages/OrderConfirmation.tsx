import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Home } from 'lucide-react';
import { generateInvoicePDF } from '../utils/invoiceGenerator';
import { startOrderStatusSimulation } from '../utils/orderStatusUpdater';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  useEffect(() => {
    if (order) {
      // Start the order status simulation
      startOrderStatusSimulation(order.id, (status) => {
        console.log(`Order ${order.id} status updated to: ${status}`);
      });
    }
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-3xl font-bold text-bakery-dark mb-4">Order not found</h1>
          <Link to="/" className="text-bakery-primary hover:underline">Return to home</Link>
        </div>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    generateInvoicePDF(order);
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-green-50 to-bakery-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="relative">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" />
            <div className="absolute inset-0 h-20 w-20 mx-auto rounded-full bg-green-100 animate-ping"></div>
          </div>
          <h1 className="font-playfair text-5xl font-bold text-bakery-dark mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your order. We'll start preparing it right away.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg inline-block">
            <p className="text-blue-800 font-medium">
              📱 You'll receive notifications about your order status updates
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Order Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Order ID:</strong> #{order.id}</p>
                <p><strong>Date:</strong> {order.createdAt.toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className="text-yellow-600 font-semibold">Pending</span></p>
                <p><strong>Payment:</strong> {order.bankDetails ? 'Bank Transfer' : 'Cash on Delivery'}</p>
              </div>
            </div>

            <div>
              <h3 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Shipping Address</h3>
              <div className="text-sm space-y-1">
                <p><strong>{order.shippingDetails.fullName}</strong></p>
                <p>{order.shippingDetails.address}</p>
                <p>{order.shippingDetails.city}</p>
                <p>Phone: {order.shippingDetails.phone}</p>
                <p>Email: {order.shippingDetails.email}</p>
              </div>
            </div>
          </div>

          {order.bankDetails && (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-2">Bank Transfer Information</h3>
              <div className="text-sm space-y-1">
                <p><strong>Account Holder:</strong> {order.bankDetails.accountHolder}</p>
                <p><strong>Account Number:</strong> {order.bankDetails.accountNumber}</p>
                <p><strong>Bank:</strong> {order.bankDetails.bankName}</p>
                <p><strong>Branch Code:</strong> {order.bankDetails.branchCode}</p>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded border">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Please transfer the amount to our account and keep the receipt for your records.
                  Your order will be processed once payment is confirmed.
                </p>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Order Summary</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">PKR {(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal:</span>
                <span>PKR {(order.total - 150).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Delivery Fee:</span>
                <span>PKR 150</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-bakery-dark">
                <span>Total:</span>
                <span>PKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center justify-center bg-bakery-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-bakery-accent transition-colors transform hover:scale-105"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Invoice (PDF)
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center border border-bakery-primary text-bakery-primary px-8 py-4 rounded-lg font-semibold hover:bg-bakery-primary hover:text-white transition-colors transform hover:scale-105"
          >
            <Home className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;