import { dataService } from '../services/dataService';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink, Play } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function Music() {
    const { playTrack } = useAudio();
    const [counts, setCounts] = useState({ 0: 1254, 1: 856, 2: 3421, 3: 982 }); // Mock initial counts
    const [discography, setDiscography] = useState(dataService.getSongs());

    const handlePlay = (track, id) => {
        playTrack(track);
        setCounts(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const streamingPlatforms = [
        { name: 'Spotify', url: '#', color: '#1DB954' },
        { name: 'Apple Music', url: '#', color: '#FA243C' },
        { name: 'YouTube', url: '#', color: '#FF0000' },
        { name: 'Deezer', url: '#', color: '#FEAA2D' },
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
                        <span className="text-gradient">Ma Musique</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Découvrez l'ensemble de mon travail musical, disponible sur toutes les plateformes de streaming.
                    </p>
                </motion.div>

                {/* Latest Release - Featured */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-outfit font-bold mb-8 text-gold">Dernière Sortie</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center glass-dark p-8 rounded-2xl">
                        {/* Album Art */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative group"
                        >
                            <div className="aspect-square glass rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Music2 className="w-40 h-40 text-gold/50" />
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => handlePlay(discography[0], 0)}
                                        className="bg-gradient-gold text-rich-black p-6 rounded-full hover:scale-110 transition-transform"
                                    >
                                        <Play className="w-12 h-12" fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Release Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-4xl font-outfit font-bold mb-2">Titre du Single</h3>
                                <p className="text-xl text-gray-400">2026 • Single</p>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                Un nouveau titre qui capture l'essence de mon univers musical.
                                Disponible sur toutes les plateformes de streaming.
                            </p>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handlePlay(discography[0], 0)}
                                    className="bg-gradient-gold text-rich-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 w-fit"
                                >
                                    <Play className="w-5 h-5" fill="currentColor" />
                                    <span>Écouter un extrait</span>
                                </button>
                                <span className="text-sm text-gray-400 ml-4">
                                    {counts[0]?.toLocaleString()} écoutes
                                </span>
                            </div>

                            <div className="space-y-3 pt-4">
                                <p className="text-sm font-semibold text-gold uppercase tracking-wider">
                                    Écouter en entier sur
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

                {/* Discography */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl font-outfit font-bold mb-8">Discographie</h2>

                    <div className="grid gap-6">
                        {discography.map((release, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ x: 10 }}
                                className="glass-dark p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 glass rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Music2 className="w-10 h-10 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-outfit font-bold mb-1">{release.title}</h3>
                                        <p className="text-gray-400">{release.year} • {release.type}</p>
                                        <p className="text-gray-300 mt-2">{release.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => handlePlay(release, release.id)}
                                        className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 group"
                                    >
                                        <Play className="w-4 h-4 group-hover:text-gold transition-colors" fill="currentColor" />
                                        <span>Écouter</span>
                                    </button>
                                    <span className="text-xs text-gray-500">
                                        {(counts[release.id] || 0).toLocaleString()} écoutes
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
