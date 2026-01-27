import { motion } from 'framer-motion';
import { Bell, Moon, Shield, Smartphone, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        newsletter: true,
        concerts: true
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h1 className="text-3xl font-outfit font-bold mb-8 text-gradient">Paramètres</h1>

                    {/* Notifications Section */}
                    <div className="glass-dark p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Bell className="text-gold" /> Notifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 glass rounded-xl">
                                <div>
                                    <h3 className="font-medium">Nouvelles sorties musicales</h3>
                                    <p className="text-sm text-gray-400">Soyez averti dès qu'un nouveau titre est disponible</p>
                                </div>
                                <div
                                    onClick={() => toggleNotification('email')}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.email ? 'bg-gold' : 'bg-gray-600'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 glass rounded-xl">
                                <div>
                                    <h3 className="font-medium">Dates de concerts</h3>
                                    <p className="text-sm text-gray-400">Alertes sur les ventes de billets et nouvelles dates</p>
                                </div>
                                <div
                                    onClick={() => toggleNotification('concerts')}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.concerts ? 'bg-gold' : 'bg-gray-600'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.concerts ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 glass rounded-xl">
                                <div>
                                    <h3 className="font-medium">Newsletter mensuelle</h3>
                                    <p className="text-sm text-gray-400">Actualités, coulisses et contenus exclusifs</p>
                                </div>
                                <div
                                    onClick={() => toggleNotification('newsletter')}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.newsletter ? 'bg-gold' : 'bg-gray-600'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.newsletter ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="glass-dark p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="text-gold" /> Sécurité & Compte
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full text-left p-4 glass rounded-xl hover:bg-white/10 transition-colors flex justify-between items-center group">
                                <span>Changer de mot de passe</span>
                                <span className="text-gray-400 group-hover:text-gold">Modifier</span>
                            </button>
                            <button className="w-full text-left p-4 glass rounded-xl hover:bg-white/10 transition-colors flex justify-between items-center group">
                                <span>Authentification à deux facteurs (2FA)</span>
                                <span className="text-red-400">Désactivé</span>
                            </button>
                            <button className="w-full text-left p-4 glass rounded-xl hover:bg-red-500/20 transition-colors flex justify-between items-center group border border-red-500/30">
                                <span className="text-red-400">Supprimer mon compte</span>
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
