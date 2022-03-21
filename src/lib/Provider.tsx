// Core
import { FC, createContext, ReactElement } from 'react';

// Store
import { RootStore } from './mobx';

const store = new RootStore();

export const Context = createContext<RootStore>(store);

export const Provider: FC<IPropTypes> = (props) => {
    return (
        <Context.Provider value = { store }>
            { props.children }
        </Context.Provider>
    );
};

interface IPropTypes {
    children: ReactElement | ReactElement[]
}
