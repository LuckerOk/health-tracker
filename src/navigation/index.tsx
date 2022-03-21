// Core
import { FC } from 'react';
import {
    Route, Routes, Navigate,
} from 'react-router-dom';

// Routes
import { book } from './book';

export const RoutesComponent: FC = () => {
    const routesJSX = Object
        .values(book)
        .map(({ url, page: Page }) => (
            <Route
                key = { url } path = { url }
                element = { <Page /> } />
        ));

    return (
        <>
            <Routes>
                { routesJSX }
                <Route path = '*'  element = { <Navigate to = { book.login.url } replace /> } />
            </Routes>
        </>
    );
};
