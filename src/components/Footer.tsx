
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-morocco-darkblue text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png" 
                alt="TICKETARA" 
                className="h-12 object-contain" 
              />
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Your premier destination for securing tickets to Morocco's most exciting sporting events, cultural performances, and entertainment experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-morocco-red transition-colors p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-morocco-red transition-colors p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-morocco-red transition-colors p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/"
                  className="text-gray-300 hover:text-morocco-red transition-colors text-sm flex items-center"
                >
                  <span className="mr-2">›</span>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about"
                  className="text-gray-300 hover:text-morocco-red transition-colors text-sm flex items-center"
                >
                  <span className="mr-2">›</span>
                  {t('nav.about')}
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/destinations"
                  className="text-gray-300 hover:text-morocco-red transition-colors text-sm flex items-center"
                >
                  <span className="mr-2">›</span>
                  {t('nav.destinations')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-gray-300 hover:text-morocco-red transition-colors text-sm flex items-center"
                >
                  <span className="mr-2">›</span>
                  {t('nav.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-sm">
                <MapPin size={18} className="mr-3 text-morocco-red mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Avenue Mohammed V, Casablanca, Morocco
                </span>
              </li>
              <li className="flex items-center text-sm">
                <Mail size={18} className="mr-3 text-morocco-red flex-shrink-0" />
                <a href="mailto:info@ticketara.com" className="text-gray-300 hover:text-morocco-red transition-colors">
                  info@ticketara.com
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Phone size={18} className="mr-3 text-morocco-red flex-shrink-0" />
                <a href="tel:+212522123456" className="text-gray-300 hover:text-morocco-red transition-colors">
                  +212 522 123 456
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer.newsletter')}</h3>
            <p className="text-gray-300 mb-4 text-sm">
              {t('footer.newsletterText')}
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email"
                placeholder={t('footer.yourEmailAddress')}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-morocco-red"
              />
              <button 
                type="submit"
                className="bg-morocco-red hover:bg-opacity-90 transition-colors px-4 py-2 rounded-lg font-medium text-sm"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} TICKETARA. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-morocco-red transition-colors text-sm">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-morocco-red transition-colors text-sm">
              {t('footer.termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-morocco-red transition-colors text-sm">
              {t('footer.cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
