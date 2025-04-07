
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'fr' | 'ar';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.destinations': 'Destinations',
    'nav.about': 'About',
    'nav.contactUs': 'Contact Us',
    'nav.login': 'Login',
    'nav.signup': 'Signup',
    'nav.destinations.attractions': 'Tourist Attractions',
    'nav.destinations.accommodations': 'Accommodations',
    'nav.destinations.venues': 'Event Venues',
    
    // Hero Section
    'hero.comingTo': 'COMING TO MOROCCO 2024',
    'hero.experienceThe': 'Experience the',
    'hero.thrill': 'Thrill',
    'hero.of': 'of',
    'hero.moroccanGames': 'Moroccan Games',
    'hero.secureYourTickets': 'Secure your tickets for the most exciting sporting events, cultural performances, and entertainment experiences across Morocco.',
    'hero.discoverDestinations': 'Discover Destinations',
    'hero.exploreGames': 'Explore Games',
    'hero.happyCustomers': 'Happy Customers',
    'hero.locations': 'Locations',
    'hero.events': 'Events',
    
    // Featured Games
    'games.featured': 'Featured Games',
    'games.viewAll': 'View All Games',
    'games.buyTickets': 'Buy Tickets',
    'games.viewDetails': 'View Details',
    'games.date': 'Date',
    'games.time': 'Time',
    'games.location': 'Location',
    'games.price': 'Price from',
    
    // Destinations
    'destinations.title': 'Discover Amazing Destinations',
    'destinations.subtitle': 'Explore Morocco\'s most captivating attractions, luxurious accommodations, and exciting event venues.',
    'destinations.search': 'Search destinations, locations...',
    'destinations.searchBtn': 'Search',
    'destinations.filterBy': 'Filter by:',
    'destinations.all': 'All Destinations',
    'destinations.attractions': 'Attractions',
    'destinations.accommodations': 'Accommodations',
    'destinations.venues': 'Event Venues',
    'destinations.showing': 'Showing',
    'destinations.destinationsCount': 'destinations',
    'destinations.noResults': 'No destinations found',
    'destinations.tryAdjusting': 'Try adjusting your search or filter criteria',
    'destinations.viewDetails': 'View Details',
    'destinations.location': 'Location',
    'destinations.popularDestinations': 'Popular Destinations',
    'destinations.exploreAll': 'Explore All Destinations',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Simplifying your Moroccan adventure with comprehensive solutions.',
    'services.ticketing.title': 'Event Ticketing',
    'services.ticketing.description': 'Secure tickets for the most exciting sporting events, cultural performances, and entertainment experiences.',
    'services.accommodation.title': 'Accommodation Booking',
    'services.accommodation.description': 'Find and book the perfect accommodations for your stay, from luxury hotels to authentic riads.',
    'services.transportation.title': 'Transportation Arrangements',
    'services.transportation.description': 'Effortless transportation solutions to navigate Morocco\'s vibrant cities and scenic landscapes.',
    'services.experiences.title': 'Custom Experiences',
    'services.experiences.description': 'Tailored experiences and guided tours to discover the rich culture and history of Morocco.',
    'services.learnMore': 'Learn More',
    
    // Destination Details
    'destinationDetails.backToDestinations': 'Back to Destinations',
    'destinationDetails.aboutDestination': 'About this Destination',
    'destinationDetails.location': 'Location',
    'destinationDetails.category': 'Category',
    'destinationDetails.overview': 'Overview',
    'destinationDetails.features': 'Features',
    'destinationDetails.nearbyAttractions': 'Nearby Attractions',
    'destinationDetails.reviews': 'Reviews',
    'destinationDetails.reviewsCount': 'reviews',
    'destinationDetails.writeReview': 'Write a Review',
    'destinationDetails.visitWebsite': 'Visit Website',
    'destinationDetails.getDirections': 'Get Directions',

    // Contact Page
    'contact.getIn': 'Get in',
    'contact.touch': 'Touch',
    'contact.sendUs': 'Send Us a',
    'contact.message': 'Message',
    'contact.ourTeam': 'Our team is ready to answer your questions and help you plan your perfect Moroccan experience. Don\'t hesitate to reach out to us',
    'contact.yourEmail': 'Your Email',
    'contact.yourName': 'Your Name',
    'contact.subject': 'Subject',
    'contact.yourMessage': 'Your Message',
    'contact.sendMessage': 'Send Message',
    'contact.emailUs': 'Email Us',
    'contact.callUs': 'Call Us',
    'contact.visitUs': 'Visit Us',
    'contact.businessHours': 'Business Hours',
    'contact.businessHoursTime': 'Monday - Friday: 9:00 AM - 6:00 PM',
    'contact.followUs': 'Follow Us',
    'contact.findUs': 'Find Us',
    'contact.here': 'Here',
    'contact.viewLargerMap': 'View larger map',
    
    // About Page
    'about.title': 'About TicketAra',
    'about.subtitle': 'Your Gateway to Moroccan Experiences',
    'about.ourStory': 'Our Story',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.team': 'Our Team',
    'about.values': 'Our Values',
    
    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.dontHaveAccount': 'Don\'t have an account?',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.name': 'Full Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.agreeToTerms': 'I agree to the Terms of Service and Privacy Policy',
    'auth.createAccount': 'Create Account',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contactUs': 'Contact Us',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe to our newsletter for the latest updates on events and exclusive offers.',
    'footer.yourEmailAddress': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    
    // Seat Selection
    'seats.seatSelection': 'Seat Selection',
    'seats.selectYourSeats': 'Select Your Seats',
    'seats.stadium': 'Stadium',
    'seats.section': 'Section',
    'seats.seat': 'Seat',
    'seats.selected': 'selected',
    'seats.deselected': 'deselected',
    'seats.selectedSeats': 'Selected Seats',
    'seats.noSeatsSelected': 'No seats selected',
    'seats.pleaseSelectAtLeastOne': 'Please select at least one seat',
    'seats.continueTo': 'Continue to Payment',
    'seats.price': 'Price',
    'seats.quantity': 'Quantity',
    'seats.total': 'Total',
    'seats.unavailable': 'UNAVAILABLE',
    'seats.filterByZone': 'Filter by Zone',
    'seats.selectSection': 'Select Seating Section',
    'seats.choosePreferredSection': 'Choose your preferred seating section from the stadium map',
    'seats.clubLevel': 'Club Level',
    'seats.upperLevel': 'Upper Level',
    
    // Payment
    'payment.title': 'Payment',
    'payment.orderSummary': 'Order Summary',
    'payment.orderDetails': 'Your Order Details',
    'payment.match': 'Match',
    'payment.event': 'Event',
    'payment.seats': 'Seats',
    'payment.date': 'Date',
    'payment.location': 'Location',
    'payment.selectedSeats': 'Selected Seats',
    'payment.viewStadiumMap': 'View Stadium Map',
    'payment.category': 'Category',
    'payment.count': 'Count',
    'payment.removed': 'Removed',
    'payment.added': 'Added',
    'payment.fromSelection': 'from your selection',
    'payment.toSelection': 'to your selection',
    'payment.selectStadiumSections': 'Select seating sections from the stadium map',
    'payment.totalItems': 'Total items',
    'payment.totalPrice': 'Total price',
    'payment.subtotal': 'Subtotal',
    'payment.fees': 'Service Fees',
    'payment.total': 'Total',
    'payment.paymentInformation': 'Payment Information',
    'payment.paymentMethod': 'Payment Method',
    'payment.cardNumber': 'Card Number',
    'payment.cardHolder': 'Card Holder',
    'payment.yourName': 'YOUR NAME',
    'payment.expires': 'Expires',
    'payment.phoneNumber': 'Phone Number',
    'payment.emailAddress': 'Email Address',
    'payment.expiryDate': 'Expiry Date',
    'payment.cvv': 'CVV',
    'payment.cardholderName': 'Cardholder Name',
    'payment.billingAddress': 'Billing Address',
    'payment.completePayment': 'Complete Payment',
    'payment.payNow': 'Pay Now',
    'payment.reset': 'Reset',
    'payment.cancel': 'Cancel',
    'payment.securePayment': 'Secure Payment',
    'payment.successful': 'Payment successful! Your tickets have been confirmed.',
    'payment.cancelled': 'Payment cancelled',
    'payment.validCardNumber': 'Please enter a valid 16-digit card number',
    'payment.validExpiryDate': 'Please enter a valid expiry date (MM/YY)',
    'payment.validCVC': 'Please enter a valid 3-digit CVC',
    'payment.enterCardholderName': 'Please enter the cardholder name',
    'payment.selectSection': 'Please select at least one seating section',
    
    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.games': 'Games',
    'admin.destinations': 'Destinations',
    'admin.users': 'Users',
    'admin.logout': 'Logout',
    'admin.returnToSite': 'Return to main site',
    'admin.search': 'Search...',
    'admin.mainNavigation': 'Main Navigation',

    // Common
    'common.loading': 'Loading...',
    'common.readMore': 'Read More',
    'common.showLess': 'Show Less',
    'common.from': 'From',
    'common.close': 'Close'
  },
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.games': 'Jeux',
    'nav.destinations': 'Destinations',
    'nav.about': 'À propos',
    'nav.contactUs': 'Contactez-nous',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.destinations.attractions': 'Attractions Touristiques',
    'nav.destinations.accommodations': 'Hébergements',
    'nav.destinations.venues': 'Lieux d\'événements',
    
    // Hero Section
    'hero.comingTo': 'BIENTÔT AU MAROC 2024',
    'hero.experienceThe': 'Découvrez le',
    'hero.thrill': 'Frisson',
    'hero.of': 'des',
    'hero.moroccanGames': 'Jeux Marocains',
    'hero.secureYourTickets': 'Réservez vos billets pour les événements sportifs, les spectacles culturels et les expériences de divertissement les plus passionnants à travers le Maroc.',
    'hero.discoverDestinations': 'Découvrir les Destinations',
    'hero.exploreGames': 'Explorer les Jeux',
    'hero.happyCustomers': 'Clients Satisfaits',
    'hero.locations': 'Emplacements',
    'hero.events': 'Événements',
    
    // Featured Games
    'games.featured': 'Jeux à l\'Affiche',
    'games.viewAll': 'Voir Tous les Jeux',
    'games.buyTickets': 'Acheter des Billets',
    'games.viewDetails': 'Voir les Détails',
    'games.date': 'Date',
    'games.time': 'Heure',
    'games.location': 'Lieu',
    'games.price': 'Prix à partir de',
    
    // Destinations
    'destinations.title': 'Découvrez des Destinations Incroyables',
    'destinations.subtitle': 'Explorez les attractions captivantes, les hébergements luxueux et les lieux d\'événements passionnants du Maroc.',
    'destinations.search': 'Rechercher des destinations, lieux...',
    'destinations.searchBtn': 'Rechercher',
    'destinations.filterBy': 'Filtrer par:',
    'destinations.all': 'Toutes les Destinations',
    'destinations.attractions': 'Attractions',
    'destinations.accommodations': 'Hébergements',
    'destinations.venues': 'Lieux d\'événements',
    'destinations.showing': 'Affichage de',
    'destinations.destinationsCount': 'destinations',
    'destinations.noResults': 'Aucune destination trouvée',
    'destinations.tryAdjusting': 'Essayez d\'ajuster vos critères de recherche ou de filtre',
    'destinations.viewDetails': 'Voir les Détails',
    'destinations.location': 'Lieu',
    'destinations.popularDestinations': 'Destinations Populaires',
    'destinations.exploreAll': 'Explorer Toutes les Destinations',
    
    // Services Section
    'services.title': 'Nos Services',
    'services.subtitle': 'Simplifier votre aventure marocaine avec des solutions complètes.',
    'services.ticketing.title': 'Billetterie d\'Événements',
    'services.ticketing.description': 'Sécurisez des billets pour les événements sportifs, les spectacles culturels et les expériences de divertissement les plus excitants.',
    'services.accommodation.title': 'Réservation d\'Hébergement',
    'services.accommodation.description': 'Trouvez et réservez l\'hébergement parfait pour votre séjour, des hôtels de luxe aux riads authentiques.',
    'services.transportation.title': 'Arrangements de Transport',
    'services.transportation.description': 'Solutions de transport sans effort pour naviguer dans les villes vibrantes et les paysages pittoresques du Maroc.',
    'services.experiences.title': 'Expériences Sur Mesure',
    'services.experiences.description': 'Expériences sur mesure et visites guidées pour découvrir la riche culture et l\'histoire du Maroc.',
    'services.learnMore': 'En Savoir Plus',
    
    // Destination Details
    'destinationDetails.backToDestinations': 'Retour aux Destinations',
    'destinationDetails.aboutDestination': 'À propos de cette destination',
    'destinationDetails.location': 'Lieu',
    'destinationDetails.category': 'Catégorie',
    'destinationDetails.overview': 'Aperçu',
    'destinationDetails.features': 'Caractéristiques',
    'destinationDetails.nearbyAttractions': 'Attractions à proximité',
    'destinationDetails.reviews': 'Avis',
    'destinationDetails.reviewsCount': 'avis',
    'destinationDetails.writeReview': 'Écrire un avis',
    'destinationDetails.visitWebsite': 'Visiter le site web',
    'destinationDetails.getDirections': 'Obtenir l\'itinéraire',

    // Contact Page
    'contact.getIn': 'Entrer en',
    'contact.touch': 'Contact',
    'contact.sendUs': 'Envoyez-nous un',
    'contact.message': 'Message',
    'contact.ourTeam': 'Notre équipe est prête à répondre à vos questions et à vous aider à planifier votre parfaite expérience marocaine. N\'hésitez pas à nous contacter',
    'contact.yourEmail': 'Votre Email',
    'contact.yourName': 'Votre Nom',
    'contact.subject': 'Sujet',
    'contact.yourMessage': 'Votre Message',
    'contact.sendMessage': 'Envoyer le Message',
    'contact.emailUs': 'Envoyez-nous un Email',
    'contact.callUs': 'Appelez-nous',
    'contact.visitUs': 'Visitez-nous',
    'contact.businessHours': 'Heures d\'Ouverture',
    'contact.businessHoursTime': 'Lundi - Vendredi: 9h00 - 18h00',
    'contact.followUs': 'Suivez-nous',
    'contact.findUs': 'Trouvez-nous',
    'contact.here': 'Ici',
    'contact.viewLargerMap': 'Voir une carte plus grande',
    
    // About Page
    'about.title': 'À propos de TicketAra',
    'about.subtitle': 'Votre Passerelle vers les Expériences Marocaines',
    'about.ourStory': 'Notre Histoire',
    'about.mission': 'Notre Mission',
    'about.vision': 'Notre Vision',
    'about.team': 'Notre Équipe',
    'about.values': 'Nos Valeurs',
    
    // Authentication
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.dontHaveAccount': 'Vous n\'avez pas de compte?',
    'auth.alreadyHaveAccount': 'Vous avez déjà un compte?',
    'auth.name': 'Nom Complet',
    'auth.confirmPassword': 'Confirmer le Mot de Passe',
    'auth.agreeToTerms': 'J\'accepte les Conditions d\'Utilisation et la Politique de Confidentialité',
    'auth.createAccount': 'Créer un Compte',
    
    // Footer
    'footer.quickLinks': 'Liens Rapides',
    'footer.contactUs': 'Contactez-nous',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Abonnez-vous à notre newsletter pour les dernières mises à jour sur les événements et les offres exclusives.',
    'footer.yourEmailAddress': 'Votre adresse email',
    'footer.subscribe': 'S\'abonner',
    'footer.allRightsReserved': 'Tous droits réservés.',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.termsOfService': 'Conditions d\'Utilisation',
    'footer.cookiePolicy': 'Politique des Cookies',
    
    // Seat Selection
    'seats.seatSelection': 'Sélection des Sièges',
    'seats.selectYourSeats': 'Sélectionnez Vos Sièges',
    'seats.stadium': 'Stade',
    'seats.section': 'Section',
    'seats.seat': 'Siège',
    'seats.selected': 'sélectionné',
    'seats.deselected': 'désélectionné',
    'seats.selectedSeats': 'Sièges Sélectionnés',
    'seats.noSeatsSelected': 'Aucun siège sélectionné',
    'seats.pleaseSelectAtLeastOne': 'Veuillez sélectionner au moins un siège',
    'seats.continueTo': 'Continuer vers le Paiement',
    'seats.price': 'Prix',
    'seats.quantity': 'Quantité',
    'seats.total': 'Total',
    'seats.unavailable': 'INDISPONIBLE',
    'seats.filterByZone': 'Filtrer par Zone',
    'seats.selectSection': 'Sélectionner une Section',
    'seats.choosePreferredSection': 'Choisissez votre section préférée dans le plan du stade',
    'seats.clubLevel': 'Niveau Club',
    'seats.upperLevel': 'Niveau Supérieur',
    
    // Payment
    'payment.title': 'Paiement',
    'payment.orderSummary': 'Résumé de la Commande',
    'payment.orderDetails': 'Détails de Votre Commande',
    'payment.match': 'Match',
    'payment.event': 'Événement',
    'payment.seats': 'Sièges',
    'payment.date': 'Date',
    'payment.location': 'Lieu',
    'payment.selectedSeats': 'Sièges Sélectionnés',
    'payment.viewStadiumMap': 'Voir le Plan du Stade',
    'payment.category': 'Catégorie',
    'payment.count': 'Nombre',
    'payment.removed': 'Supprimé',
    'payment.added': 'Ajouté',
    'payment.fromSelection': 'de votre sélection',
    'payment.toSelection': 'à votre sélection',
    'payment.selectStadiumSections': 'Sélectionnez des sections depuis le plan du stade',
    'payment.totalItems': 'Total articles',
    'payment.totalPrice': 'Prix total',
    'payment.subtotal': 'Sous-total',
    'payment.fees': 'Frais de Service',
    'payment.total': 'Total',
    'payment.paymentInformation': 'Informations de Paiement',
    'payment.paymentMethod': 'Méthode de Paiement',
    'payment.cardNumber': 'Numéro de Carte',
    'payment.cardHolder': 'Titulaire de la Carte',
    'payment.yourName': 'VOTRE NOM',
    'payment.expires': 'Expire',
    'payment.phoneNumber': 'Numéro de Téléphone',
    'payment.emailAddress': 'Adresse Email',
    'payment.expiryDate': 'Date d\'Expiration',
    'payment.cvv': 'CVV',
    'payment.cardholderName': 'Nom du Titulaire',
    'payment.billingAddress': 'Adresse de Facturation',
    'payment.completePayment': 'Finaliser le Paiement',
    'payment.payNow': 'Payer Maintenant',
    'payment.reset': 'Réinitialiser',
    'payment.cancel': 'Annuler',
    'payment.securePayment': 'Paiement Sécurisé',
    'payment.successful': 'Paiement réussi ! Vos billets ont été confirmés.',
    'payment.cancelled': 'Paiement annulé',
    'payment.validCardNumber': 'Veuillez entrer un numéro de carte valide à 16 chiffres',
    'payment.validExpiryDate': 'Veuillez entrer une date d\'expiration valide (MM/AA)',
    'payment.validCVC': 'Veuillez entrer un CVC valide à 3 chiffres',
    'payment.enterCardholderName': 'Veuillez entrer le nom du titulaire de la carte',
    'payment.selectSection': 'Veuillez sélectionner au moins une section de sièges',
    
    // Admin
    'admin.dashboard': 'Tableau de Bord',
    'admin.games': 'Jeux',
    'admin.destinations': 'Destinations',
    'admin.users': 'Utilisateurs',
    'admin.logout': 'Déconnexion',
    'admin.returnToSite': 'Retourner au site principal',
    'admin.search': 'Rechercher...',
    'admin.mainNavigation': 'Navigation Principale',

    // Common
    'common.loading': 'Chargement...',
    'common.readMore': 'Lire Plus',
    'common.showLess': 'Afficher Moins',
    'common.from': 'À partir de',
    'common.close': 'Fermer'
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.games': 'الألعاب',
    'nav.destinations': 'الوجهات',
    'nav.about': 'عن الموقع',
    'nav.contactUs': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.destinations.attractions': 'مناطق الجذب السياحي',
    'nav.destinations.accommodations': 'أماكن الإقامة',
    'nav.destinations.venues': 'أماكن الفعاليات',
    
    // Hero Section
    'hero.comingTo': 'قادم إلى المغرب 2024',
    'hero.experienceThe': 'استمتع',
    'hero.thrill': 'بإثارة',
    'hero.of': 'الألعاب',
    'hero.moroccanGames': 'المغربية',
    'hero.secureYourTickets': 'احجز تذاكرك لأكثر الأحداث الرياضية والعروض الثقافية وتجارب الترفيه إثارة في جميع أنحاء المغرب.',
    'hero.discoverDestinations': 'اكتشف الوجهات',
    'hero.exploreGames': 'استكشف الألعاب',
    'hero.happyCustomers': 'عملاء سعداء',
    'hero.locations': 'مواقع',
    'hero.events': 'فعاليات',
    
    // Featured Games
    'games.featured': 'الألعاب المميزة',
    'games.viewAll': 'عرض جميع الألعاب',
    'games.buyTickets': 'شراء التذاكر',
    'games.viewDetails': 'عرض التفاصيل',
    'games.date': 'التاريخ',
    'games.time': 'الوقت',
    'games.location': 'الموقع',
    'games.price': 'السعر من',
    
    // Destinations
    'destinations.title': 'اكتشف وجهات مذهلة',
    'destinations.subtitle': 'استكشف أكثر مناطق الجذب إثارة في المغرب وأماكن الإقامة الفاخرة ومواقع الفعاليات المثيرة.',
    'destinations.search': 'البحث عن وجهات، مواقع...',
    'destinations.searchBtn': 'بحث',
    'destinations.filterBy': 'تصفية حسب:',
    'destinations.all': 'كل الوجهات',
    'destinations.attractions': 'مناطق الجذب',
    'destinations.accommodations': 'أماكن الإقامة',
    'destinations.venues': 'أماكن الفعاليات',
    'destinations.showing': 'عرض',
    'destinations.destinationsCount': 'وجهات',
    'destinations.noResults': 'لم يتم العثور على وجهات',
    'destinations.tryAdjusting': 'حاول تعديل معايير البحث أو التصفية',
    'destinations.viewDetails': 'عرض التفاصيل',
    'destinations.location': 'الموقع',
    'destinations.popularDestinations': 'الوجهات الشائعة',
    'destinations.exploreAll': 'استكشاف جميع الوجهات',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'تبسيط مغامرتك المغربية مع حلول شاملة.',
    'services.ticketing.title': 'تذاكر الفعاليات',
    'services.ticketing.description': 'تأمين تذاكر لأكثر الأحداث الرياضية والعروض الثقافية وتجارب الترفيه إثارة.',
    'services.accommodation.title': 'حجز أماكن الإقامة',
    'services.accommodation.description': 'ابحث واحجز أماكن الإقامة المثالية لإقامتك، من الفنادق الفاخرة إلى الرياض الأصيلة.',
    'services.transportation.title': 'ترتيبات النقل',
    'services.transportation.description': 'حلول نقل سهلة للتنقل في المدن النابضة بالحياة والمناظر الطبيعية الخلابة في المغرب.',
    'services.experiences.title': 'تجارب مخصصة',
    'services.experiences.description': 'تجارب مخصصة وجولات مع مرشدين لاكتشاف الثقافة والتاريخ الغني للمغرب.',
    'services.learnMore': 'معرفة المزيد',
    
    // Destination Details
    'destinationDetails.backToDestinations': 'العودة إلى الوجهات',
    'destinationDetails.aboutDestination': 'عن هذه الوجهة',
    'destinationDetails.location': 'الموقع',
    'destinationDetails.category': 'الفئة',
    'destinationDetails.overview': 'نظرة عامة',
    'destinationDetails.features': 'المميزات',
    'destinationDetails.nearbyAttractions': 'مناطق الجذب القريبة',
    'destinationDetails.reviews': 'التقييمات',
    'destinationDetails.reviewsCount': 'تقييمات',
    'destinationDetails.writeReview': 'كتابة تقييم',
    'destinationDetails.visitWebsite': 'زيارة الموقع',
    'destinationDetails.getDirections': 'الحصول على الاتجاهات',

    // Contact Page
    'contact.getIn': 'تواصل',
    'contact.touch': 'معنا',
    'contact.sendUs': 'أرسل لنا',
    'contact.message': 'رسالة',
    'contact.ourTeam': 'فريقنا جاهز للإجابة على أسئلتك ومساعدتك في تخطيط تجربتك المغربية المثالية. لا تتردد في التواصل معنا',
    'contact.yourEmail': 'بريدك الإلكتروني',
    'contact.yourName': 'اسمك',
    'contact.subject': 'الموضوع',
    'contact.yourMessage': 'رسالتك',
    'contact.sendMessage': 'إرسال الرسالة',
    'contact.emailUs': 'راسلنا عبر البريد الإلكتروني',
    'contact.callUs': 'اتصل بنا',
    'contact.visitUs': 'زرنا',
    'contact.businessHours': 'ساعات العمل',
    'contact.businessHoursTime': 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً',
    'contact.followUs': 'تابعنا',
    'contact.findUs': 'اعثر علينا',
    'contact.here': 'هنا',
    'contact.viewLargerMap': 'عرض خريطة أكبر',
    
    // About Page
    'about.title': 'عن تكيت عرب',
    'about.subtitle': 'بوابتك إلى التجارب المغربية',
    'about.ourStory': 'قصتنا',
    'about.mission': 'مهمتنا',
    'about.vision': 'رؤيتنا',
    'about.team': 'فريقنا',
    'about.values': 'قيمنا',
    
    // Authentication
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.name': 'الاسم الكامل',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.agreeToTerms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    'auth.createAccount': 'إنشاء حساب',
    
    // Footer
    'footer.quickLinks': 'روابط سريعة',
    'footer.contactUs': 'اتصل بنا',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.newsletterText': 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات عن الفعاليات والعروض الحصرية.',
    'footer.yourEmailAddress': 'عنوان بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.allRightsReserved': 'جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.cookiePolicy': 'سياسة ملفات تعريف الارتباط',
    
    // Seat Selection
    'seats.seatSelection': 'اختيار المقاعد',
    'seats.selectYourSeats': 'اختر مقاعدك',
    'seats.stadium': 'الملعب',
    'seats.section': 'القسم',
    'seats.seat': 'المقعد',
    'seats.selected': 'تم اختياره',
    'seats.deselected': 'تم إلغاء اختياره',
    'seats.selectedSeats': 'المقاعد المختارة',
    'seats.noSeatsSelected': 'لم يتم اختيار أي مقاعد',
    'seats.pleaseSelectAtLeastOne': 'الرجاء اختيار مقعد واحد على الأقل',
    'seats.continueTo': 'متابعة إلى الدفع',
    'seats.price': 'السعر',
    'seats.quantity': 'الكمية',
    'seats.total': 'المجموع',
    'seats.unavailable': 'غير متوفر',
    'seats.filterByZone': 'تصفية حسب المنطقة',
    'seats.selectSection': 'اختر قسم المقاعد',
    'seats.choosePreferredSection': 'اختر قسم المقاعد المفضل لديك من خريطة الملعب',
    'seats.clubLevel': 'مستوى النادي',
    'seats.upperLevel': 'المستوى العلوي',
    
    // Payment
    'payment.title': 'الدفع',
    'payment.orderSummary': 'ملخص الطلب',
    'payment.orderDetails': 'تفاصيل طلبك',
    'payment.match': 'المباراة',
    'payment.event': 'الحدث',
    'payment.seats': 'المقاعد',
    'payment.date': 'التاريخ',
    'payment.location': 'الموقع',
    'payment.selectedSeats': 'المقاعد المختارة',
    'payment.viewStadiumMap': 'عرض خريطة الملعب',
    'payment.category': 'الفئة',
    'payment.count': 'العدد',
    'payment.removed': 'تمت إزالة',
    'payment.added': 'تمت إضافة',
    'payment.fromSelection': 'من اختياراتك',
    'payment.toSelection': 'إلى اختياراتك',
    'payment.selectStadiumSections': 'اختر أقسام المقاعد من خريطة الملعب',
    'payment.totalItems': 'إجمالي العناصر',
    'payment.totalPrice': 'السعر الإجمالي',
    'payment.subtotal': 'المجموع الفرعي',
    'payment.fees': 'رسوم الخدمة',
    'payment.total': 'المجموع',
    'payment.paymentInformation': 'معلومات الدفع',
    'payment.paymentMethod': 'طريقة الدفع',
    'payment.cardNumber': 'رقم البطاقة',
    'payment.cardHolder': 'حامل البطاقة',
    'payment.yourName': 'اسمك',
    'payment.expires': 'تنتهي في',
    'payment.phoneNumber': 'رقم الهاتف',
    'payment.emailAddress': 'البريد الإلكتروني',
    'payment.expiryDate': 'تاريخ الانتهاء',
    'payment.cvv': 'رمز التحقق',
    'payment.cardholderName': 'اسم حامل البطاقة',
    'payment.billingAddress': 'عنوان الفواتير',
    'payment.completePayment': 'إتمام الدفع',
    'payment.payNow': 'ادفع الآن',
    'payment.reset': 'إعادة ضبط',
    'payment.cancel': 'إلغاء',
    'payment.securePayment': 'دفع آمن',
    'payment.successful': 'تم الدفع بنجاح! تم تأكيد تذاكرك.',
    'payment.cancelled': 'تم إلغاء الدفع',
    'payment.validCardNumber': 'الرجاء إدخال رقم بطاقة صالح مكون من 16 رقمًا',
    'payment.validExpiryDate': 'الرجاء إدخال تاريخ انتهاء صالح (MM/YY)',
    'payment.validCVC': 'الرجاء إدخال رمز تحقق صالح مكون من 3 أرقام',
    'payment.enterCardholderName': 'الرجاء إدخال اسم حامل البطاقة',
    'payment.selectSection': 'الرجاء اختيار قسم واحد من المقاعد على الأقل',
    
    // Admin
    'admin.dashboard': 'لوحة التحكم',
    'admin.games': 'الألعاب',
    'admin.destinations': 'الوجهات',
    'admin.users': 'المستخدمون',
    'admin.logout': 'تسجيل الخروج',
    'admin.returnToSite': 'العودة إلى الموقع الرئيسي',
    'admin.search': 'بحث...',
    'admin.mainNavigation': 'التنقل الرئيسي',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.readMore': 'قراءة المزيد',
    'common.showLess': 'عرض أقل',
    'common.from': 'من',
    'common.close': 'إغلاق'
  }
};

// Create provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial language from localStorage if available, otherwise use browser language
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'ar') return 'ar';
    return 'en'; // Default to English
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set direction attribute on html element for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Set lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
