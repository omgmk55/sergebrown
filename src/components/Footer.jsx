import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Instagram, url: '#', label: 'Instagram' },
        { icon: Facebook, url: '#', label: 'Facebook' },
        { icon: Youtube, url: '#', label: 'YouTube' },
        { icon: Twitter, url: '#', label: 'Twitter' },
    ];

    return (
        <footer id="contact" className="bg-dark-gray/80 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-outfit font-bold text-gradient mb-4">
                            SERGE BROWN
                        </h3>
                        <p className="text-gray-400">
                            Artiste | Chanteur | Auteur-Compositeur
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-outfit font-semibold mb-4 text-gold">
                            Contact
                        </h4>
                        <a
                            href="mailto:contact@sergebrown.com"
                            className="flex items-center space-x-2 text-gray-400 hover:text-gold transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span>contact@sergebrown.com</span>
                        </a>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-outfit font-semibold mb-4 text-gold">
                            Réseaux Sociaux
                        </h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.url}
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold/20 hover:border-gold/50 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Serge Brown. Tous droits réservés. Designed by Jeancy Mifundu</p>
                </div>
            </div>
        </footer>
    );
}
