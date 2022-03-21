// Core
import { FC } from 'react';
import Loader from 'react-loader-spinner';

// Styles
import Styles from './styles.module.css';

export const Spinner: FC<IPropTypes> = ({ isLoading }) => {
    const spinnerJSX = isLoading && (
        <div className = { Styles.spinner }>
            <Loader
                type = 'Triangle'
                color = '#FD0E35'
                height = { 60 }
                width = { 60 } />
        </div>
    );

    return (
        <>
            { spinnerJSX }
        </>
    );
};

interface IPropTypes {
    isLoading: boolean;
}
