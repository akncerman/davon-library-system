import LoginForm from '@/components/features/auth/LoginForm';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
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
            <h2 className="form-title" style={{ marginTop: '0', fontSize: '32px', marginBottom: '30px' }}>Giriş Yap</h2>
            <p className="text-center" style={{marginBottom: '30px', marginTop: '15px', fontSize: '16px'}}>
              Hesabınız yok mu?{' '}
              <Link href="/auth/register" className="link">
                Kayıt olun
              </Link>
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
