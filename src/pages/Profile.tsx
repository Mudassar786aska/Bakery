import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, CreditCard, Edit3, Save, X, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import OrderInvoiceModal from '../components/OrderInvoiceModal';
import NotificationSystem from '../components/NotificationSystem';
import OrderStatusTracker from '../components/OrderStatusTracker';
import { Order } from '../types';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { notifications, addNotification, removeNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Load orders and listen for status updates
  useEffect(() => {
    const loadOrders = () => {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]').filter(
        (order: any) => order.user.id === user?.id
      );
      setOrders(allOrders);
    };

    loadOrders();

    // Listen for order status updates
    const handleOrderStatusUpdate = (event: CustomEvent) => {
      const { orderId, newStatus } = event.detail;
      loadOrders(); // Reload orders
      
      // Show notification
      const statusMessages = {
        dispatched: 'Your order has been dispatched and is on its way!',
        delivered: 'Your order has been delivered successfully!'
      };
      
      if (statusMessages[newStatus as keyof typeof statusMessages]) {
        addNotification({
          type: 'success',
          title: 'Order Status Updated',
          message: statusMessages[newStatus as keyof typeof statusMessages]
        });
      }
    };

    window.addEventListener('orderStatusUpdated', handleOrderStatusUpdate as EventListener);
    
    return () => {
      window.removeEventListener('orderStatusUpdated', handleOrderStatusUpdate as EventListener);
    };
  }, [user?.id, addNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (updateProfile) {
      updateProfile(editForm);
      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile information has been updated successfully.'
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-bakery-light to-bakery-secondary">
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-bakery-dark mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-bakery-dark">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-bakery-primary text-white px-4 py-2 rounded-lg hover:bg-bakery-accent transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">{user?.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">{user?.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">{user?.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Member Since
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-primary focus:border-transparent"
                      placeholder="Enter your complete address"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800">
                      {user?.address || 'No address provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-playfair text-2xl font-bold text-bakery-dark mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                  <p className="text-gray-400">Start shopping to see your orders here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order: any) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-bakery-dark">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-bakery-primary">PKR {order.total.toLocaleString()}</p>
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="flex items-center space-x-1 text-bakery-primary hover:text-bakery-accent transition-colors mt-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">View Invoice</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Order Status Tracker */}
                      <div className="mb-4">
                        <OrderStatusTracker status={order.status} createdAt={new Date(order.createdAt)} />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div>
                          <p>{order.items.length} item(s) • {order.bankDetails ? 'Bank Transfer' : 'Cash on Delivery'}</p>
                          <p className="truncate max-w-md">{order.items.map((item: any) => item.product.name).join(', ')}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-6">Account Stats</h2>
              
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-bakery-primary to-bakery-accent rounded-xl text-white transform hover:scale-105 transition-transform">
                  <ShoppingBag className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-3xl font-bold">{totalOrders}</p>
                  <p className="text-sm opacity-90">Total Orders</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white transform hover:scale-105 transition-transform">
                  <CreditCard className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-3xl font-bold">PKR {totalSpent.toLocaleString()}</p>
                  <p className="text-sm opacity-90">Total Spent</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white transform hover:scale-105 transition-transform">
                  <User className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-3xl font-bold">
                    {totalSpent >= 10000 ? 'Platinum' : totalSpent >= 5000 ? 'Gold' : 'Silver'}
                  </p>
                  <p className="text-sm opacity-90">Member Status</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-bakery-primary text-white py-3 px-4 rounded-lg hover:bg-bakery-accent transition-colors flex items-center justify-center space-x-2 transform hover:scale-105">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Browse Products</span>
                </button>
                
                <button className="w-full border border-bakery-primary text-bakery-primary py-3 px-4 rounded-lg hover:bg-bakery-primary hover:text-white transition-colors flex items-center justify-center space-x-2 transform hover:scale-105">
                  <Mail className="h-4 w-4" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Invoice Modal */}
      {selectedOrder && (
        <OrderInvoiceModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Profile;