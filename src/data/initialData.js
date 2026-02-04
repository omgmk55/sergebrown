export const getInitialData = () => {
    const baseUrl = import.meta.env.BASE_URL || '/';

    return {
        songs: [
            {
                id: 1,
                title: 'Annoncer',
                year: '2025',
                type: 'Single',
                description: 'Titre principal',
                audioUrl: `${baseUrl}music/ANNONCER_Master(0).mp3`,
                listeners: 0
            },
            {
                id: 2,
                title: 'BZS Bombé',
                year: '2025',
                type: 'Single',
                description: 'BZS Bombé',
                audioUrl: `${baseUrl}music/BZS Bombé.mp3`,
                listeners: 0
            },
            {
                id: 3,
                title: 'Hommage Isaac Polesa',
                year: '2025',
                type: 'Single',
                description: 'Hommage vibrant',
                audioUrl: `${baseUrl}music/Hommage Isaac Polesa.mp3`,
                listeners: 0
            },
            {
                id: 4,
                title: 'Mwasi Mongala',
                year: '2025',
                type: 'Single',
                description: 'Mwasi Mongala',
                audioUrl: `${baseUrl}music/Mwasi_mongala_Master.mp3`,
                listeners: 0
            },
            {
                id: 5,
                title: 'Budaa',
                year: '2025',
                type: 'Featuring',
                description: 'Serge Brown x DX-MAN',
                audioUrl: `${baseUrl}music/SERGE BROWN x DX-MAN_BUDAA-Master.mp3`,
                listeners: 0
            },
            {
                id: 6,
                title: 'Banna Ngo',
                year: '2025',
                type: 'Single',
                description: 'Kaka Bana Ngo',
                audioUrl: `${baseUrl}music/Serge Brown Bana Ngo.mp3`,
                listeners: 0
            },
            {
                id: 7,
                title: 'Whisky Pêche',
                year: '2025',
                type: 'Single',
                description: 'Ambiance détente',
                audioUrl: `${baseUrl}music/Serge Brown Whisky Peche.mp3`,
                listeners: 0
            },
            {
                id: 8,
                title: 'Unité Limete Bomoko',
                year: '2025',
                type: 'Single',
                description: 'Hymne à l\'unité',
                audioUrl: `${baseUrl}music/Unité Limete Bomoko.mp3`,
                listeners: 0
            }
        ],
        gallery: [
            {
                id: 'gallery-1',
                title: 'Event Elengi Ya Lyly',
                date: '07 Août 2024',
                category: 'concerts',
                image: `${baseUrl}gallery/event-elengi-lyly.jpg`
            },
            {
                id: 'gallery-2',
                title: 'Event Mopepe à King\'s Beach',
                date: '17 Août 2024',
                category: 'concerts',
                image: `${baseUrl}gallery/event-mopepe-beach.jpg`
            },
            {
                id: 'gallery-3',
                title: 'Event Elengi Party 2',
                date: '23 Avril 2025',
                category: 'concerts',
                image: `${baseUrl}gallery/event-elengi-party2.jpg`
            },
            {
                id: 'gallery-4',
                title: 'Festival Yangi Art',
                date: '30 Août 2024',
                category: 'concerts',
                image: `${baseUrl}gallery/event-yangi-art.jpg`
            },
            {
                id: 'gallery-5',
                title: 'Kaka Bana Ngo - Sortie du Clip',
                date: '10 Novembre 2023',
                category: 'studio',
                image: `${baseUrl}gallery/kaka-bana-ngo.jpg`
            },
            {
                id: 'gallery-6',
                title: 'Session Studio',
                date: '2026',
                category: 'studio',
                image: `${baseUrl}gallery/user_upload_1.jpg`
            },
            {
                id: 'gallery-7',
                title: 'Live Performance',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/user_upload_2.jpg`
            },
            {
                id: 'gallery-8',
                title: 'Backstage',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/user_upload_3.jpg`
            },
            {
                id: 'gallery-fb-1',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770157956767.jpg`
            },
            {
                id: 'gallery-fb-2',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770158678466.jpg`
            },
            {
                id: 'gallery-fb-3',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770158686603.jpg`
            },
            {
                id: 'gallery-fb-4',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770158689419.jpg`
            },
            {
                id: 'gallery-fb-5',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770158694867.jpg`
            },
            {
                id: 'gallery-fb-6',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770158696671.jpg`
            },
            {
                id: 'gallery-fb-7',
                title: 'Galerie Photo',
                date: '2026',
                category: 'concerts',
                image: `${baseUrl}gallery/FB_IMG_1770159181606.jpg`
            }
        ],
        events: [
            {
                id: 'event-1',
                title: 'Concert Live',
                date: '2026-03-15',
                location: 'Kinshasa, RDC',
                description: 'Concert live exceptionnel au cœur de Kinshasa',
                image: `${baseUrl}gallery/event-elengi-lyly.jpg`,
                ticketLink: '#'
            }
        ]
    };
};
