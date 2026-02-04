const STORAGE_KEYS = {
    SONGS: 'sb_songs',
    EVENTS: 'sb_events',
    GALLERY: 'sb_gallery'
};

const DEFAULT_DATA = {
    songs: [
        {
            id: 1,
            title: 'Titre du Single',
            year: '2026',
            type: 'Single',
            description: 'Mon dernier single qui mélange des sonorités modernes avec des influences traditionnelles.',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
            id: 2,
            title: 'Album Précédent',
            year: '2025',
            type: 'Album',
            description: 'Un projet complet qui explore différentes facettes de mon univers musical.',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
            id: 3,
            title: 'Premier EP',
            year: '2024',
            type: 'EP',
            description: 'Mes premiers pas dans l\'industrie musicale avec 5 titres originaux.',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
    ],
    events: [
        {
            id: 1,
            title: 'Concert Live Paris',
            venue: 'Olympia',
            city: 'Paris',
            country: 'France',
            date: '2026-03-15',
            time: '20:00',
            status: 'available',
            ticketUrl: '#',
            description: 'Un concert exceptionnel dans la salle mythique de l\'Olympia'
        },
        {
            id: 2,
            title: 'Festival Summer Vibes',
            venue: 'Parc des Expositions',
            city: 'Lyon',
            country: 'France',
            date: '2026-06-20',
            time: '18:30',
            status: 'available',
            ticketUrl: '#',
            description: 'Performance au grand festival d\'été'
        },
        {
            id: 3,
            title: 'Tournée Européenne',
            venue: 'Ancienne Belgique',
            city: 'Bruxelles',
            country: 'Belgique',
            date: '2026-09-10',
            time: '21:00',
            status: 'sold-out',
            ticketUrl: '#',
            description: 'Date complète - Liste d\'attente disponible'
        },
    ],
    gallery: [
        {
            id: 1,
            type: 'image',
            category: 'concerts',
            title: 'Concert Live - The Apollo',
            date: '2026',
            image: `${import.meta.env.BASE_URL}gallery/concert1.png`
        },
        {
            id: 2,
            type: 'image',
            category: 'studio',
            title: 'Session Studio',
            date: '2025',
            image: `${import.meta.env.BASE_URL}gallery/studio1.png`
        },
        {
            id: 3,
            type: 'image',
            category: 'concerts',
            title: 'Aurora Festival',
            date: '2025',
            image: `${import.meta.env.BASE_URL}gallery/concert2.png`
        },
        {
            id: 4,
            type: 'image',
            category: 'studio',
            title: 'Behind the Scenes',
            date: '2025',
            image: `${import.meta.env.BASE_URL}gallery/studio2.png`
        },
        {
            id: 5,
            type: 'image',
            category: 'concerts',
            title: 'Festival Sunset',
            date: '2026',
            image: `${import.meta.env.BASE_URL}gallery/concert3.png`
        },
        {
            id: 6,
            type: 'image',
            category: 'concerts',
            title: 'Portrait Artistique',
            date: '2026',
            image: `${import.meta.env.BASE_URL}gallery/portrait1.png`
        },
    ]
};

// Helper to get data or default
const get = (key, defaultVal) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

// Helper to save data
const set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const dataService = {
    // MUSIC
    getSongs: () => get(STORAGE_KEYS.SONGS, DEFAULT_DATA.songs),
    saveSong: (song) => {
        const songs = get(STORAGE_KEYS.SONGS, DEFAULT_DATA.songs);
        if (song.id) {
            const index = songs.findIndex(s => s.id === song.id);
            if (index !== -1) songs[index] = song;
        } else {
            song.id = Date.now();
            songs.push(song);
        }
        set(STORAGE_KEYS.SONGS, songs);
        return songs;
    },
    deleteSong: (id) => {
        const songs = get(STORAGE_KEYS.SONGS, DEFAULT_DATA.songs);
        const newSongs = songs.filter(s => s.id !== id);
        set(STORAGE_KEYS.SONGS, newSongs);
        return newSongs;
    },

    // EVENTS
    getEvents: () => get(STORAGE_KEYS.EVENTS, DEFAULT_DATA.events),
    saveEvent: (event) => {
        const events = get(STORAGE_KEYS.EVENTS, DEFAULT_DATA.events);
        if (event.id) {
            const index = events.findIndex(e => e.id === event.id);
            if (index !== -1) events[index] = event;
        } else {
            event.id = Date.now();
            events.push(event);
        }
        set(STORAGE_KEYS.EVENTS, events);
        return events;
    },
    deleteEvent: (id) => {
        const events = get(STORAGE_KEYS.EVENTS, DEFAULT_DATA.events);
        const newEvents = events.filter(e => e.id !== id);
        set(STORAGE_KEYS.EVENTS, newEvents);
        return newEvents;
    },

    // GALLERY
    getGallery: () => get(STORAGE_KEYS.GALLERY, DEFAULT_DATA.gallery),
    saveGalleryItem: (item) => {
        const gallery = get(STORAGE_KEYS.GALLERY, DEFAULT_DATA.gallery);
        if (item.id) {
            const index = gallery.findIndex(g => g.id === item.id);
            if (index !== -1) gallery[index] = item;
        } else {
            item.id = Date.now();
            gallery.push(item);
        }
        set(STORAGE_KEYS.GALLERY, gallery);
        return gallery;
    },
    deleteGalleryItem: (id) => {
        const gallery = get(STORAGE_KEYS.GALLERY, DEFAULT_DATA.gallery);
        const newGallery = gallery.filter(g => g.id !== id);
        set(STORAGE_KEYS.GALLERY, newGallery);
        return newGallery;
    }
};
