'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { FaTrash, FaEdit, FaBookOpen } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

// USER LIST COMPONENT
export default function UserList() {
  const router = useRouter();
  const { users, currentUser, deleteUser } = useUser();
  
  // DELETE USER
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // WHEN PAGE IS LOADED, CHECK IF USER IS ADMIN
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  // DELETE USER
  const handleDelete = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  // CONFIRM DELETE
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      toast.success('Kullanıcı başarıyla silindi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // CANCEL DELETE
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // REDIRECT TO EDIT PAGE
  const handleEdit = (userId: string) => {
    router.push(`/dashboard/users/edit/${userId}`);
  };

  return (
    <main className="bg-gradient min-h-screen" style={{ paddingTop: '96px' }}>
      <ToastContainer
        position="top-center"
        style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}
      />
      <header>
        <nav className="navbar">
          <div className="logo">
            <FaBookOpen size={28} color="#007AFF" />
            <h1>Davon Kütüphane</h1>
          </div>
          <div className="auth-buttons">
            <Link href="/dashboard" className="login-button">
              Panele Dön
            </Link>
          </div>
        </nav>
      </header>

      <div className="user-list-wrapper">
        <div className="user-table-layout">
          {/* Column Headers */} 
          {users.length > 0 && (
            <div className="user-list-header">
              <div className="header-item user-name-header">Ad Soyad</div>
              <div className="header-item user-email-header">E-posta</div>
              <div className="header-item user-role-header">Rol</div>
              <div className="header-item user-actions-header">İşlemler</div>
            </div>
          )}

          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Hiç kullanıcı bulunamadı.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-details-row">
                  <div className="user-name-in-row">{user.name}</div>
                  <div className="user-email-in-row">{user.email}</div>
                  <div className="user-role-in-row">{user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</div>
                </div>
                <div className="user-actions">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="icon-btn edit"
                    title="Düzenle"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="icon-btn delete"
                    title="Sil"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="form-container" style={{ maxWidth: '400px', marginLeft: '550px', marginBottom: '1000px' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Kullanıcıyı Sil</h3>
            <p className="text-sm text-gray-600 mb-4" style={{ marginBottom: '15px' }}>
              Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="btn btn-secondary"
                style={{ marginLeft: '65px', marginRight: '10px' }}
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-primary"
                style={{ backgroundColor: '#dc2626', marginLeft: '10px' }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 