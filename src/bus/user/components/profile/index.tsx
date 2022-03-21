// Core
import { FC, useEffect } from 'react';
import cx from 'classnames';

// Styles
import { observer } from 'mobx-react-lite';

// Elements
import { CustomInput } from '../../../../elements/customInput';

// Hooks
import { useProfileForm } from '../../hooks/useProfileForm';
import { useRecord } from '../../../tracker/hooks/useRecord';
import { useStore } from '../../../../hooks';

// Styles
import Styles from './styles/index.module.scss';

// Types
import { BtnText, IProfile, Sex } from '../../../../types';

export const ProfileComponent: FC<IPropTypes> = observer((props) => {
    const { submit, submitText } = props;
    const {
        formState, getValues, reset, handleGenderClick,
        register, setValue, watch,
    } = useProfileForm();
    const { removeAllRecords } = useRecord();
    const { uiStore, userStore } = useStore();
    const { profile } = userStore;
    const { isLoading } = uiStore;

    const {
        email, fname, lname, age,
        height, weight, sex,
    } = profile || {};

    if (submitText === BtnText.SIGNUP) {
        watch('sex');
    }

    useEffect(() => {
        if (profile) {
            setValue('email', String(email) || '', { shouldDirty: true });
            setValue('fname', String(fname) || '', { shouldDirty: true });
            setValue('lname', String(lname) || '', { shouldDirty: true });
            setValue('height', String(height) || '', { shouldDirty: true });
            setValue('weight', String(weight) || '', { shouldDirty: true });
            setValue('sex', String(sex) || '', { shouldDirty: true });
            setValue('age', String(age) || '', { shouldDirty: true });
        }
    }, [profile]);

    useEffect(() => {
        if (submitText === BtnText.SIGNUP) {
            reset({
                email:    '',
                fname:    '',
                lname:    '',
                age:      '',
                height:   '',
                weight:   '',
                sex:      '',
                password: '',
            }, { keepDirty: true });
            setValue('age', '', { shouldDirty: true });
        }
    }, []);

    const isBlocked = !formState.isValid && formState.isDirty;

    const femaleCX = cx([
        Styles.female, {
            [ Styles.selected ]: getValues('sex') === Sex.FEMALE,
        },
    ]);

    const maleCX = cx([
        Styles.male, {
            [ Styles.selected ]: getValues('sex') === Sex.MALE,
        },
    ]);

    const genderErrorJSX = formState.errors.sex && (
        <p className = { Styles.error }>
            { formState.errors.sex }
        </p>
    );

    const submitHandler = () => {
        if (typeof submit === 'function') {
            const values = getValues();
            const data = {
                ...values,
                age:    Number(values.age),
                height: Number(values.height),
                weight: Number(values.weight),
            };

            submit(data);
        }
    };

    const removeAllJSX = profile && (
        <button
            type = 'button'
            className = { Styles.clearAllRecords }
            onClick = { removeAllRecords }
            disabled = { isLoading }>
            Очистить все данные
        </button>
    );

    const resetForm = () => {
        reset({
            email,
            fname,
            lname,
            age:      String(age),
            height:   String(height),
            weight:   String(weight),
            sex,
            password: '',
        }, { keepDirty: true });
    };

    const isMale = submitText === BtnText.UPDATE && sex === Sex.MALE;
    const isFemale = submitText === BtnText.UPDATE && sex === Sex.FEMALE;

    return (
        <div className = { Styles.profile }>
            <h1>Профиль</h1>
            <div className = { Styles.gender }>
                { isFemale || submitText === BtnText.SIGNUP
                    ? <div
                        className = { femaleCX }
                        onClick = { () => handleGenderClick(Sex.FEMALE) }>
                        <span>Женщина</span>
                    </div> : null }
                { isMale || submitText === BtnText.SIGNUP
                    ? <div
                        className = { maleCX }
                        onClick = { () => handleGenderClick(Sex.MALE) }>
                        <span>Мужчина</span>
                    </div> : null }
            </div>
            { genderErrorJSX }
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Электропочта'
                type = 'email'
                placeholder = 'Введите свой email'
                errorCX = { Styles.error }
                register = { register('email') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Имя'
                type = 'text'
                placeholder = 'Введите свое имя'
                register = { register('fname') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Фамилия'
                type = 'text'
                placeholder = 'Введите свою фамилию'
                register = { register('lname') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Пароль'
                type = 'password'
                placeholder = 'Введите свой пароль'
                errorCX = { Styles.error }
                register = { register('password') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Возраст'
                type = 'number'
                placeholder = 'Введите свой возраст'
                register = { register('age') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Рост'
                type = 'number'
                placeholder = 'Введите свой рост'
                register = { register('height') } />
            <CustomInput
                cx = { Styles.inputRow }
                label = 'Вес'
                type = 'number'
                placeholder = 'Введите свой вес'
                error = { formState.errors.weight }
                errorCX = { Styles.error }
                register = { register('weight') } />
            <div className = { Styles.controls }>
                <button
                    className = { Styles.clearData } disabled = { isBlocked }
                    onClick = { resetForm }>Сбросить</button>
                <button
                    onClick = { submitHandler }
                    disabled = { isBlocked || isLoading }>
                    { submitText }
                </button>
            </div>
            { removeAllJSX }
        </div>
    );
});

interface IPropTypes {
    submit: (profile: IProfile) => void;
    submitText: string;
}
