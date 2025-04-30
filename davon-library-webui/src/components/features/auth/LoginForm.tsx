'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '@/hooks/useUser';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { users, setCurrentUser } = useUser();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    if (!formData.password) newErrors.password = 'Şifre gereklidir';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setLoginError('');

    try {
      // Kullanıcıyı bul
      const user = users.find(u => u.email === formData.email);
      
      if (!user) {
        setLoginError('Kullanıcı bulunamadı');
        setIsLoading(false);
        return;
      }

      // Şifre kontrolü
      if (user.password !== formData.password) {
        setLoginError('Şifre yanlış');
        setIsLoading(false);
        return;
      }

      setCurrentUser(user);
      
      // Başarılı giriş
      router.push('/dashboard');
    } catch (error) {
      setLoginError('Giriş yapılırken bir hata oluştu');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      {loginError && (
        <div className="error-message" style={{ marginBottom: '20px', textAlign: 'center', color: 'red' }}>
          {loginError}
        </div>
      )}
      <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>E-posta Adresi</h3>
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
            className={`form-input ${errors.email ? 'error' : ''}`}
            style={{ paddingLeft: '40px' }}
            placeholder="ornek@mail.com"
          />
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}
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
            className={`form-input ${errors.password ? 'error' : ''}`}
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
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginRight: '0.5rem' }} />
          <span>Beni hatırla</span>
        </label>
        <a href="#" className="link">Şifremi unuttum</a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
        style={{ width: '100%', marginTop: '10px' }}
      >
        {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
}