import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <button className="group flex items-center space-x-2 bg-gradient-gold text-rich-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
                            <Play className="w-5 h-5" fill="currentColor" />
                            <span>Écouter maintenant</span>
                        </button>

                        <a
                            href="#contact"
                            className="glass px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            Me contacter
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
