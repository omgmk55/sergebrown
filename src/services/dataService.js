import { getInitialData } from '../data/initialData';

const DB_NAME = 'SergeBrownDB';
const DB_VERSION = 2;
const STORES = {
    SONGS: 'songs',
    EVENTS: 'events',
    GALLERY: 'gallery'
};

const DEFAULT_DATA = getInitialData() || {
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

// IndexedDB Wrapper
const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => reject('Database error: ' + event.target.error);

    request.onsuccess = (event) => {
        resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        if (!db.objectStoreNames.contains(STORES.SONGS)) {
            const songStore = db.createObjectStore(STORES.SONGS, { keyPath: 'id' });
            // Seed default data
            DEFAULT_DATA.songs.forEach(song => songStore.add(song));
        }
        if (!db.objectStoreNames.contains(STORES.EVENTS)) {
            const eventStore = db.createObjectStore(STORES.EVENTS, { keyPath: 'id' });
            DEFAULT_DATA.events.forEach(event => eventStore.add(event));
        }
        if (!db.objectStoreNames.contains(STORES.GALLERY)) {
            const galleryStore = db.createObjectStore(STORES.GALLERY, { keyPath: 'id' });
            DEFAULT_DATA.gallery.forEach(item => galleryStore.add(item));
        }
    };
});

const getParams = (storeName) => ({
    storeName,
    mode: 'readonly'
});

const execute = async (storeName, mode, callback) => {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = callback(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const dataService = {
    // MUSIC
    getSongs: async () => {
        return execute(STORES.SONGS, 'readonly', store => store.getAll());
    },
    saveSong: async (song) => {
        if (!song.id) song.id = Date.now();
        await execute(STORES.SONGS, 'readwrite', store => store.put(song));
        return dataService.getSongs();
    },
    deleteSong: async (id) => {
        await execute(STORES.SONGS, 'readwrite', store => store.delete(id));
        return dataService.getSongs();
    },
    incrementSongListeners: async (id) => {
        const db = await dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.SONGS, 'readwrite');
            const store = transaction.objectStore(STORES.SONGS);
            const request = store.get(id);

            request.onsuccess = () => {
                const song = request.result;
                if (song) {
                    song.listeners = (song.listeners || 0) + 1;
                    store.put(song);
                    resolve(song.listeners);
                } else {
                    resolve(0);
                }
            };
            request.onerror = () => reject(request.error);
        });
    },

    // EVENTS
    getEvents: async () => {
        return execute(STORES.EVENTS, 'readonly', store => store.getAll());
    },
    saveEvent: async (event) => {
        if (!event.id) event.id = Date.now();
        await execute(STORES.EVENTS, 'readwrite', store => store.put(event));
        return dataService.getEvents();
    },
    deleteEvent: async (id) => {
        await execute(STORES.EVENTS, 'readwrite', store => store.delete(id));
        return dataService.getEvents();
    },

    // GALLERY
    getGallery: async () => {
        return execute(STORES.GALLERY, 'readonly', store => store.getAll());
    },
    saveGalleryItem: async (item) => {
        if (!item.id) item.id = Date.now();
        await execute(STORES.GALLERY, 'readwrite', store => store.put(item));
        return dataService.getGallery();
    },
    deleteGalleryItem: async (id) => {
        await execute(STORES.GALLERY, 'readwrite', store => store.delete(id));
        return dataService.getGallery();
    },

    // EXPORT ALL DATA
    exportAllData: async () => {
        const [songs, events, gallery] = await Promise.all([
            dataService.getSongs(),
            dataService.getEvents(),
            dataService.getGallery()
        ]);

        const exportData = {
            songs,
            events,
            gallery,
            exportDate: new Date().toISOString()
        };

        // Create downloadable JSON file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sergebrown-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return exportData;
    }
};
