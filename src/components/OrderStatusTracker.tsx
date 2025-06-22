import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderStatusTrackerProps {
  status: 'pending' | 'dispatched' | 'delivered';
  createdAt: Date;
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status, createdAt }) => {
  const getStatusInfo = (currentStatus: string) => {
    const statuses = [
      { key: 'pending', label: 'Order Placed', icon: Clock, color: 'text-yellow-600' },
      { key: 'dispatched', label: 'Dispatched', icon: Truck, color: 'text-blue-600' },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-600' }
    ];

    return statuses.map((s, index) => {
      const isActive = statuses.findIndex(st => st.key === currentStatus) >= index;
      const isCurrent = s.key === currentStatus;
      
      return {
        ...s,
        isActive,
        isCurrent
      };
    });
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="flex items-center space-x-4">
      {statusInfo.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.key} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step.isActive 
                ? `bg-${step.color.split('-')[1]}-100 border-${step.color.split('-')[1]}-500 ${step.color}` 
                : 'bg-gray-100 border-gray-300 text-gray-400'
            } ${step.isCurrent ? 'ring-2 ring-offset-2 ring-bakery-primary' : ''}`}>
              <Icon className="h-4 w-4" />
            </div>
            {index < statusInfo.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                statusInfo[index + 1].isActive ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTracker;