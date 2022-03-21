// Core
import { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

// Hooks
import { useStore } from '../../hooks';

// Styles
import Styles from './styles/index.module.scss';

// Types
import { IQuestionPropTypes, ValueType } from '../../types';

export const CustomQuestionSelector: FC<IQuestionPropTypes> = observer((props) => {
    const [currentValue, setCurrentValue] = useState<ValueType>('');
    const { trackerStore, uiStore } = useStore();
    const { records } = trackerStore;
    const { isLoading } = uiStore;

    const {
        title,
        variants,
        create,
        update,
        type,
    } = props;
    const initial = records[ type ];
    const hash = initial?.hash;
    const value = initial?.value;

    useEffect(() => {
        if (hash) {
            setCurrentValue(value);
        }
    }, [initial]);

    const variantsJSX = Array.isArray(variants)
        && variants.map(({ title: variantTitle, value: variantValue }, index) => {
            const clickHandler = () => {
                setCurrentValue(variantValue);
            };

            const selectorCX = cx(
                Styles.answer,
                {
                    [ Styles.selected ]: variantValue === currentValue,
                },
            );

            return (
                <span
                    key = { String(index) } className = { selectorCX }
                    onClick = { clickHandler }>{ variantTitle }</span>
            );
        });

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
            <div className = { Styles.answers }>
                { variantsJSX }
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
