import { motion } from 'framer-motion';
import { Download, Star, MessageCircle, Heart, Lock } from 'lucide-react';

export default function FanZone() {
    const exclusiveOldies = [
        { title: 'Fond d\'écran 4K - Tournée 2026', type: 'Image', size: '4.2 MB' },
        { title: 'Sonnerie "Midnight Soul"', type: 'Audio', size: '1.2 MB' },
        { title: 'Acoustique Inédite - "Echoes"', type: 'Audio', size: '8.5 MB' },
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
                    <div className="inline-flex items-center gap-2 bg-gradient-gold/20 text-gold px-4 py-2 rounded-full mb-6 border border-gold/30">
                        <Star className="w-4 h-4" fill="currentColor" />
                        <span className="font-bold tracking-wider text-sm">ESPACE MEMBRE EXCLUSIF</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit mb-6">
                        <span className="text-gradient">Fan Zone</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Bienvenue dans le cercle privé. Profitez de contenus inédits réservés à la famille Serge Brown.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Exclusive Downloads */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-dark p-8 rounded-2xl border border-gold/10 lg:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Download className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-outfit font-bold">Téléchargements Exclusifs</h2>
                        </div>

                        <div className="grid gap-4">
                            {exclusiveOldies.map((item, index) => (
                                <div key={index} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.type} • {item.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-gold hover:text-white transition-colors bg-gold/10 hover:bg-gold/20 p-2 rounded-lg">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Poll / Interaction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-dark p-8 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <MessageCircle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-outfit font-bold">Votre Avis</h2>
                        </div>

                        <p className="text-gray-300 mb-6">Quelle cover aimeriez-vous entendre lors du prochain concert live ?</p>

                        <div className="space-y-3">
                            {['Purple Rain (Prince)', 'No Woman No Cry (Marley)', 'Human Nature (MJ)'].map((option, idx) => (
                                <label key={idx} className="flex items-center gap-3 p-3 glass rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                                    <input type="radio" name="poll" className="accent-gold w-5 h-5" />
                                    <span className="text-white font-medium">{option}</span>
                                </label>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-gradient-gold text-rich-black font-bold py-3 rounded-xl hover:scale-105 transition-transform">
                            Voter
                        </button>
                    </motion.div>

                    {/* Personal Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-3 glass-dark p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-gold">
                                <img src="/serge-brown.png" alt="Serge" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <h3 className="text-xl font-bold font-outfit">Message de Serge</h3>
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            </div>
                            <p className="text-gray-300 italic text-lg leading-relaxed">
                                "Merci infiniment de faire partie de cette communauté. Votre soutien me donne la force de repousser mes limites tous les jours. J'ai hâte de vous retrouver sur la tournée 2026, on prépare des choses dingues !"
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
