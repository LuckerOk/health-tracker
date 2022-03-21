// Core
import { useEffect } from 'react';

// Hooks
import { useStore } from '../../../../hooks/useStore';

export const useScoreInitializer = () => {
    const { trackerStore } = useStore();
    const { score } = trackerStore;

    useEffect(() => {
        if (score === null) {
            trackerStore.fetchScore();
        }
    }, [score]);
};
