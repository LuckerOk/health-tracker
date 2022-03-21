// Hooks
import { useStore } from '../../../../hooks/useStore';
import { ValueType } from '../../../../types';

export const useRecord = () => {
    const { trackerStore } = useStore();

    const createRecord = (type: string, record: ValueType) => {
        trackerStore.createRecord(type, record);
    };

    const updateRecord = (type: string, record: ValueType, hash: string) => {
        trackerStore.updateRecord(type, record, hash);
    };

    const removeAllRecords = () => {
        trackerStore.removeAllRecords();
    };

    return {
        createRecord,
        updateRecord,
        removeAllRecords,
    };
};
