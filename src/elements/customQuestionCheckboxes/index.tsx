// Core
import { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

// Hooks
import { useStore } from '../../hooks';

// Styles
import Styles from './styles/index.module.scss';

// Types
import { IQuestionPropTypes } from '../../types';

export const CustomQuestionCheckboxes: FC<IQuestionPropTypes> = observer((props) => {
    const { trackerStore, uiStore } = useStore();
    const { records } = trackerStore;
    const { isLoading } = uiStore;
    const {
        title,
        create,
        update,
        type,
    } = props;
    const initial = records[ type ];
    const value = initial?.value;
    const hash = initial?.hash;

    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (value) {
            setCurrentValue(Number(value));
        }
    }, [initial]);

    const cupsJSX = [...new Array(13)].map((_, ind) => {
        const isSelected = currentValue > ind;

        const cupCX = cx(Styles.element, [
            {
                [ Styles.selected ]: isSelected,
            },
        ]);

        const clickHandler = () => {
            const expectedInd = ind + 1;
            const leftInd = currentValue - 1;

            if (currentValue === expectedInd) {
                setCurrentValue(leftInd);
            } else {
                setCurrentValue(expectedInd);
            }
        };

        return (
            <button
                key = { String(ind) }
                className = { cupCX }
                onClick = { clickHandler } />
        );
    });

    const submitHandler = () => {
        if (hash !== '0') {
            update(type, currentValue, hash);
        } else {
            create(type, currentValue);
        }
    };

    const waterAmount = currentValue && currentValue * 250;

    return (
        <div className = { Styles.question }>
            <h1>{ title }</h1>
            <div className = { Styles.elements }>
                { cupsJSX }
                <span className = { Styles.size }>{ waterAmount } мл</span>
            </div>
            <button
                className = { Styles.sendAnswer }
                onClick = { submitHandler }
                disabled = { isLoading }>
                Ответить
            </button>
        </div>
    );
});
