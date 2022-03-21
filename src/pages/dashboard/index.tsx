// Core
import { FC } from 'react';

// Views
import { observer } from 'mobx-react-lite';
import { Base } from '../../views/base';

// Components
import { DashboardComponent } from '../../bus/tracker';

// Hooks
import { useProfileInitializer } from '../../bus/user/hooks/useProfileInitializer';
import { useScoreInitializer } from '../../bus/tracker/hooks/useScoreInitializer';

export const Dashboard: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();

    return (
        <>
            <Base>
                <DashboardComponent />
            </Base>
        </>
    );
});
