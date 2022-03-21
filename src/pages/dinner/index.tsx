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

export const Dinner: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('dinner');

    const { updateRecord, createRecord } = useRecord();

    const variants = [
        {
            title: 'Я не ужинал',
            value: 'none',
        },
        {
            title: 'У меня был легкий ужин',
            value: 'light',
        },
        {
            title: 'Я очень плотно покушал',
            value: 'heavy',
        },
    ];

    return (
        <>
            <Base>
                <CustomQuestionSelector
                    title = 'Ты сегодня ужинал?'
                    variants = { variants }
                    update = { updateRecord }
                    create = { createRecord }
                    type = 'dinner' />
            </Base>
        </>
    );
});
