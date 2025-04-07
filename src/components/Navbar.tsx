
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { 
      name: t('nav.destinations'), 
      path: '/destinations',
      submenu: [
        { name: t('nav.destinations.attractions'), path: '/destinations?type=attraction' },
        { name: t('nav.destinations.accommodations'), path: '/destinations?type=accommodation' },
        { name: t('nav.destinations.venues'), path: '/destinations?type=venue' }
      ]
    },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contactUs'), path: '/contact' },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ];

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const getLanguageDisplayName = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8',
        {
          'bg-white shadow-sm py-2': scrolled,
          'bg-transparent py-6': !scrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png" 
              alt="TicketAra" 
              className="h-12 md:h-14"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.submenu ? (
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleDropdownToggle(link.name)}
                >
                  <span 
                    className={cn(
                      "text-gray-700 hover:text-morocco-red transition-colors text-sm font-medium",
                      location.pathname === link.path && "text-morocco-red font-semibold"
                    )}
                  >
                    {link.name}
                  </span>
                  <ChevronDown size={16} className="ml-1" />
                  
                  {activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 animate-fade-in">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    "text-gray-700 hover:text-morocco-red transition-colors text-sm font-medium",
                    location.pathname === link.path && "text-morocco-red font-semibold"
                  )}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          {/* Language Selector */}
          <div className="relative">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[95px] h-9 border-none bg-transparent focus:ring-0">
                <div className="flex items-center">
                  <Globe size={18} className="mr-1" />
                  <SelectValue placeholder={getLanguageDisplayName(language)} />
                </div>
              </SelectTrigger>
              <SelectContent className="min-w-[120px]">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Login Button */}
          <Button 
            className="bg-morocco-red text-white px-8 py-2 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center gap-2"
            onClick={handleLoginClick}
          >
            <LogIn size={16} />
            {t('nav.login')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-slide-down">
          <div className="flex flex-col py-4 px-8">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2">
                {link.submenu ? (
                  <div>
                    <div 
                      className="flex items-center justify-between py-2"
                      onClick={() => handleDropdownToggle(link.name)}
                    >
                      <span className="text-gray-700 font-medium">{link.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "transition-transform duration-300",
                          activeDropdown === link.name ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                    
                    {activeDropdown === link.name && (
                      <div className="pl-4 border-l-2 border-morocco-red mt-1 animate-slide-down">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 text-sm text-gray-600 hover:text-morocco-red transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block py-2 text-gray-700 hover:text-morocco-red transition-colors",
                      location.pathname === link.path && "text-morocco-red font-semibold"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Language Selector (Mobile) */}
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center mb-2">
                <Globe size={18} className="mr-2" />
                <span className="text-gray-700 font-medium">Language</span>
              </div>
              <div className="flex flex-col space-y-2 pl-7">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`text-left text-sm ${language === lang.code ? 'text-morocco-red font-medium' : 'text-gray-600'}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Login Button (Mobile) */}
            <Link to="/login" className="w-full mt-4">
              <Button 
                className="bg-morocco-red text-white py-2 rounded-full hover:bg-opacity-90 transition-all w-full shadow-md flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
