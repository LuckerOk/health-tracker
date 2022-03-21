// Core
import { FC } from 'react';

// Views
import { observer } from 'mobx-react-lite';
import { Base } from '../../views/base';

// Hooks
import { useProfileInitializer } from '../../bus/user/hooks/useProfileInitializer';
import { useScoreInitializer } from '../../bus/tracker/hooks/useScoreInitializer';
import { useRecordInitializer } from '../../bus/tracker/hooks/useRecordInitializer';
import { useRecord } from '../../bus/tracker/hooks/useRecord';

// Components
import { CustomQuestionCheckboxes } from '../../elements/customQuestionCheckboxes';

export const Water: FC = observer(() => {
    // Get profile from API
    useProfileInitializer();
    useScoreInitializer();
    useRecordInitializer('water');

    const { updateRecord, createRecord } = useRecord();

    return (
        <>
            <Base>
                <CustomQuestionCheckboxes
                    title = 'Сколько воды ты сегодня выпил?'
                    update = { updateRecord }
                    create = { createRecord }
                    type = 'water' />
            </Base>
        </>
    );
});
