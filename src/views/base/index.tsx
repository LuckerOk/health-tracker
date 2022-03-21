// Core
import { FC, ReactElement, useEffect } from 'react';
import cx from 'classnames';
import {
    Link, matchPath, useLocation, useNavigate,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// Book
import { book } from '../../navigation/book';

// Styles
import Styles from './styles/index.module.scss';

// Elements
import { User } from '../../elements/user';
import { Spinner } from '../../elements/spinner';

// Hooks
import { useStore } from '../../hooks';

// Types
import { Sex } from '../../types';

export const Base: FC<IPropTypes> = observer((props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userStore, uiStore, trackerStore } = useStore();

    const { profile, token: savedToken } = userStore;
    const { isLoading } = uiStore;
    const { score } = trackerStore;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            userStore.setToken(token);
        } else {
            navigate(book.login.url);
        }
    }, [savedToken]);

    const {
        children,
        center,
        disabledWidget,
    } = props;

    const isExact = matchPath(book.root.url, pathname);

    if (!profile) {
        return null;
    }

    const { sex } = profile;

    const avatarCX = cx([
        Styles.sidebar, {
            [ Styles.male ]:   sex === Sex.MALE,
            [ Styles.female ]: sex === Sex.FEMALE,
        },
    ]);

    const contentCX = cx(Styles.content, {
        [ Styles.center ]: center,
    });

    const loaderCX = isLoading && (
        <Spinner isLoading = { isLoading } />
    );

    const widgetJSX = score !== null && !disabledWidget && (
        <div className = { Styles.widget }>
            <span className = { Styles.title }>Life Score</span>
            <div className = { Styles.module }>
                <span className = { Styles.score } style = { { bottom: `${score}%` } }>{ score }</span>
                <div className = { Styles.progress }>
                    <div className = { Styles.fill } style = { { height: `${score}%` } } />
                </div>
                <span className = { cx([Styles.label, Styles.level1]) }>Off Track</span>
                <span className = { cx([Styles.label, Styles.level2]) }>Imbalanced</span>
                <span className = { cx([Styles.label, Styles.level3]) }>Balanced</span>
                <span className = { cx([Styles.label, Styles.level4]) }>Healthy</span>
                <span className = { cx([Styles.label, Styles.level5]) }>Perfect Fit</span>
            </div>
        </div>
    );

    const homeLinkJSX = !isExact && (
        <Link to = { book.root.url } className = { Styles.homeLink }>На главную</Link>
    );

    return (
        <section className = { Styles.profile }>
            <div className = { avatarCX }>
                { loaderCX }
            </div>
            <div className = { Styles.wrap }>
                <div className = { Styles.header }>
                    <div>
                        { homeLinkJSX }
                    </div>
                    <User />
                </div>
                <div className = { contentCX }>
                    { children }
                    { widgetJSX }
                </div>
            </div>
        </section>
    );
});

interface IPropTypes {
    children: ReactElement | ReactElement[];
    center?: boolean;
    disabledWidget?: boolean;
}
