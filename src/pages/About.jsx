import { motion } from 'framer-motion';
import { User, Award, Heart, Music } from 'lucide-react';

export default function About() {
    const stats = [
        { icon: Music, label: 'Albums', value: '3+' },
        { icon: Award, label: "Années d'expérience", value: '5+' },
        { icon: Heart, label: 'Fans', value: '10K+' },
    ];

    const journey = [
        {
            year: '2024',
            title: 'Premiers Pas',
            description: 'Sortie de mon premier EP qui marque le début de mon parcours musical professionnel.'
        },
        {
            year: '2025',
            title: 'Premier Album',
            description: 'Lancement de mon premier album complet avec 12 titres originaux.'
        },
        {
            year: '2026',
            title: 'Nouveau Chapitre',
            description: 'Exploration de nouveaux sons et collaborations avec des artistes internationaux.'
        },
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
                        <span className="text-gradient">À Propos</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Découvrez mon histoire, mon univers musical et ma passion pour la création.
                    </p>
                </motion.div>

                {/* Main Bio Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-12 items-center mb-20"
                >
                    {/* Image */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                    >
                        <div className="aspect-square glass-dark rounded-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                            <img
                                src="/serge-brown.png"
                                alt="Serge Brown"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-gold rounded-full blur-3xl opacity-30" />
                    </motion.div>

                    {/* Bio Text */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-outfit font-bold mb-4">Serge Brown</h2>
                            <div className="w-20 h-1 bg-gradient-gold rounded-full mb-6" />
                        </div>

                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                Serge Brown est un artiste passionné qui fusionne les genres
                                pour créer une expérience musicale unique et captivante.
                            </p>
                            <p>
                                Avec une voix distinctive et des compositions originales,
                                il transporte son public dans un voyage émotionnel à travers
                                chaque performance. Son style authentique reflète ses racines
                                tout en embrassant l'innovation musicale contemporaine.
                            </p>
                            <p>
                                Inspiré par les grands noms de la Soul, du R&B et de l'Afrobeat,
                                Serge Brown crée une signature sonore qui lui est propre,
                                mêlant rythmes envoûtants et mélodies inoubliables.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                            {['Soul', 'R&B', 'Afrobeat', 'Pop'].map((genre) => (
                                <span
                                    key={genre}
                                    className="glass px-4 py-2 rounded-full text-sm font-medium text-gold border-gold/30"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="glass-dark p-8 rounded-2xl text-center"
                            >
                                <Icon className="w-12 h-12 text-gold mx-auto mb-4" />
                                <div className="text-4xl font-outfit font-bold text-gradient mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Musical Journey */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-outfit font-bold mb-8 text-center">Mon Parcours</h2>

                    <div className="max-w-3xl mx-auto space-y-8">
                        {journey.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 glass-dark rounded-full flex items-center justify-center border-2 border-gold">
                                        <span className="text-gold font-bold">{milestone.year}</span>
                                    </div>
                                </div>
                                <div className="glass-dark p-6 rounded-xl flex-1">
                                    <h3 className="text-2xl font-outfit font-bold mb-2">{milestone.title}</h3>
                                    <p className="text-gray-300">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Press & Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-outfit font-bold mb-12 text-center text-gold">Ils en parlent</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                quote: "Une voix qui captive dès la première note. Serge Brown est la révélation Soul de l'année.",
                                author: "Music Vibes Magazine",
                                role: "Critique Musical"
                            },
                            {
                                quote: "Un mélange audacieux de tradition et de modernité. Ses concerts sont une expérience spirituelle.",
                                author: "Le Nouvel Son",
                                role: "Journaliste Culture"
                            }
                        ].map((review, index) => (
                            <div key={index} className="glass p-8 rounded-xl relative group hover:bg-white/5 transition-colors">
                                <span className="absolute top-4 left-6 text-6xl text-gold/20 font-serif">"</span>
                                <p className="text-lg text-gray-300 italic mb-6 relative z-10">{review.quote}</p>
                                <div>
                                    <div className="font-bold text-white">{review.author}</div>
                                    <div className="text-sm text-gold">{review.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Influences */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-outfit font-bold mb-4">Mes Influences</h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Ces légendes ont façonné mon identité musicale et continuent de m'inspirer chaque jour.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        {['Marvin Gaye', 'Fela Kuti', 'Prince', 'Michael Jackson', 'Sade'].map((artist, index) => (
                            <motion.div
                                key={artist}
                                whileHover={{ scale: 1.1, color: '#d4af37' }}
                                className="text-xl md:text-2xl font-bold text-gray-500 cursor-default transition-colors"
                            >
                                {artist}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
