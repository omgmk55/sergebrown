import { motion } from 'framer-motion';
import { User, Mail, MapPin, Camera, Save } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
    const [formData, setFormData] = useState({
        name: 'Serge Fan',
        email: 'fan@sergebrown.com',
        location: 'Paris, France',
        bio: 'Fan inconditionnel de Serge Brown depuis 2024. J\'adore la Soul et le R&B.'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark p-8 rounded-2xl border border-white/10"
                >
                    <h1 className="text-3xl font-outfit font-bold mb-8 text-gradient">Mon Profil</h1>

                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-32 h-32 rounded-full p-[2px] bg-gradient-gold relative group cursor-pointer">
                                <div className="w-full h-full rounded-full bg-rich-black flex items-center justify-center text-gold font-bold text-4xl overflow-hidden">
                                    S
                                    {/* <img src="/path/to/avatar.jpg" className="w-full h-full object-cover" /> */}
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">Modifier l'avatar</p>
                        </div>

                        {/* Form Section */}
                        <form className="flex-1 space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-gold" /> Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gold" /> Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gold" /> Localisation
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gold/50 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="bg-gradient-gold text-rich-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                    <Save className="w-5 h-5" />
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
