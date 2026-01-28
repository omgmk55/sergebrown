import { motion } from 'framer-motion';
import { Play, Music2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-rich-black via-dark-gray to-rich-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-outfit font-black mb-6">
                            <span className="text-gradient">SERGE</span>
                            <br />
                            <span className="text-off-white">BROWN</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 font-light"
                        >
                            Artiste | Chanteur | Auteur-Compositeur
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                to="/music"
                                className="group flex items-center space-x-2 bg-gradient-gold text-rich-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300"
                            >
                                <Play className="w-5 h-5" fill="currentColor" />
                                <span>Écouter maintenant</span>
                            </Link>

                            <Link
                                to="/contact"
                                className="glass px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
                            >
                                Me contacter
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Latest Release Preview */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gray/50">
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

                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
                            {/* Album Art */}
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
                                        <Link to="/music" className="bg-gradient-gold text-rich-black p-6 rounded-full hover:scale-110 transition-transform">
                                            <Play className="w-12 h-12" fill="currentColor" />
                                        </Link>
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
                                </p>

                                <Link
                                    to="/music"
                                    className="inline-block glass px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
                                >
                                    Voir toute la discographie →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events Preview */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                    >
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-outfit mb-4">
                                <span className="text-gradient">En Tournée</span>
                            </h2>
                            <p className="text-xl text-gray-400">Retrouvez-moi sur scène prochainement</p>
                        </div>
                        <Link to="/events" className="text-gold hover:text-white transition-colors font-semibold flex items-center gap-2">
                            Voir toutes les dates <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    <div className="grid gap-6">
                        {[
                            {
                                date: '15 Mars',
                                city: 'Paris',
                                venue: 'L\'Olympia',
                                status: 'available'
                            },
                            {
                                date: '20 Juin',
                                city: 'Lyon',
                                venue: 'Festival Summer Vibes',
                                status: 'available'
                            },
                            {
                                date: '10 Sept',
                                city: 'Bruxelles',
                                venue: 'Ancienne Belgique',
                                status: 'sold-out'
                            }
                        ].map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-dark p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-8 w-full md:w-auto">
                                    <div className="text-2xl font-bold font-outfit text-white min-w-[100px]">{event.date}</div>
                                    <div className="flex-1">
                                        <div className="text-xl font-bold mb-1 group-hover:text-gold transition-colors">{event.city}</div>
                                        <div className="text-gray-400">{event.venue}</div>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto">
                                    {event.status === 'available' ? (
                                        <Link to="/events" className="block w-full md:w-auto text-center bg-white/10 hover:bg-gold hover:text-rich-black px-6 py-3 rounded-lg font-semibold transition-all">
                                            Réserver
                                        </Link>
                                    ) : (
                                        <span className="block w-full md:w-auto text-center text-gray-500 font-semibold px-6 py-3 border border-white/5 rounded-lg">
                                            Complet
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Gallery Preview */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gray/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-outfit mb-4">
                            <span className="text-gradient">Derniers Visuels</span>
                        </h2>
                        <p className="text-xl text-gray-400">Instants volés sur scène et en studio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="aspect-square glass rounded-2xl overflow-hidden relative group"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}gallery/${index === 0 ? 'concert1.png' : index === 1 ? 'studio1.png' : 'concert2.png'}`}
                                    alt="Gallery preview"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link to="/gallery" className="glass px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                                        Voir la galerie
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-dark p-8 md:p-12 rounded-3xl text-center bg-gradient-to-br from-gold/10 to-transparent border border-gold/20">
                        <h2 className="text-3xl sm:text-4xl font-outfit font-bold mb-4">Rejoignez la Famille</h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            Inscrivez-vous pour recevoir en avant-première les nouvelles sorties, les dates de concert et des contenus exclusifs.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 glass px-6 py-4 rounded-xl bg-black/20 focus:outline-none focus:border-gold border border-white/10 text-white placeholder-gray-500"
                            />
                            <button className="bg-gradient-gold text-rich-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
