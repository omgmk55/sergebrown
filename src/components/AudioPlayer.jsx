import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ track, onClose }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [track]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <AnimatePresence>
            {track && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/10 backdrop-blur-xl"
                >
                    <audio
                        ref={audioRef}
                        src={track.audioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center gap-6">
                            {/* Track Info */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-14 h-14 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Play className="w-6 h-6 text-rich-black" fill="currentColor" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-outfit font-bold truncate">{track.title}</h4>
                                    <p className="text-sm text-gray-400 truncate">{track.year} • {track.type}</p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-6 h-6 text-rich-black" fill="currentColor" />
                                        ) : (
                                            <Play className="w-6 h-6 text-rich-black" fill="currentColor" />
                                        )}
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex items-center gap-3 w-full max-w-md">
                                    <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                                    <div className="flex-1 relative">
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-gold transition-all"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress}
                                            onChange={handleSeek}
                                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Volume & Close */}
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2">
                                    <button onClick={toggleMute} className="text-gray-400 hover:text-gold transition-colors">
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume * 100}
                                        onChange={(e) => setVolume(e.target.value / 100)}
                                        className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gold transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
