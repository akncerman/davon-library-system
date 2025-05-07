'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileFormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { currentUser, logout, updateUser, verifyPassword } = useUser();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // IF USER IS NOT LOGGED IN, REDIRECT TO LOGIN PAGE
  useEffect(() => {
    if (!currentUser) router.replace('/auth/login');
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email
      }));
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('İsim alanı boş bırakılamaz');
      return false;
    }
    if (!formData.email.trim()) {
      setError('E-posta alanı boş bırakılamaz');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Geçerli bir e-posta adresi giriniz');
      return false;
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalıdır');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      // Eğer şifre değiştirilecekse, mevcut şifreyi kontrol et
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          setError('Şifre değiştirmek için mevcut şifrenizi girmelisiniz');
          return;
        }

        if (!verifyPassword(currentUser!.id, formData.currentPassword)) {
          setError('Mevcut şifre yanlış');
          return;
        }
      }

      const updatedData: any = {
        name: formData.name,
        email: formData.email
      };

      if (formData.newPassword) {
        updatedData.password = formData.newPassword;
      }

      updateUser(currentUser!.id, updatedData);
      setIsEditing(false);
      toast.success('Profil bilgileriniz başarıyla güncellendi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu');
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Kullanıcı Bilgileri</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-primary"
            style={{ 
              backgroundColor: isEditing ? '#dc2626' : '#007AFF', 
              color: 'white', 
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'İptal' : 'Düzenle'}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{marginBottom: '16px', textAlign: 'center'}}>{error}</div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <FaUser color="#666" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ paddingLeft: '40px', maxWidth: '320px', width: '100%' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <FaEnvelope color="#666" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ paddingLeft: '40px', maxWidth: '320px', width: '100%' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Mevcut Şifre
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <FaLock color="#666" />
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '40px', paddingRight: '40px', maxWidth: '320px', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showCurrentPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Yeni Şifre
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <FaLock color="#666" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '40px', paddingRight: '40px', maxWidth: '320px', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showNewPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Yeni Şifre Tekrarı
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <FaLock color="#666" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '40px', paddingRight: '40px', maxWidth: '320px', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ 
                  backgroundColor: '#007AFF', 
                  color: 'white', 
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                Kaydet
              </button>
            </div>
          </form>
        ) : (
          <>
            <p><strong>Ad:</strong> {currentUser.name}</p>
            <p><strong>E-posta:</strong> {currentUser.email}</p>
            <p><strong>Rol:</strong> {currentUser.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</p>
          </>
        )}
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