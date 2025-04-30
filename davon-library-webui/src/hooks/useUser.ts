import { useContext } from 'react';
import { UserContext } from '@/lib/context/UserContext';

/**
 * Kullanıcı yönetimi için özel hook
 * @returns {UserContextType} Kullanıcı context'ini döndürür
 * @throws {Error} Eğer hook UserProvider dışında kullanılırsa hata fırlatır
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 