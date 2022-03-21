// Core
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Электропочта является обязательной'),
    password: Yup.string()
        .required('Пароль является обязательным'),
});
