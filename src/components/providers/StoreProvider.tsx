/**
 * Redux Store Provider for Next.js 15
 * Provides Redux store and Redux Persist functionality to the application
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStoreAndPersistor, AppStore, AppPersistor } from '@/lib/store';
import { checkAuthStatus } from '@/lib/features/auth/authSlice';

interface StoreProviderProps {
  children: React.ReactNode;
}

// Loading component for PersistGate
const PersistLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm">Đang khởi tạo ứng dụng...</p>
    </div>
  </div>
);

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<AppPersistor | null>(null);

  if (!storeRef.current || !persistorRef.current) {
    // Create the store and persistor instance the first time this renders
    const { store, persistor } = createStoreAndPersistor();
    storeRef.current = store;
    persistorRef.current = persistor;
  }

  // Initialize auth status check after store is created
  useEffect(() => {
    if (storeRef.current) {
      // Check authentication status on app initialization
      storeRef.current.dispatch(checkAuthStatus());
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <PersistGate 
        loading={<PersistLoading />} 
        persistor={persistorRef.current}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
