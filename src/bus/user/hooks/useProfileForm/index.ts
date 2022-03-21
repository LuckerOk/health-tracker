// Core
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Types
import { Sex } from '../../../../types';

// Other
import { defaultValues } from './defaultValues';
import { profileSchema } from './profile.schema';

export const useProfileForm = () => {
    const {
        formState, getValues, reset, setValue, register, watch,
    } = useForm({
        defaultValues,
        mode:     'onChange',
        resolver: yupResolver(profileSchema),
    });

    const handleGenderClick = (gender: Sex) => {
        // reset({ sex: '' });
        setValue('sex', gender, { shouldDirty: true });
    };

    return {
        watch,
        formState,
        getValues,
        reset,
        register,
        setValue,
        handleGenderClick,
    };
};
