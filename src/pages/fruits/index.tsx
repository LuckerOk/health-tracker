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

export const Fruits: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('fruits');

    const { updateRecord, createRecord } = useRecord();

    const variants = [
        {
            title: 'Да',
            value: true,
        },
        {
            title: 'Нет',
            value: false,
        },
    ];

    return (
        <>
            <Base>
                <CustomQuestionSelector
                    title = 'Ты сегодня кушал фрукты?'
                    variants = { variants }
                    update = { updateRecord }
                    create = { createRecord }
                    type = 'fruits' />
            </Base>
        </>
    );
});
