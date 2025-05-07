'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useUser } from '@/hooks/useUser';

// INTERFACE
interface RegisterFormData {
  username: string;  
  email: string;      
  password: string;    
  confirmPassword: string; 
}

// INITIAL VALUES
const initialValues: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// VALIDATION RULES
const validationRules = {
  username: (value: string) => {
    if (!value.trim()) return 'Kullanıcı adı gereklidir';
    if (value.length < 3) return 'Kullanıcı adı en az 3 karakter olmalıdır';
    return undefined;
  },
  email: (value: string) => {
    if (!value.trim()) return 'E-posta gereklidir';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Geçerli bir e-posta adresi giriniz';
    return undefined;
  },
  password: (value: string) => {
    if (!value) return 'Şifre gereklidir';
    if (value.length < 6) return 'Şifre en az 6 karakter olmalıdır';
    return undefined;
  },
  /*confirmPassword: (value: string) => {
    if (!value) return 'Şifre tekrarı gereklidir';
    if (value !== initialValues.password) return 'Şifreler eşleşmiyor';
    return undefined;
  },*/
};

// REGISTER FORM COMPONENT
export default function RegisterForm() {
  const router = useRouter();
  const { addUser } = useUser();
  
  // PASSWORD VISIBILITY STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // FORM VALIDATION HOOK
  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm, 
  } = useFormValidation(initialValues, validationRules);

  // FORM SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FORM VALIDATION
    if (!validateForm()) return;

    try {
      // CREATE NEW USER AND SAVE
      addUser({
        name: formData.username,
        email: formData.email,
        role: 'user', // DEFAULT USER ROLE
        password: formData.password,
      });
      
      // SUCCESSFUL REGISTRATION, REDIRECT TO LOGIN PAGE
      router.push('/auth/login');
    } catch (error) {
      console.error('Kayıt hatası:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Kullanıcı Adı</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaUser color="#666" />
          </div>
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
        {errors.username && touched.username && <p className="error-message" style={{ fontSize: '12px' }}>{errors.username}</p>}
      </div>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>E-posta</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaEnvelope color="#666" />
          </div>
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
        {errors.email && touched.email && <p className="error-message" style={{ fontSize: '12px' }}>{errors.email}</p>}
      </div>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Şifre</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaLock color="#666" />
          </div>
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
          </button>
        </div>
        {errors.password && touched.password && <p className="error-message" style={{ fontSize: '12px' }}>{errors.password}</p>}
      </div>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>Şifre Tekrarı</h3>
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaLock color="#666" />
          </div>
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
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showConfirmPassword ? <FaEyeSlash color="#666" /> : <FaEye color="#666" />}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && <p className="error-message" style={{ fontSize: '12px' }}>{errors.confirmPassword}</p>}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '10px', marginBottom: '50px' }}
      >
        Kayıt Ol
      </button>
      <p className="text-center" style={{ fontSize: '14px', color: '#666', marginTop: '5px' , marginBottom: "-15px"}}>
        Kayıt olarak kullanım koşullarını ve gizlilik politikasını kabul etmiş olursunuz.
      </p>
    </form>
  );
}
