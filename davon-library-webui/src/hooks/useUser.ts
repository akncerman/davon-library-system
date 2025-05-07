import { useContext } from 'react';
import { UserContext } from '@/lib/context/UserContext';

// CUSTOM HOOK FOR USER MANAGEMENT

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 