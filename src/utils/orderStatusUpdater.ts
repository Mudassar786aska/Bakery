import { Order } from '../types';

export const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'dispatched' | 'delivered') => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderIndex = orders.findIndex((order: Order) => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    orders[orderIndex].updatedAt = new Date();
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Trigger custom event for real-time updates
    window.dispatchEvent(new CustomEvent('orderStatusUpdated', {
      detail: { orderId, newStatus }
    }));

    // Add notification to localStorage for navbar bell
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const statusMessages = {
      dispatched: 'Your order has been dispatched and is on its way!',
      delivered: 'Your order has been delivered successfully!'
    };

    if (statusMessages[newStatus as keyof typeof statusMessages]) {
      const notification = {
        id: Date.now().toString(),
        type: `order-${newStatus}`,
        title: 'Order Status Updated',
        message: statusMessages[newStatus as keyof typeof statusMessages]
      };
      
      notifications.unshift(notification);
      localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50)));
      
      // Trigger notification update event
      window.dispatchEvent(new CustomEvent('notificationAdded', {
        detail: notification
      }));
    }
  }
};

export const startOrderStatusSimulation = (orderId: string, onStatusUpdate?: (status: string) => void) => {
  // Update to dispatched after 5 minutes
  setTimeout(() => {
    updateOrderStatus(orderId, 'dispatched');
    onStatusUpdate?.('dispatched');
  }, 5 * 60 * 1000); // 5 minutes

  // Update to delivered after 10 minutes
  setTimeout(() => {
    updateOrderStatus(orderId, 'delivered');
    onStatusUpdate?.('delivered');
  }, 10 * 60 * 1000); // 10 minutes
};