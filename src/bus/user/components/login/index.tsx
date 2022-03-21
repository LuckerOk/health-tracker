// Core
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

// Hooks
import { Link } from 'react-router-dom';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useProfile } from '../../hooks/useProfile';
import { useRedirect, useStore } from '../../../../hooks';

// Elements
import { CustomInput } from '../../../../elements/customInput';
import { Spinner } from '../../../../elements/spinner';

// Styles
import Styles from './styles/index.module.scss';

// Other
import { book } from '../../../../navigation/book';

export const LoginComponent: FC = observer(() => {
    useRedirect();
    const {
        register, errorMessage, errors, getValues,
    } = useLoginForm();
    const { uiStore } = useStore();
    const { login } = useProfile();

    const { isLoading } = uiStore;

    const loginHandler = () => {
        const { email, password } = getValues();
        const encryptedUser = btoa(`${email}:${password}`);

        login(encryptedUser);
    };

    const errorMessageJSX = errorMessage && (
        <p className = { Styles.error }>{ errorMessage }</p>
    );

    const loaderJSX = isLoading && (
        <Spinner isLoading = { isLoading } />
    );

    return (
        <section className = { Styles.login }>
            <div className = { Styles.content }>
                <h1>Добро пожаловать!</h1>
                <CustomInput
                    cx = { Styles.inputRow }
                    label = 'Электропочта'
                    type = 'email'
                    placeholder = 'Введите свою электропочту'
                    error = { errors.email }
                    errorCX = { Styles.error }
                    register = { register('email') } />
                <CustomInput
                    cx = { Styles.inputRow }
                    label = 'Пароль'
                    type = 'password'
                    placeholder = 'Введите свой пароль'
                    error = { errors.password }
                    errorCX = { Styles.error }
                    register = { register('password') } />
                { errorMessageJSX }
                <div>
                    <button
                        onClick = { loginHandler }
                        disabled = { isLoading }>
                        Войти в систему
                    </button>
                    <div className = { Styles.loginLink }>
                        <span>Если у вас нет аккаунта, пожалуйста</span>&nbsp;
                        <Link to = { book.registration.url }>зарегистрируйтесь</Link>.
                    </div>
                </div>
            </div>
            { loaderJSX }
        </section>
    );
});
