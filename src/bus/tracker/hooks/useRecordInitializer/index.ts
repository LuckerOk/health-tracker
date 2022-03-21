// Core
import { useEffect } from 'react';

// Hooks
import { useStore } from '../../../../hooks/useStore';

export const useRecordInitializer = (type: string) => {
    const { trackerStore } = useStore();
    const { records } = trackerStore;
    const record = records[ type ];

    useEffect(() => {
        if (typeof record === 'undefined') {
            trackerStore.getRecord(type);
        }
    }, [records, type]);
};
