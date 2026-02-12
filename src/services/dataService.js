import { supabaseService } from './supabaseService';

/**
 * Service de données - Interface unifiée pour la gestion des données
 * Utilise maintenant Supabase pour le stockage cloud au lieu d'IndexedDB
 */
export const dataService = {
    // ========== MUSIQUE ==========
    getSongs: async () => {
        return supabaseService.getSongs();
    },

    saveSong: async (song) => {
        return supabaseService.saveSong(song);
    },

    deleteSong: async (id) => {
        return supabaseService.deleteSong(id);
    },

    incrementSongListeners: async (id) => {
        return supabaseService.incrementSongListeners(id);
    },

    // ========== ÉVÉNEMENTS ==========
    getEvents: async () => {
        return supabaseService.getEvents();
    },

    saveEvent: async (event) => {
        return supabaseService.saveEvent(event);
    },

    deleteEvent: async (id) => {
        return supabaseService.deleteEvent(id);
    },

    // ========== GALERIE ==========
    getGallery: async () => {
        return supabaseService.getGallery();
    },

    saveGalleryItem: async (item) => {
        return supabaseService.saveGalleryItem(item);
    },

    deleteGalleryItem: async (id) => {
        return supabaseService.deleteGalleryItem(id);
    },

    // ========== EXPORT ==========
    exportAllData: async () => {
        return supabaseService.exportAllData();
    }
};
