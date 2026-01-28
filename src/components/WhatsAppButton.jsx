import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function WhatsAppButton() {
    const phoneNumber = '243816409670'; // Numéro WhatsApp
    const message = "Bonjour Serge Brown, j'aimerais avoir plus d'infos !";
    const { currentTrack } = useAudio();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, rotate: -180, bottom: '1.5rem' }}
            animate={{
                scale: 1,
                rotate: 0,
                bottom: currentTrack ? '8rem' : '1.5rem'
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="fixed right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-green-500/30 transition-shadow flex items-center justify-center group"
            style={{ bottom: currentTrack ? '8rem' : '1.5rem' }}
        >
            <Phone className="w-8 h-8 fill-current" />
            <span className="absolute right-full mr-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Discuter sur WhatsApp
            </span>
        </motion.a>
    );
}
