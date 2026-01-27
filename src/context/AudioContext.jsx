import { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);

    const playTrack = (track) => {
        setCurrentTrack(track);
    };

    const closePlayer = () => {
        setCurrentTrack(null);
    };

    return (
        <AudioContext.Provider value={{ currentTrack, playTrack, closePlayer }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}
