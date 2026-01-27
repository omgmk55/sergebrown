import { motion } from 'framer-motion';
import { Music2, ExternalLink } from 'lucide-react';

export default function LatestRelease() {
    const streamingPlatforms = [
        { name: 'Spotify', url: '#', color: '#1DB954' },
        { name: 'Apple Music', url: '#', color: '#FA243C' },
        { name: 'YouTube', url: '#', color: '#FF0000' },
        { name: 'Deezer', url: '#', color: '#FEAA2D' },
    ];

    return (
        <section id="music" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gray/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-outfit mb-4">
                            <span className="text-gradient">Dernière Sortie</span>
                        </h2>
                        <p className="text-xl text-gray-400">Découvrez mon nouveau son</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Album Art Placeholder */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative group"
                        >
                            <div className="aspect-square glass-dark rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Music2 className="w-32 h-32 text-gold/50" />
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="bg-gradient-gold text-rich-black p-6 rounded-full hover:scale-110 transition-transform">
                                        <Music2 className="w-12 h-12" fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Release Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl sm:text-4xl font-outfit font-bold mb-2">Titre du Single</h3>
                                <p className="text-xl text-gray-400">2026</p>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                Un nouveau titre qui capture l'essence de mon univers musical.
                                Disponible sur toutes les plateformes de streaming.
                            </p>

                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gold uppercase tracking-wider">
                                    Écouter sur
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {streamingPlatforms.map((platform) => (
                                        <a
                                            key={platform.name}
                                            href={platform.url}
                                            className="glass flex items-center justify-between p-4 rounded-lg hover:bg-white/10 transition-colors group"
                                        >
                                            <span className="font-medium">{platform.name}</span>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
