// Core
import { useEffect, useState } from 'react';
import { useStore } from '../../../../hooks';

export const useErrorHandler = () => {
    const { uiStore } = useStore();
    const [errorMessage, setErrorMessage] = useState('');
    const { errorStatusCode } = uiStore;

    useEffect(() => {
        if (errorStatusCode === 401) {
            setErrorMessage('Попробуйте пройти авторизацию ещё раз!');
        } else if (errorStatusCode === 400) {
            setErrorMessage('На клиенте произошла ошибка!');
        } else if (errorStatusCode === 500) {
            setErrorMessage('На сервере произошла ошибка!');
        } else {
            setErrorMessage('');
        }
    }, [errorStatusCode]);

    return {
        errorMessage,
        setErrorMessage,
    };
};
