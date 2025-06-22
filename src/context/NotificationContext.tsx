import React, { createContext, useContext } from 'react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationContextType {
  notifications: any[];
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notificationHook = useNotifications();

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
    </NotificationContext.Provider>
  );
};