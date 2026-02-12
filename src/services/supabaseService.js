import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des clés
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Configuration Supabase manquante !');
    console.error('Assurez-vous que le fichier .env.local contient :');
    console.error('- VITE_SUPABASE_URL');
    console.error('- VITE_SUPABASE_ANON_KEY');
}

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service Supabase pour gérer toutes les opérations de base de données
 */
export const supabaseService = {
    // ========== MUSIQUE ==========

    /**
     * Récupère toutes les chansons
     */
    async getSongs() {
        const { data, error } = await supabase
            .from('songs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération des chansons:', error);
            return [];
        }
        return data || [];
    },

    /**
     * Ajoute ou met à jour une chanson
     */
    async saveSong(song) {
        // Conversion des noms de champs pour correspondre au schéma DB
        const dbSong = {
            id: song.id,
            title: song.title,
            description: song.description || '',
            type: song.type || 'Single',
            year: song.year,
            cover: song.cover || '',
            audio_url: song.audioUrl || '',
            listeners: song.listeners || 0,
            updated_at: new Date().toISOString()
        };

        let result;
        if (song.id) {
            // Mise à jour
            result = await supabase
                .from('songs')
                .update(dbSong)
                .eq('id', song.id);
        } else {
            // Insertion
            delete dbSong.id; // Laisser Supabase générer l'ID
            result = await supabase
                .from('songs')
                .insert([dbSong])
                .select();
        }

        if (result.error) {
            console.error('Erreur lors de la sauvegarde de la chanson:', result.error);
            throw result.error;
        }

        return this.getSongs();
    },

    /**
     * Supprime une chanson
     */
    async deleteSong(id) {
        const { error } = await supabase
            .from('songs')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression de la chanson:', error);
            throw error;
        }

        return this.getSongs();
    },

    /**
     * Incrémente le compteur d'écoutes
     */
    async incrementSongListeners(id) {
        // Récupère la chanson actuelle
        const { data: song, error: fetchError } = await supabase
            .from('songs')
            .select('listeners')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Erreur lors de la récupération des écoutes:', fetchError);
            return 0;
        }

        const newListeners = (song?.listeners || 0) + 1;

        // Met à jour le compteur
        const { error: updateError } = await supabase
            .from('songs')
            .update({ listeners: newListeners })
            .eq('id', id);

        if (updateError) {
            console.error('Erreur lors de la mise à jour des écoutes:', updateError);
            return song?.listeners || 0;
        }

        return newListeners;
    },

    // ========== ÉVÉNEMENTS ==========

    /**
     * Récupère tous les événements
     */
    async getEvents() {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            return [];
        }
        return data || [];
    },

    /**
     * Ajoute ou met à jour un événement
     */
    async saveEvent(event) {
        const dbEvent = {
            id: event.id,
            title: event.title,
            date: event.date,
            time: event.time,
            status: event.status || 'available',
            venue: event.venue,
            city: event.city,
            country: event.country || 'France',
            ticket_url: event.ticketUrl || '',
            description: event.description || '',
            image: event.image || '',
            updated_at: new Date().toISOString()
        };

        let result;
        if (event.id) {
            // Mise à jour
            result = await supabase
                .from('events')
                .update(dbEvent)
                .eq('id', event.id);
        } else {
            // Insertion
            delete dbEvent.id;
            result = await supabase
                .from('events')
                .insert([dbEvent])
                .select();
        }

        if (result.error) {
            console.error('Erreur lors de la sauvegarde de l\'événement:', result.error);
            throw result.error;
        }

        return this.getEvents();
    },

    /**
     * Supprime un événement
     */
    async deleteEvent(id) {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression de l\'événement:', error);
            throw error;
        }

        return this.getEvents();
    },

    // ========== GALERIE ==========

    /**
     * Récupère toutes les images de la galerie
     */
    async getGallery() {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération de la galerie:', error);
            return [];
        }
        return data || [];
    },

    /**
     * Ajoute ou met à jour un élément de la galerie
     */
    async saveGalleryItem(item) {
        const dbItem = {
            id: item.id,
            title: item.title,
            image: item.image,
            category: item.category || 'concerts',
            date: item.date,
            updated_at: new Date().toISOString()
        };

        let result;
        if (item.id) {
            // Mise à jour
            result = await supabase
                .from('gallery')
                .update(dbItem)
                .eq('id', item.id);
        } else {
            // Insertion
            delete dbItem.id;
            result = await supabase
                .from('gallery')
                .insert([dbItem])
                .select();
        }

        if (result.error) {
            console.error('Erreur lors de la sauvegarde de l\'élément de galerie:', result.error);
            throw result.error;
        }

        return this.getGallery();
    },

    /**
     * Supprime un élément de la galerie
     */
    async deleteGalleryItem(id) {
        const { error } = await supabase
            .from('gallery')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression de l\'élément de galerie:', error);
            throw error;
        }

        return this.getGallery();
    },

    // ========== UTILITAIRES ==========

    /**
     * Exporte toutes les données
     */
    async exportAllData() {
        const [songs, events, gallery] = await Promise.all([
            this.getSongs(),
            this.getEvents(),
            this.getGallery()
        ]);

        return {
            songs,
            events,
            gallery,
            exportDate: new Date().toISOString()
        };
    }
};
