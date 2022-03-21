// Hooks
import { useStore } from '../../../../hooks';

// Types
import { IProfile } from '../../../../types';

export const useProfile = () => {
    const { userStore } = useStore();

    const login = (credentials: string) => {
        userStore.loginUser(credentials);
    };

    const logout = () => {
        userStore.logoutUser();
    };

    const register = (user: IProfile) => {
        userStore.registerUser(user);
    };

    const update = (user: IProfile) => {
        userStore.updateMe(user);
    };

    return {
        login,
        logout,
        register,
        update,
    };
};
