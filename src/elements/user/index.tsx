// Core
import { FC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

// Styles
import Styles from './index.module.scss';

// Book
import { book } from '../../navigation/book';

// Hooks
import { useStore } from '../../hooks';

export const User: FC = observer(() => {
    const { userStore } = useStore();
    const { profile } = userStore;

    if (profile === null) {
        return null;
    }

    const {
        sex,
        fname,
        lname,
    } = profile;

    const avatarCX = cx([
        Styles.avatar, {
            [ Styles.male ]:   sex === 'm',
            [ Styles.female ]: sex === 'f',
        },
    ]);

    return (
        <div className = { avatarCX }>
            <div className = { Styles.column }>
                <Link to = { book.profile.url } className = { Styles.name }>
                    { fname }&nbsp;{ lname }
                </Link>
                <button className = { Styles.logout } onClick = { () => userStore.logoutUser() }>
                    Выйти
                </button>
            </div>
        </div>
    );
});
