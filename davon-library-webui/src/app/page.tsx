import { FaBookOpen, FaSearch, FaClock, FaBell, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ paddingTop: '96px' }}>
      <header>
        <nav className="navbar">
          <div className="logo">
            <FaBookOpen />
            <h1>Davon Kütüphane</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#anasayfa">Ana Sayfa</a></li>
            <li><a href="#ozellikler">Özellikler</a></li>
            <li><a href="#hakkinda">Hakkında</a></li>
            <li><a href="#iletisim">İletişim</a></li>
          </ul>
          <div className="auth-buttons">
            <Link href="/auth/login" className="login-button">
              Giriş Yap
            </Link>
            <Link href="/auth/register" className="register-button">
              Kayıt Ol
            </Link>
          </div>
          <div className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Modern Kütüphane Yönetim Sistemi</h2>
          <p>Kitaplarınızı kolayca yönetin, ödünç alın ve iade edin. Tek platformda tüm kütüphane işlemlerinizi gerçekleştirin.</p>
          <div className="hero-buttons">
            <Link href="/auth/register" className="cta-button">
              Hemen Başla
            </Link>
            <Link href="/auth/login" className="secondary-button">
              Giriş Yap
            </Link>
          </div>
        </div>
      </section>

      <section id="ozellikler" className="features">
        <h2>Öne Çıkan Özellikler</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaSearch />
            <h3>Kolay Arama</h3>
            <p>Geniş katalogda hızlı ve kolay kitap arama. Gelişmiş filtreleme seçenekleri ile istediğiniz kitaba ulaşın.</p>
          </div>
          <div className="feature-card">
            <FaClock />
            <h3>7/24 Erişim</h3>
            <p>İstediğiniz zaman kütüphaneye erişim sağlayın. Mobil uyumlu arayüz ile her yerden bağlanın.</p>
          </div>
          <div className="feature-card">
            <FaBell />
            <h3>Hatırlatmalar</h3>
            <p>İade tarihi ve yeni kitaplar için otomatik bildirimler. Hiçbir şeyi kaçırmayın.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>İletişim</h3>
            <p><FaEnvelope /> info@davonkutuphane.com</p>
            <p><FaPhone /> +90 555 123 4567</p>
            <p><FaMapMarkerAlt /> İstanbul, Türkiye</p>
          </div>
          <div className="footer-section">
            <h3>Sosyal Medya</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Davon Kütüphane Sistemi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
} 