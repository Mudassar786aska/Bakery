import React from 'react';
import { X, Download, Calendar, MapPin, CreditCard, Package } from 'lucide-react';
import { Order } from '../types';
import { generateInvoicePDF } from '../utils/invoiceGenerator';
import OrderStatusTracker from './OrderStatusTracker';

interface OrderInvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadInvoice = () => {
    generateInvoicePDF(order);
  };

  const subtotal = order.total - 150; // Subtract delivery fee

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-bakery-dark">Order Invoice</h2>
            <p className="text-gray-600">Order #{order.id}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center space-x-2 bg-bakery-primary text-white px-4 py-2 rounded-lg hover:bg-bakery-accent transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Order Status */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-bakery-dark mb-3">Order Status</h3>
            <OrderStatusTracker status={order.status as any} createdAt={order.createdAt} />
            <p className="text-sm text-gray-600 mt-2">
              Current Status: <span className="font-medium capitalize">{order.status}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Order Details */}
            <div>
              <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Order Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">#{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{order.bankDetails ? 'Bank Transfer' : 'Cash on Delivery'}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div>
              <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingDetails.fullName}</p>
                <p className="text-gray-600">{order.shippingDetails.address}</p>
                <p className="text-gray-600">{order.shippingDetails.city}</p>
                <p className="text-gray-600">Phone: {order.shippingDetails.phone}</p>
                <p className="text-gray-600">Email: {order.shippingDetails.email}</p>
              </div>
            </div>
          </div>

          {/* Bank Details (if applicable) */}
          {order.bankDetails && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Bank Transfer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Account Holder:</span>
                  <p className="font-medium">{order.bankDetails.accountHolder}</p>
                </div>
                <div>
                  <span className="text-gray-600">Account Number:</span>
                  <p className="font-medium">{order.bankDetails.accountNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">Bank Name:</span>
                  <p className="font-medium">{order.bankDetails.bankName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Branch Code:</span>
                  <p className="font-medium">{order.bankDetails.branchCode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order Items
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {order.items.map((item, index) => (
                <div key={item.product.id} className={`px-4 py-4 grid grid-cols-12 gap-4 text-sm ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}>
                  <div className="col-span-6 flex items-center space-x-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-bakery-dark">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">{item.product.category}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-medium">{item.quantity}</div>
                  <div className="col-span-2 text-center">PKR {item.product.price.toLocaleString()}</div>
                  <div className="col-span-2 text-right font-medium">
                    PKR {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-playfair text-lg font-bold text-bakery-dark mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee:</span>
                <span>PKR 150</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold text-bakery-dark">
                  <span>Total Amount:</span>
                  <span>PKR {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoiceModal;