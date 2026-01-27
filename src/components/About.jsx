import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Image */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                    >
                        <div className="aspect-square glass-dark rounded-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <User className="w-48 h-48 text-gold/30" />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-gold rounded-full blur-3xl opacity-30" />
                    </motion.div>

                    {/* Bio */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-outfit mb-4">
                                <span className="text-gradient">À Propos</span>
                            </h2>
                            <div className="w-20 h-1 bg-gradient-gold rounded-full" />
                        </div>

                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                Serge Brown est un artiste passionné qui fusionne les genres
                                pour créer une expérience musicale unique et captivante.
                            </p>
                            <p>
                                Avec une voix distinctive et des compositions originales,
                                il transporte son public dans un voyage émotionnel à travers
                                chaque performance.
                            </p>
                            <p>
                                Son style musical mélange des influences diverses, créant
                                une signature sonore authentique et mémorable.
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
            </div>
        </section>
    );
}
