// Core
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

// Views
import { Base } from '../../views/base';

// Hooks
import { useProfileInitializer } from '../../bus/user/hooks/useProfileInitializer';
import { useScoreInitializer } from '../../bus/tracker/hooks/useScoreInitializer';
import { useRecordInitializer } from '../../bus/tracker/hooks/useRecordInitializer';
import { useRecord } from '../../bus/tracker/hooks/useRecord';

// Components
import { CustomQuestionSelector } from '../../elements/customQuestionSelector';

export const Coffee: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('coffee');

    const { updateRecord, createRecord } = useRecord();

    const variants = [
        {
            title: 'Я не пил совсем',
            value: 'none',
        },
        {
            title: 'Выпил 1 стакан',
            value: 'light',
        },
        {
            title: 'Выпил 2 или больше стаканов',
            value: 'heavy',
        },
    ];

    return (
        <>
            <Base>
                <CustomQuestionSelector
                    title = 'Ты сегодня пил кофе?'
                    variants = { variants }
                    update = { updateRecord }
                    create = { createRecord }
                    type = 'coffee' />
            </Base>
        </>
    );
});
