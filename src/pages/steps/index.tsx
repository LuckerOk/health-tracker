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
import { CustomQuestionInput } from '../../elements/customQuestionInput';

export const Steps: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('steps');

    const { updateRecord, createRecord } = useRecord();

    return (
        <>
            <Base>
                <CustomQuestionInput
                    title = 'Сколько шагов ты сегодня прошел?'
                    update = { updateRecord }
                    create = { createRecord }
                    type = 'steps' />
            </Base>
        </>
    );
});
