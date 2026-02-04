import { motion } from 'framer-motion';
import {
    Music, Calendar, Image as ImageIcon, LayoutDashboard,
    Plus, Trash2, Edit2, Save, X, Upload, FileAudio, Download
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('music');
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null; // Prevent flash of content

    const [songs, setSongs] = useState([]);
    const [events, setEvents] = useState([]);
    const [gallery, setGallery] = useState([]);

    // Temporary state for file uploads in modal
    const [previewImage, setPreviewImage] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const [s, e, g] = await Promise.all([
                dataService.getSongs(),
                dataService.getEvents(),
                dataService.getGallery()
            ]);
            setSongs(s);
            setEvents(e);
            setGallery(g);
        };
        loadData();
    }, []);

    const handleDelete = async (type, id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            if (type === 'music') setSongs(await dataService.deleteSong(id));
            if (type === 'events') setEvents(await dataService.deleteEvent(id));
            if (type === 'gallery') setGallery(await dataService.deleteGalleryItem(id));
        }
    };

    const handleExport = async () => {
        try {
            await dataService.exportAllData();
            alert('✅ Données exportées avec succès!\n\nEnvoyez le fichier JSON téléchargé pour l\'intégrer dans le site.');
        } catch (error) {
            console.error('Export error:', error);
            alert('❌ Erreur lors de l\'export des données.');
        }
    };

    const openModal = (item = null) => {
        setCurrentItem(item);
        // Reset previews based on item if it exists
        if (item) {
            if (activeTab === 'gallery') setPreviewImage(item.url);
            if (activeTab === 'events') setPreviewImage(item.image);
            if (activeTab === 'music') {
                setPreviewImage(item.cover);
                setPreviewAudio(item.audio); // Assuming audio stores the name or base64
            }
        } else {
            setPreviewImage(null);
            setPreviewAudio(null);
        }
        setShowModal(true);
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.85)); // Compress to JPEG with 85% quality (High Quality)
                };
            };
        });
    };

    const handleFileChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'audio') {
            // Audio limit check (keep at 5MB or increase slightly if needed, but LS is limited)
            if (file.size > 15 * 1024 * 1024) {
                alert("Le fichier audio est trop volumineux (max 15Mo). Pour les fichiers plus lourds (ex: 20Mo), il est préférable d'utiliser un lien externe (SoundCloud, Dropbox...) pour ne pas ralentir le site.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setPreviewAudio(reader.result);
            reader.readAsDataURL(file);
        } else if (type === 'image') {
            try {
                // Compress image
                const uniqueCompressedImage = await compressImage(file);
                setPreviewImage(uniqueCompressedImage);
            } catch (err) {
                console.error("Erreur compression image", err);
                alert("Erreur lors du traitement de l'image.");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (currentItem) data.id = currentItem.id;

        // Inject file data from state if available
        // Inject file data from state if available
        if (activeTab === 'gallery') data.image = previewImage || data.image; // Map to 'image' for consistency
        if (activeTab === 'events') data.image = previewImage;
        if (activeTab === 'music') {
            data.cover = previewImage;
            data.audioUrl = previewAudio; // Map to 'audioUrl'
        }

        try {
            if (activeTab === 'music') setSongs(await dataService.saveSong(data));
            if (activeTab === 'events') setEvents(await dataService.saveEvent(data));
            if (activeTab === 'gallery') setGallery(await dataService.saveGalleryItem(data));

            setShowModal(false);
            setCurrentItem(null);
            setPreviewImage(null);
            setPreviewAudio(null);
        } catch (error) {
            console.error("Save error:", error);
            alert("Une erreur est survenue lors de la sauvegarde.");
        }
    };

    const tabs = [
        { id: 'music', label: 'Musique', icon: Music },
        { id: 'events', label: 'Événements', icon: Calendar },
        { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-8">
                        <LayoutDashboard className="w-8 h-8 text-gold" />
                        <h1 className="text-3xl font-outfit font-bold text-gradient">Tableau de Bord</h1>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
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

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="glass-dark p-6 rounded-2xl border border-white/10 min-h-[500px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold font-outfit capitalize">
                                        Gestion {activeTab === 'music' ? 'Musique' : activeTab === 'events' ? 'Concerts' : 'Galerie'}
                                    </h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleExport}
                                            className="flex items-center gap-2 bg-white/10 hover:bg-blue-500 hover:text-white text-gray-300 px-4 py-2 rounded-lg transition-colors font-medium"
                                            title="Exporter toutes les données"
                                        >
                                            <Download className="w-4 h-4" /> Exporter
                                        </button>
                                        <button
                                            onClick={() => openModal()}
                                            className="flex items-center gap-2 bg-white/10 hover:bg-gold hover:text-rich-black text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                        >
                                            <Plus className="w-4 h-4" /> Ajouter
                                        </button>
                                    </div>
                                </div>

                                {/* Music List */}
                                {activeTab === 'music' && (
                                    <div className="space-y-4">
                                        {songs.map((song) => (
                                            <div key={song.id} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center overflow-hidden">
                                                        {song.cover ? (
                                                            <img src={song.cover} alt="Cover" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Music className="w-5 h-5 text-gold" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white">{song.title}</h3>
                                                        <p className="text-sm text-gray-400">{song.type} • {song.year}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {song.audioUrl && <FileAudio className="w-4 h-4 text-green-400" title="Audio présent" />}
                                                    <button onClick={() => openModal(song)} className="p-2 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete('music', song.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                        {songs.length === 0 && <p className="text-gray-400 text-center py-8">Aucune musique trouvée.</p>}
                                    </div>
                                )}

                                {/* Events List */}
                                {activeTab === 'events' && (
                                    <div className="space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    {event.image && (
                                                        <img src={event.image} alt="Event" className="w-16 h-16 rounded-lg object-cover" />
                                                    )}
                                                    <div className="text-center min-w-[60px]">
                                                        <div className="font-bold text-lg text-gold">{event.date}</div>
                                                        <div className="text-xs text-green-400 uppercase">{event.status}</div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white">{event.city}</h3>
                                                        <p className="text-sm text-gray-400">{event.venue}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => openModal(event)} className="p-2 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete('events', event.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                        {events.length === 0 && <p className="text-gray-400 text-center py-8">Aucun événement trouvé.</p>}
                                    </div>
                                )}

                                {/* Gallery List */}
                                {activeTab === 'gallery' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {gallery.map((item) => (
                                            <div key={item.id} className="glass p-2 rounded-xl relative group">
                                                <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-xl">
                                                    <button onClick={() => openModal(item)} className="p-2 bg-white/10 rounded-full hover:bg-gold hover:text-rich-black transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete('gallery', item.id)} className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2 truncate">{item.title}</p>
                                            </div>
                                        ))}
                                        {gallery.length === 0 && (
                                            <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-400">
                                                <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                                                <p>Aucune image dans la galerie.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                    <div className="glass-dark p-8 rounded-2xl w-full max-w-md border border-white/10 relative my-8">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        <h3 className="text-xl font-bold mb-6">
                            {currentItem ? 'Modifier' : 'Ajouter'} {activeTab === 'music' ? 'Musique' : activeTab === 'events' ? 'Concert' : 'Image'}
                        </h3>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* MUSIC FORM */}
                            {activeTab === 'music' && (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Titre</label>
                                        <input name="title" required defaultValue={currentItem?.title} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                                        <textarea name="description" rows="3" defaultValue={currentItem?.description} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Type</label>
                                            <select name="type" defaultValue={currentItem?.type || 'Single'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors">
                                                <option value="Single">Single</option>
                                                <option value="Album">Album</option>
                                                <option value="EP">EP</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Année</label>
                                            <input name="year" required defaultValue={currentItem?.year} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Pochette (Image)</label>
                                        <div className="flex items-center gap-4">
                                            {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 rounded object-cover border border-white/10" />}
                                            <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-sm">
                                                <Upload className="w-4 h-4" /> Choisir une image
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Fichier Audio (MP3)</label>
                                        <div className="flex items-center gap-4">
                                            {previewAudio && <div className="text-green-400 text-xs flex items-center gap-1"><FileAudio className="w-3 h-3" /> Audio sélectionné</div>}
                                            <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-sm">
                                                <Upload className="w-4 h-4" /> Choisir fichier audio
                                                <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileChange(e, 'audio')} />
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* EVENTS FORM */}
                            {activeTab === 'events' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Titre de l'événement</label>
                                            <input name="title" required defaultValue={currentItem?.title} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Date</label>
                                            <input name="date" required type="date" defaultValue={currentItem?.date} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Heure</label>
                                            <input name="time" type="time" required defaultValue={currentItem?.time} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Statut</label>
                                            <select name="status" defaultValue={currentItem?.status || 'available'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors">
                                                <option value="available">Disponible</option>
                                                <option value="sold-out">Complet</option>
                                                <option value="past">Passé</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Lieu (Salle)</label>
                                        <input name="venue" required defaultValue={currentItem?.venue} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Ville</label>
                                        <input name="city" required defaultValue={currentItem?.city} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Pays</label>
                                        <input name="country" required defaultValue={currentItem?.country || 'France'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Lien Billetterie</label>
                                        <input name="ticketUrl" defaultValue={currentItem?.ticketUrl} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                                        <textarea name="description" rows="3" defaultValue={currentItem?.description} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Image de l'événement</label>
                                        <div className="flex items-center gap-4">
                                            {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 rounded object-cover border border-white/10" />}
                                            <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-sm">
                                                <Upload className="w-4 h-4" /> Choisir une image
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* GALLERY FORM */}
                            {activeTab === 'gallery' && (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Image</label>
                                        <div className="flex flex-col gap-4">
                                            {previewImage && <img src={previewImage} alt="Preview" className="w-full h-40 rounded-lg object-cover border border-white/10" />}

                                            <div className="flex gap-2">
                                                <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg transition-colors text-sm border border-dashed border-white/20">
                                                    <Upload className="w-4 h-4" /> Uploader une image
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
                                                </label>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10"></div>
                                                <span className="relative z-10 bg-[#0a0a0a] px-2 text-xs text-gray-500 mx-auto block w-fit">OU UTILISER UNE URL</span>
                                            </div>

                                            <input name="image" placeholder="https://..." defaultValue={!previewImage?.startsWith('data:') ? currentItem?.image : ''} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Titre</label>
                                        <input name="title" required defaultValue={currentItem?.title} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
                                            <select name="category" defaultValue={currentItem?.category || 'concerts'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors">
                                                <option value="concerts">Concerts</option>
                                                <option value="studio">Studio</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Année</label>
                                            <input name="date" required defaultValue={currentItem?.date} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none transition-colors" />
                                        </div>
                                    </div>
                                </>
                            )}

                            <button type="submit" className="w-full bg-gradient-gold text-rich-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-4 hover:opacity-90 transition-opacity">
                                <Save className="w-4 h-4" /> Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
