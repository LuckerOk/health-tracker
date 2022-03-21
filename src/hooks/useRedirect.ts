// Core
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useStore } from './useStore';

// Other
import { book } from '../navigation/book';

export const useRedirect = () => {
    const navigate = useNavigate();
    const { userStore } = useStore();
    const { token } = userStore;

    useEffect(() => {
        if (token) {
            navigate(book.root.url);
        }
    }, [token]);
};
