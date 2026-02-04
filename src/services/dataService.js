import { getInitialData } from '../data/initialData';

const DB_NAME = 'SergeBrownDB';
const DB_VERSION = 5;
const STORES = {
    SONGS: 'songs',
    EVENTS: 'events',
    GALLERY: 'gallery'
};

const DEFAULT_DATA = getInitialData();

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
        } else if (event.oldVersion < 3) {
            // Migration for version 3: Add new gallery items
            const galleryStore = request.transaction.objectStore(STORES.GALLERY);
            const newItems = DEFAULT_DATA.gallery.filter(item => item.id >= 7);
            newItems.forEach(item => galleryStore.put(item));
        }

        if (event.oldVersion < 4) {
            // Migration for version 4: Update songs and gallery
            const songStore = request.transaction.objectStore(STORES.SONGS);
            DEFAULT_DATA.songs.forEach(song => songStore.put(song));

            const galleryStore = request.transaction.objectStore(STORES.GALLERY);
            DEFAULT_DATA.gallery.forEach(item => galleryStore.put(item));
        }

        if (event.oldVersion < 5) {
            // Migration for version 5: Update songs and gallery from correct source
            const songStore = request.transaction.objectStore(STORES.SONGS);
            songStore.clear(); // Ensure clean slate
            DEFAULT_DATA.songs.forEach(song => songStore.put(song));

            const galleryStore = request.transaction.objectStore(STORES.GALLERY);
            galleryStore.clear(); // Ensure clean slate
            DEFAULT_DATA.gallery.forEach(item => galleryStore.put(item));
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
