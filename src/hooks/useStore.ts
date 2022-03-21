// Core
import { useContext } from 'react';

// Other
import { Context } from '../lib/Provider';

export const useStore = () => {
    const store = useContext(Context);

    return store;
};
