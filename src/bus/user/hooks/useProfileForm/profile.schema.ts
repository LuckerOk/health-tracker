// Core
import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
    email: Yup.string()
        .email('Электропочта неправильная')
        .required('Электропочта является обязательной'),
    password: Yup.string()
        .min(6, 'Пароль слишком короткий')
        .required('Пароль является обязательным'),
    sex: Yup.string()
        .oneOf(['m', 'f'], 'Пол неизвестен')
        .required('Пол является обязательным'),
    weight: Yup.number()
        .min(1, 'Вес должен быть больше 0')
        .required('Вес является обязательным'),
});
