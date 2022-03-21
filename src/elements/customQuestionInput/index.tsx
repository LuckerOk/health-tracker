// Core
import {
    ChangeEvent, FC, useEffect, useState,
} from 'react';
import { observer } from 'mobx-react-lite';

// Hooks
import { useStore } from '../../hooks';

// Styles
import Styles from './styles/index.module.scss';

// Types
import { IQuestionPropTypes, ValueType } from '../../types';

export const CustomQuestionInput: FC<IQuestionPropTypes> = observer((props) => {
    const [currentValue, setCurrentValue] = useState<ValueType>('');
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

    useEffect(() => {
        if (hash) {
            setCurrentValue(value);
        }
    }, [initial]);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(Number(event.target.value));
    };

    const submitHandler = () => {
        if (hash !== '0') {
            update(type, currentValue, hash);
        } else {
            create(type, currentValue);
        }
    };

    return (
        <div className = { Styles.question }>
            <h1>{ title }</h1>
            <div className = { Styles.inputRow }>
                <input
                    type = 'number'
                    value = { typeof currentValue === 'string' || typeof currentValue === 'number' ? currentValue : '' }
                    onChange = { changeHandler } placeholder = 'Введите свое число' />
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
