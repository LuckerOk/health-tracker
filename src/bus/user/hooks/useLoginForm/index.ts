// Core
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Hooks
import { useErrorHandler } from './useErrorHandler';

// Other
import { defaultValues } from './defaultValues';
import { loginSchema } from './login.schema';

export const useLoginForm = () => {
    const { errorMessage } = useErrorHandler();

    const {
        register,
        getValues,
        formState,
    } = useForm({
        defaultValues,
        mode:     'onChange',
        resolver: yupResolver(loginSchema),
    });

    return {
        register,
        errorMessage,
        getValues,
        errors:  formState.errors,
        isValid: formState.isValid,
    };
};
