export const initialData = {
    songs: [
        {
            id: 'song-1',
            title: 'Kaka Bana Ngo',
            year: '2023',
            type: 'Single',
            description: 'Single sorti en novembre 2023',
            cover: `${import.meta.env.BASE_URL}gallery/kaka-bana-ngo.jpg`,
            audioUrl: '#', // Placeholder - user will add real MP3
            listeners: 0
        }
    ],
    gallery: [
        {
            id: 'gallery-1',
            title: 'Event Elengi Ya Lyly',
            date: '07 Août 2024',
            category: 'concerts',
            image: `${import.meta.env.BASE_URL}gallery/event-elengi-lyly.jpg`
        },
        {
            id: 'gallery-2',
            title: 'Event Mopepe à King\'s Beach',
            date: '17 Août 2024',
            category: 'concerts',
            image: `${import.meta.env.BASE_URL}gallery/event-mopepe-beach.jpg`
        },
        {
            id: 'gallery-3',
            title: 'Event Elengi Party 2',
            date: '23 Avril 2025',
            category: 'concerts',
            image: `${import.meta.env.BASE_URL}gallery/event-elengi-party2.jpg`
        },
        {
            id: 'gallery-4',
            title: 'Festival Yangi Art',
            date: '30 Août 2024',
            category: 'concerts',
            image: `${import.meta.env.BASE_URL}gallery/event-yangi-art.jpg`
        },
        {
            id: 'gallery-5',
            title: 'Kaka Bana Ngo - Sortie du Clip',
            date: '10 Novembre 2023',
            category: 'studio',
            image: `${import.meta.env.BASE_URL}gallery/kaka-bana-ngo.jpg`
        }
    ],
    events: [
        {
            id: 'event-1',
            title: 'Concert Live',
            date: '2026-03-15',
            location: 'Kinshasa, RDC',
            description: 'Concert live exceptionnel au cœur de Kinshasa',
            image: `${import.meta.env.BASE_URL}gallery/event-elengi-lyly.jpg`,
            ticketLink: '#'
        }
    ]
};
