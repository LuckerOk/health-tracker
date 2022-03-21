// Core
import React from 'react';
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

export const Breakfast = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('breakfast');

    const { updateRecord, createRecord } = useRecord();

    const variants = [
        {
            title: 'Я не завтракал',
            value: 'none',
        },
        {
            title: 'У меня был легкий завтрак',
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
                    title = 'Ты сегодня завтракал?'
                    variants = { variants }
                    create = { createRecord }
                    update = { updateRecord }
                    type = 'breakfast' />
            </Base>
        </>
    );
});

