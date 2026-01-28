import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Message envoyé ! Merci de votre contact.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'contact@sergebrown.com', href: 'mailto:contact@sergebrown.com' },
        { icon: Phone, label: 'Téléphone', value: '+33 X XX XX XX XX', href: 'tel:+33XXXXXXXXX' },
        { icon: MapPin, label: 'Localisation', value: 'Paris, France', href: '#' },
    ];

    const socialLinks = [
        { icon: Instagram, url: '#', label: 'Instagram', color: '#E4405F' },
        { icon: Facebook, url: '#', label: 'Facebook', color: '#1877F2' },
        { icon: Youtube, url: '#', label: 'YouTube', color: '#FF0000' },
        { icon: Twitter, url: '#', label: 'Twitter', color: '#1DA1F2' },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit mb-6">
                        <span className="text-gradient">Contact</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Une question ? Un projet de collaboration ? N'hésitez pas à me contacter.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="glass-dark p-6 sm:p-8 rounded-2xl">
                            <h2 className="text-3xl font-outfit font-bold mb-6">Envoyez-moi un message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full glass px-4 py-3 rounded-lg bg-rich-black/50 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full glass px-4 py-3 rounded-lg bg-rich-black/50 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full glass px-4 py-3 rounded-lg bg-rich-black/50 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="De quoi voulez-vous parler ?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full glass px-4 py-3 rounded-lg bg-rich-black/50 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors resize-none"
                                        placeholder="Votre message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-gold text-rich-black px-6 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Envoyer le message</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Contact Information */}
                        <div className="glass-dark p-8 rounded-2xl">
                            <h2 className="text-3xl font-outfit font-bold mb-6">Informations de contact</h2>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={info.href}
                                            className="flex items-start gap-4 p-4 glass rounded-lg hover:bg-white/10 transition-colors group"
                                        >
                                            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-rich-black" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-400">{info.label}</div>
                                                <div className="text-lg font-medium group-hover:text-gold transition-colors">
                                                    {info.value}
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="glass-dark p-8 rounded-2xl">
                            <h2 className="text-3xl font-outfit font-bold mb-6">Réseaux Sociaux</h2>

                            <p className="text-gray-300 mb-6">
                                Suivez-moi sur les réseaux sociaux pour ne rien manquer de mon actualité !
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.url}
                                            whileHover={{ scale: 1.05 }}
                                            className="glass p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors group"
                                        >
                                            <Icon className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                                            <span className="text-sm font-medium">{social.label}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Booking Info */}
                        <div className="glass-dark p-8 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                            <h3 className="text-2xl font-outfit font-bold mb-4 text-gold">Booking & Collaborations</h3>
                            <p className="text-gray-300 mb-4">
                                Disponible pour des concerts, événements privés et collaborations artistiques.
                            </p>
                            <a
                                href="mailto:booking@sergebrown.com"
                                className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                            >
                                <Mail className="w-4 h-4" />
                                booking@sergebrown.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
