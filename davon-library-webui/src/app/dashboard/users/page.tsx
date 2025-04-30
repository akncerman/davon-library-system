'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { FaTrash, FaEdit } from 'react-icons/fa';

// Kullanıcı listesi bileşeni
export default function UserList() {
  const router = useRouter();
  const { users, currentUser, deleteUser } = useUser();
  
  // Silme işlemi için state'ler
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sayfa yüklendiğinde admin kontrolü
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  // Kullanıcı silme işlemi
  const handleDelete = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  // Silme işlemini onaylama
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  // Silme işlemini iptal etme
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // Kullanıcı düzenleme sayfasına yönlendirme
  const handleEdit = (userId: string) => {
    router.push(`/dashboard/users/edit/${userId}`);
  };

  // Admin değilse dashboard'a yönlendir
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık */}
      <h1 className="text-2xl font-bold mb-6">Kullanıcı Yönetimi</h1>

      {/* Kullanıcı Tablosu */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Tablo Başlığı */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-posta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>

          {/* Tablo İçeriği */}
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Düzenleme Butonu */}
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  {/* Silme Butonu */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Silme Onay Modalı */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Kullanıcıyı Sil</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                {/* İptal Butonu */}
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 mr-2 hover:bg-gray-400"
                >
                  İptal
                </button>
                {/* Onay Butonu */}
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 