import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Play, Image as ImageIcon, Video, Camera, Mic } from 'lucide-react';

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        dataService.getGallery().then(setGalleryItems);
    }, []);

    const categories = [
        { id: 'all', name: 'Tout', icon: ImageIcon },
        { id: 'concerts', name: 'Concerts', icon: Mic },
        { id: 'studio', name: 'Studio', icon: Camera },
    ];

    const filteredItems = selectedCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit mb-6">
                        <span className="text-gradient">Galerie</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Découvrez mon univers à travers des photos de concerts et sessions studio.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-gradient-gold text-rich-black scale-105'
                                    : 'glass text-off-white hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{category.name}</span>
                                <span className="text-sm opacity-75">
                                    ({category.id === 'all' ? galleryItems.length : galleryItems.filter(i => i.category === category.id).length})
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setLightboxImage(item)}
                                className="relative aspect-square glass-dark rounded-2xl overflow-hidden cursor-pointer group"
                            >
                                {/* Real Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-gradient-gold text-rich-black p-4 rounded-full">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="font-outfit font-bold text-lg mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <ImageIcon className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-400">Aucun élément dans cette catégorie</p>
                    </motion.div>
                )}

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {lightboxImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightboxImage(null)}
                            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        >
                            <button
                                onClick={() => setLightboxImage(null)}
                                className="absolute top-4 right-4 text-white hover:text-gold transition-colors p-2 z-10"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                            >
                                <img
                                    src={lightboxImage.image}
                                    alt={lightboxImage.title}
                                    className="max-w-full max-h-[90vh] object-contain rounded-2xl"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                                    <h2 className="text-3xl font-outfit font-bold mb-2">{lightboxImage.title}</h2>
                                    <p className="text-gray-400">{lightboxImage.date}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
