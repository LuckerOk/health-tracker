// Core
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useStore } from '../../../../hooks';
import { book } from '../../../../navigation/book';

export const useProfileInitializer = () => {
    const navigate = useNavigate();
    const { userStore, uiStore } = useStore();
    const { profile } = userStore;
    const { errorStatusCode } = uiStore;

    useEffect(() => {
        if (profile === null) {
            userStore.getMe();
        }
    }, [profile]);

    useEffect(() => {
        if (errorStatusCode === 401) {
            navigate(book.login.url);
        }
    }, [errorStatusCode]);
};
