'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function Dashboard() {
  const router = useRouter();
  const { currentUser, logout } = useUser();

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  React.useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login');
    }
  }, [currentUser, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!currentUser) {
    return null; // Yönlendirme yapılana kadar boş sayfa göster
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Hoş Geldiniz, {currentUser.name}!</h1>
        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ padding: '8px 16px' }}
        >
          Çıkış Yap
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Kullanıcı Bilgileri</h2>
        <p><strong>Ad:</strong> {currentUser.name}</p>
        <p><strong>E-posta:</strong> {currentUser.email}</p>
        <p><strong>Rol:</strong> {currentUser.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</p>
      </div>

      {currentUser.role === 'admin' && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px'
        }}>
          <h2>Yönetici Paneli</h2>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => router.push('/dashboard/users')}
              className="btn btn-primary"
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Kullanıcı Listesi
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 