'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useUser } from '@/hooks/useUser';

// Kayıt formu için veri yapısı
// Bu interface, form alanlarının veri tiplerini tanımlar
interface RegisterFormData {
  username: string;    // Kullanıcı adı
  email: string;       // E-posta adresi
  password: string;    // Şifre
  confirmPassword: string; // Şifre tekrarı
}

// Form alanlarının başlangıç değerleri
const initialValues: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// Form doğrulama kuralları
// Her alan için özel doğrulama fonksiyonları
const validationRules = {
  // Kullanıcı adı doğrulama
  username: (value: string) => {
    if (!value.trim()) return 'Kullanıcı adı gereklidir';
    if (value.length < 3) return 'Kullanıcı adı en az 3 karakter olmalıdır';
    return undefined;
  },
  // E-posta doğrulama
  email: (value: string) => {
    if (!value.trim()) return 'E-posta gereklidir';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Geçerli bir e-posta adresi giriniz';
    return undefined;
  },
  // Şifre doğrulama
  password: (value: string) => {
    if (!value) return 'Şifre gereklidir';
    if (value.length < 6) return 'Şifre en az 6 karakter olmalıdır';
    return undefined;
  },
  // Şifre tekrarı doğrulama
  confirmPassword: (value: string) => {
    if (!value) return 'Şifre tekrarı gereklidir';
    if (value !== initialValues.password) return 'Şifreler eşleşmiyor';
    return undefined;
  },
};

// Kayıt formu bileşeni
export default function RegisterForm() {
  const router = useRouter();
  const { addUser } = useUser();
  
  // Şifre görünürlüğü için state'ler
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Form doğrulama hook'unu kullan
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  } = useFormValidation(initialValues, {
    ...validationRules,
    // Şifre tekrarı doğrulama - dinamik olarak şifre ile karşılaştırma
    confirmPassword: (value: string) => {
      if (!value) return 'Şifre tekrarı gereklidir';
      if (value !== formData.password) return 'Şifreler eşleşmiyor';
      return undefined;
    }
  });

  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form doğrulama
    if (!validateForm()) return;

    try {
      // Yeni kullanıcı oluştur ve kaydet
      addUser({
        name: formData.username,
        email: formData.email,
        role: 'user', // Varsayılan olarak normal kullanıcı rolü
        password: formData.password,
      });

      // API çağrısı simülasyonu (gerçek uygulamada API'ye istek atılır)
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Kayıt verisi:', formData);
      
      // Başarılı kayıt sonrası giriş sayfasına yönlendir
      router.push('/auth/login');
    } catch (error) {
      console.error('Kayıt hatası:', error);
    }
  };

  // Form JSX
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      {/* Kullanıcı Adı Alanı */}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Kullanıcı Adı</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          {/* Kullanıcı ikonu */}
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaUser color="#666" />
          </div>
          {/* Kullanıcı adı input */}
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
            style={{ paddingLeft: '40px' }}
            placeholder="Kullanıcı Adı"
          />
        </div>
        {/* Hata mesajı */}
        {errors.username && touched.username && <p className="error-message" style={{ fontSize: '12px' }}>{errors.username}</p>}
      </div>

      {/* E-posta Alanı */}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>E-posta Adresi</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          {/* E-posta ikonu */}
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaEnvelope color="#666" />
          </div>
          {/* E-posta input */}
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
            style={{ paddingLeft: '40px' }}
            placeholder="ornek@mail.com"
          />
        </div>
        {/* Hata mesajı */}
        {errors.email && touched.email && <p className="error-message" style={{ fontSize: '12px' }}>{errors.email}</p>}
      </div>

      {/* Şifre Alanı */}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Şifre</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          {/* Şifre ikonu */}
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaLock color="#666" />
          </div>
          {/* Şifre input */}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            placeholder="••••••••"
          />
          {/* Şifre görünürlük toggle butonu */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
          </button>
        </div>
        {/* Hata mesajı */}
        {errors.password && touched.password && <p className="error-message" style={{ fontSize: '12px' }}>{errors.password}</p>}
      </div>

      {/* Şifre Tekrar Alanı */}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Şifre Tekrar</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          {/* Şifre ikonu */}
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaLock color="#666" />
          </div>
          {/* Şifre tekrar input */}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            placeholder="••••••••"
          />
          {/* Şifre görünürlük toggle butonu */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showConfirmPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
          </button>
        </div>
        {/* Hata mesajı */}
        {errors.confirmPassword && touched.confirmPassword && <p className="error-message" style={{ fontSize: '12px' }}>{errors.confirmPassword}</p>}
      </div>

      {/* Kayıt Ol Butonu */}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '10px', marginBottom: '50px' }}
      >
        Kayıt Ol
      </button>

      {/* Kullanım Koşulları Notu */}
      <p className="text-center" style={{ fontSize: '14px', color: '#666', marginTop: '5px' , marginBottom: "-15px"}}>
        Kayıt olarak kullanım koşullarını ve gizlilik politikasını kabul etmiş olursunuz.
      </p>
    </form>
  );
}
