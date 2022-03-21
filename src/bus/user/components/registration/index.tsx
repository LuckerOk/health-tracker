// Core
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

// Components
import { ProfileComponent } from '../profile';

// Elements
import { Spinner } from '../../../../elements/spinner';

// Hooks
import { useProfile } from '../../hooks/useProfile';
import { useRedirect, useStore } from '../../../../hooks';

// Styles
import Styles from './styles/index.module.scss';

// Types
import { BtnText } from '../../../../types';

export const RegistrationComponent: FC = observer(() => {
    useRedirect();
    const { register } = useProfile();
    const { uiStore } = useStore();
    const { isLoading } = uiStore;

    const loaderJSX = isLoading && (
        <Spinner isLoading = { isLoading } />
    );

    return (
        <section className = { Styles.registration }>
            <div className = { Styles.left }>
                <ProfileComponent
                    submitText = { BtnText.SIGNUP }
                    submit = { register } />
            </div>
            <div className = { Styles.right }>
                { loaderJSX }
            </div>
        </section>
    );
});
