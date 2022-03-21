// Core
import { FC } from 'react';
import {
    FieldError, UseFormRegisterReturn,
} from 'react-hook-form';

export const CustomInput: FC<IPropTypes> = (props) => {
    const {
        type,
        placeholder,
        cx,
        label,
        error,
        errorCX,
        register,
    } = props;

    const fieldError = error as FieldError;

    const errorJSX = fieldError && fieldError.message && (
        <p className = { errorCX }>
            { fieldError.message }
        </p>
    );

    return (
        <>
            <div className = { cx }>
                <label>
                    { label }
                </label>
                <input
                    type = { type }
                    placeholder = { placeholder }
                    { ...register } />
            </div>
            { errorJSX }
        </>
    );
};

interface IPropTypes {
    type: string;
    placeholder: string;
    cx: string;
    label: string;
    error?: FieldError | string | undefined;
    errorCX?: string;
    value?: string;
    register: UseFormRegisterReturn;
}
