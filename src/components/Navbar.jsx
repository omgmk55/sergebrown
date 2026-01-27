import { useState } from 'react';
import { Menu, X, Music, User, LogOut, Settings, ChevronRight, Mail, Lock, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'


    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setShowLoginModal(false);
        // Optional: Redirect to fan zone or show notification
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowProfileMenu(false);
    };

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Musique', path: '/music' },
        { name: 'Galerie', path: '/gallery' },
        { name: 'Événements', path: '/events' },
        { name: 'À propos', path: '/about' },
        { name: 'Contact', path: '/contact' },
        ...(isLoggedIn ? [{ name: 'Fan Zone', path: '/fan-zone' }] : []),
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full z-50 glass-dark"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <Music className="w-8 h-8 text-gold" />
                            <span className="text-2xl font-outfit font-bold text-gradient">
                                SERGE BROWN
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-off-white hover:text-gold transition-colors duration-300 font-medium ${isActive(link.path) ? 'text-gold' : ''
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Profile Icon (Desktop) */}
                            <div className="relative">
                                <button
                                    onClick={() => isLoggedIn ? setShowProfileMenu(!showProfileMenu) : setShowLoginModal(true)}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                                >
                                    {isLoggedIn ? (
                                        <div className="w-full h-full rounded-full bg-gradient-gold p-[2px]">
                                            <div className="w-full h-full rounded-full bg-rich-black flex items-center justify-center text-gold font-bold">
                                                S
                                            </div>
                                        </div>
                                    ) : (
                                        <User className="w-5 h-5 text-off-white" />
                                    )}
                                </button>

                                {/* Profile Menu Dropdown */}
                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-64 glass-dark rounded-xl border border-white/10 shadow-xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/10">
                                                <div className="font-bold text-white">Serge Fan</div>
                                                <div className="text-xs text-gray-400">fan@sergebrown.com</div>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/5 flex items-center gap-3 transition-colors block"
                                                >
                                                    <User className="w-4 h-4" /> Mon Profil
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/5 flex items-center gap-3 transition-colors block"
                                                >
                                                    <Settings className="w-4 h-4" /> Paramètres
                                                </Link>
                                                <div className="border-t border-white/10 my-1" />
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="w-full px-4 py-2 text-left text-gold hover:bg-white/5 flex items-center gap-3 transition-colors block"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                </Link>
                                                <div className="border-t border-white/10 my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/5 flex items-center gap-3 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> Déconnexion
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center gap-4 md:hidden">
                            <button
                                onClick={() => isLoggedIn ? setShowProfileMenu(!showProfileMenu) : setShowLoginModal(true)}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                {isLoggedIn ? (
                                    <div className="w-full h-full rounded-full bg-gradient-gold p-[2px]">
                                        <div className="w-full h-full rounded-full bg-rich-black flex items-center justify-center text-gold font-bold">
                                            S
                                        </div>
                                    </div>
                                ) : (
                                    <User className="w-5 h-5 text-off-white" />
                                )}
                            </button>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-off-white hover:text-gold transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass-dark border-t border-white/10"
                        >
                            <div className="px-4 py-4 space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-off-white hover:text-gold transition-colors duration-300 py-2 ${isActive(link.path) ? 'text-gold' : ''
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Login/Signup Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowLoginModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-dark border border-white/10 p-8 rounded-2xl w-full max-w-md relative"
                        >
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold/10 mb-4">
                                    <User className="w-8 h-8 text-gold" />
                                </div>
                                <h2 className="text-2xl font-outfit font-bold mb-2">
                                    {authMode === 'login' ? 'Bon retour parmi nous' : 'Créer un compte'}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {authMode === 'login'
                                        ? 'Connectez-vous pour accéder à votre espace fan'
                                        : 'Rejoignez la communauté Serge Brown'}
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold/50 transition-colors"
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Mot de passe</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="password"
                                            className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold/50 transition-colors"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-gold text-rich-black font-bold py-3 rounded-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                >
                                    {authMode === 'login' ? 'Se connecter' : 'S\'inscrire'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-400">
                                {authMode === 'login' ? (
                                    <>
                                        Pas encore de compte ?{' '}
                                        <button onClick={() => setAuthMode('signup')} className="text-gold hover:underline">
                                            S'inscrire
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Déjà un compte ?{' '}
                                        <button onClick={() => setAuthMode('login')} className="text-gold hover:underline">
                                            Se connecter
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
