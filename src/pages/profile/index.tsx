// Core
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

// Views
import { Base } from '../../views/base';

// Components
import { ProfileComponent } from '../../bus/user';

// Hooks
import { useProfile } from '../../bus/user/hooks/useProfile';
import { useProfileInitializer } from '../../bus/user/hooks/useProfileInitializer';
import { BtnText } from '../../types';

export const Profile: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    const {
        update,
    } = useProfile();

    return (
        <>
            <Base
                center = { true }
                disabledWidget = { true }>
                <ProfileComponent
                    submitText = { BtnText.UPDATE }
                    submit = { update } />
            </Base>
        </>
    );
});
