import { motion } from 'framer-motion';
import {
    Music, Calendar, Image as ImageIcon, LayoutDashboard,
    Plus, Trash2, Edit2, Save, X
} from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('music');
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock Data (In a real app, this would come from a backend/context)
    const [songs, setSongs] = useState([
        { id: 1, title: 'Titre du Single', year: '2026', type: 'Single' },
        { id: 2, title: 'Album Précédent', year: '2025', type: 'Album' },
    ]);

    const [events, setEvents] = useState([
        { id: 1, date: '15 Mars', city: 'Paris', venue: "L'Olympia", status: 'available' },
        { id: 2, date: '20 Juin', city: 'Lyon', venue: 'Festival Summer Vibes', status: 'available' },
    ]);

    const tabs = [
        { id: 'music', label: 'Musique', icon: Music },
        { id: 'events', label: 'Événements', icon: Calendar },
        { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    ];

    const handleDelete = (type, id) => {
        if (type === 'music') setSongs(songs.filter(s => s.id !== id));
        if (type === 'events') setEvents(events.filter(e => e.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <LayoutDashboard className="w-8 h-8 text-gold" />
                        <h1 className="text-3xl font-outfit font-bold text-gradient">Tableau de Bord</h1>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1 space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                                ? 'bg-gradient-gold text-rich-black font-bold shadow-lg shadow-gold/20'
                                                : 'glass text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            <div className="glass-dark p-6 rounded-2xl border border-white/10 min-h-[500px]">

                                {/* Header of Content Area */}
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold font-outfit capitalize">Gestion {activeTab === 'music' ? 'Musique' : activeTab === 'events' ? 'Concerts' : 'Galerie'}</h2>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="flex items-center gap-2 bg-white/10 hover:bg-gold hover:text-rich-black text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        <Plus className="w-4 h-4" /> Ajouter
                                    </button>
                                </div>

                                {/* Content: Music */}
                                {activeTab === 'music' && (
                                    <div className="space-y-4">
                                        {songs.map((song) => (
                                            <div key={song.id} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                                                        <Music className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white">{song.title}</h3>
                                                        <p className="text-sm text-gray-400">{song.type} • {song.year}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete('music', song.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Content: Events */}
                                {activeTab === 'events' && (
                                    <div className="space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className="text-center min-w-[60px]">
                                                        <div className="font-bold text-lg text-gold">{event.date.split(' ')[0]}</div>
                                                        <div className="text-xs text-gray-400 uppercase">{event.date.split(' ')[1]}</div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white">{event.city}</h3>
                                                        <p className="text-sm text-gray-400">{event.venue}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete('events', event.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Content: Gallery (Placeholder) */}
                                {activeTab === 'gallery' && (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                        <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                                        <p>Gestion de la galerie bientôt disponible...</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Simulation Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass-dark p-8 rounded-2xl w-full max-w-md border border-white/10 relative">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        <h3 className="text-xl font-bold mb-4">Ajouter un élément</h3>
                        <p className="text-gray-400 mb-6">Fonctionnalité de démonstration. Dans une application réelle, un formulaire complet s'afficherait ici.</p>
                        <button onClick={() => setShowAddModal(false)} className="w-full bg-gradient-gold text-rich-black font-bold py-3 rounded-lg">Compris</button>
                    </div>
                </div>
            )}
        </div>
    );
}
