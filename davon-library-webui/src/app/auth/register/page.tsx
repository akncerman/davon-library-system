import RegisterForm from '@/components/features/auth/RegisterForm';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main>
      <header>
        <nav className="navbar">
          <div className="logo">
            <FaBookOpen size={28} color="#007AFF" />
            <h1>Davon Kütüphane</h1>
          </div>
          <div className="auth-buttons">
            <Link href="/" className="login-button">
              Ana Sayfa
            </Link>
          </div>
        </nav>
      </header>

      <div className="hero" style={{ paddingTop: '180px', paddingBottom: '0px', minHeight: '100vh' }}>
        <div className="hero-content" style={{ padding: '60px 20px 20px 20px' }}>
          <div className="form-container" style={{ marginTop: '0', maxWidth: '550px', padding: '50px' }}>
            <h2 className="form-title" style={{ marginTop: '0', fontSize: '32px', marginBottom: '30px' }}>Kayıt Ol</h2>
            <p className="text-center" style={{marginBottom: '30px', marginTop: '15px', fontSize: '16px'}}>
              Zaten hesabınız var mı?{' '}
              <Link href="/auth/login" className="link">
                Giriş yapın
              </Link>
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
} 