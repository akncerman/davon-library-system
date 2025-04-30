'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

// Kullanıcı düzenleme formu için veri yapısı
interface EditUserFormData {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Kullanıcı düzenleme sayfası bileşeni
export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { users, currentUser, updateUser } = useUser();
  
  // Form state'i
  const [formData, setFormData] = useState<EditUserFormData>({
    name: '',
    email: '',
    role: 'user'
  });
  
  // Hata mesajı state'i
  const [error, setError] = useState<string | null>(null);

  // Sayfa yüklendiğinde kullanıcı bilgilerini getir
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const user = users.find(u => u.id === params.id);
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

  // Form değişikliklerini işle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form gönderimini işle
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

  // Admin değilse veya hata varsa
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık */}
      <h1 className="text-2xl font-bold mb-6">Kullanıcı Düzenle</h1>

      {/* Düzenleme Formu */}
      <form onSubmit={handleSubmit} className="max-w-lg bg-white rounded-lg shadow-md p-6">
        {/* Kullanıcı Adı Alanı */}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* E-posta Alanı */}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Rol Seçimi */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="user">Kullanıcı</option>
            <option value="admin">Yönetici</option>
          </select>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end space-x-4">
          {/* İptal Butonu */}
          <button
            type="button"
            onClick={() => router.push('/dashboard/users')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          {/* Kaydet Butonu */}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
} 