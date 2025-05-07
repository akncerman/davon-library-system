'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';

// INTERFACE
interface EditUserFormData {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// EDIT USER PAGE COMPONENT
export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { users, currentUser, updateUser } = useUser();
  
  const [formData, setFormData] = useState<EditUserFormData>({
    name: '',
    email: '',
    role: 'user'
  });
  
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const   user = users.find(u => u.id === params.id);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      setError('Kullanıcı bulunamadı');
    }
  }, [currentUser, users, params.id, router]);

  // FORM CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FORM SUBMISSION
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      updateUser(params.id, formData);
      router.push('/dashboard/users');
    } catch (err) {
      setError('Kullanıcı güncellenirken bir hata oluştu');
    }
  };

  // IF USER IS NOT ADMIN, REDIRECT TO DASHBOARD
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  if (error) {
    return (
      <main className="bg-gradient min-h-screen">
        <header>
          <nav className="navbar">
            <div className="logo">
              <FaBookOpen size={28} color="#007AFF" />
              <h1>Davon Kütüphane</h1>
            </div>
            <div className="auth-buttons">
              <Link href="/dashboard/users" className="login-button">
                Kullanıcı Listesi
              </Link>
            </div>
          </nav>
        </header>
        <div className="user-list-wrapper">
          <div className="form-container" style={{ maxWidth: '420px', margin: '120px auto 0 auto' }}>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient min-h-screen">
      <header>
        <nav className="navbar">
          <div className="logo">
            <FaBookOpen size={28} color="#007AFF" />
            <h1>Davon Kütüphane</h1>
          </div>
          <div className="auth-buttons">
            <Link href="/dashboard/users" className="login-button">
              Kullanıcı Listesi
            </Link>
          </div>
        </nav>
      </header>
      <div className="user-list-wrapper flex-center-form">
        <div className="form-container">
          <h2 className="form-title" style={{ fontSize: '2rem', marginBottom: '28px', textAlign: 'center' }}>Kullanıcı Düzenle</h2>
          <form onSubmit={handleSubmit} className="edit-user-form-aligned">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ maxWidth: '320px', marginBottom:"10px" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                style={{ maxWidth: '320px', marginBottom:"10px" }}
              />
            </div>
            <div className="mb-6 flex items-center gap-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Rol:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
                style={{ maxWidth: '100px', padding: '0.25rem 0.5rem', marginBottom:"20px", marginTop:"10px", marginLeft:"10px" }}
              >
                <option value="user">Kullanıcı</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>
            <div className="flex flex-row items-center justify-end gap-8 mt-6">
              <button
                type="button"
                onClick={() => router.push('/dashboard/users')}
                className="btn btn-secondary"
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', minWidth: '90px', padding: '0.45rem 1rem', marginLeft: '65px', marginRight: '10px' }}
              >
                İptal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: '#007AFF', color: 'white', border: 'none', minWidth: '90px', padding: '0.45rem 1rem', marginLeft: '10px' }}
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 