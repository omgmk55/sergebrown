import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect, useMemo, memo } from 'react';

// Isolated Countdown Component to prevent re-renders of the entire page
const CountdownTimer = memo(({ targetDate, eventTitle, formatDate }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const nextEvent = new Date(targetDate);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = nextEvent - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-dark p-6 sm:p-8 rounded-2xl mb-12 bg-gradient-to-br from-gold/10 to-transparent border-gold/20"
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-outfit font-bold mb-2">Prochain Concert</h2>
                <p className="text-gray-400">{eventTitle} - {formatDate}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                    { label: 'Jours', value: timeLeft.days },
                    { label: 'Heures', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Secondes', value: timeLeft.seconds },
                ].map((item) => (
                    <div key={item.label} className="glass p-4 rounded-xl text-center">
                        <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                            {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">{item.label}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
});

CountdownTimer.displayName = 'CountdownTimer';

// EventCard Component - Memoized to prevent unnecessary re-renders
const EventCard = memo(({ event, isPast = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="glass-dark p-4 sm:p-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
    >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Date Circle */}
            <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex flex-col items-center justify-center text-rich-black">
                    <div className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs uppercase">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                    </div>
                </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 space-y-3">
                <div>
                    <h3 className="text-2xl font-outfit font-bold mb-1">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span>{event.venue} - {event.city}, {event.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-gold" />
                        <span>{event.time}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {event.status === 'available' && (
                        <>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-green-500 font-medium">Places disponibles</span>
                        </>
                    )}
                    {event.status === 'sold-out' && (
                        <>
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="text-red-500 font-medium">Complet</span>
                        </>
                    )}
                    {event.status === 'completed' && (
                        <span className="text-gray-500 font-medium">Événement passé</span>
                    )}
                </div>
            </div>

            {/* Ticket Button */}
            {!isPast && (
                <div className="flex-shrink-0">
                    <a
                        href={event.ticketUrl}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${event.status === 'available'
                            ? 'bg-gradient-gold text-rich-black hover:scale-105'
                            : 'glass text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Ticket className="w-5 h-5" />
                        <span>{event.status === 'available' ? 'Billets' : 'Complet'}</span>
                        {event.status === 'available' && <ExternalLink className="w-4 h-4" />}
                    </a>
                </div>
            )}
        </div>
    </motion.div>
));

EventCard.displayName = 'EventCard';

export default function Events() {
    const [showPastEvents, setShowPastEvents] = useState(false);

    // Sample events data - memoized to prevent recreation on every render
    const upcomingEvents = useMemo(() => [
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
    ], []);

    const pastEvents = useMemo(() => [
        {
            id: 4,
            title: 'Première Show',
            venue: 'Le Trianon',
            city: 'Paris',
            country: 'France',
            date: '2025-11-20',
            time: '20:00',
            status: 'completed',
            description: 'Premier concert solo à guichets fermés'
        },
    ], []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const nextEventDate = useMemo(() => {
        if (upcomingEvents.length === 0) return null;
        return `${upcomingEvents[0].date}T${upcomingEvents[0].time}`;
    }, [upcomingEvents]);

    const nextEventFormatted = useMemo(() => {
        if (upcomingEvents.length === 0) return '';
        return formatDate(upcomingEvents[0].date);
    }, [upcomingEvents]);

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
                        <span className="text-gradient">Événements</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Retrouvez-moi en concert et ne manquez aucune date de ma tournée.
                    </p>
                </motion.div>

                {/* Countdown to Next Event - Isolated Component */}
                {nextEventDate && (
                    <CountdownTimer
                        targetDate={nextEventDate}
                        eventTitle={upcomingEvents[0].title}
                        formatDate={nextEventFormatted}
                    />
                )}

                {/* Upcoming Events */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-outfit font-bold">Concerts à Venir</h2>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-5 h-5" />
                            <span>{upcomingEvents.length} événements</span>
                        </div>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-6">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-dark p-12 rounded-2xl text-center">
                            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-xl text-gray-400">Aucun événement prévu pour le moment</p>
                            <p className="text-gray-500 mt-2">Revenez bientôt pour les nouvelles dates !</p>
                        </div>
                    )}
                </motion.div>

                {/* Past Events Toggle */}
                {pastEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => setShowPastEvents(!showPastEvents)}
                            className="glass px-6 py-3 rounded-lg hover:bg-white/10 transition-colors mb-6 flex items-center gap-2 mx-auto"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>{showPastEvents ? 'Masquer' : 'Voir'} les événements passés</span>
                        </button>

                        {showPastEvents && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-outfit font-bold mb-8">Événements Passés</h2>
                                {pastEvents.map((event) => (
                                    <EventCard key={event.id} event={event} isPast={true} />
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
