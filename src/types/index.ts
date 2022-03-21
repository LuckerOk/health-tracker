export enum BtnText {
    SIGNUP = 'Зарегистрироваться',
    UPDATE = 'Обновить',
}

export enum Sex {
    MALE = 'm',
    FEMALE = 'f',
}

export interface IProfile {
    fname: string;
    lname: string;
    email: string;
    password: string;
    age: number;
    sex: string,
    height: number;
    weight: number;
}

export interface IRecord {
    type: string;
    record: ValueType;
}

export interface IResponseRecord {
    hash: string;
    value: ValueType;
}

export type ValueType = number | string | boolean;

export interface IQuestionPropTypes {
    title: string;
    variants?: {
        title: string;
        value: ValueType;
    }[];
    create: (type: string, currentValue: ValueType) => void;
    update: (type: string, currentValue: ValueType, hash: string) => void;
    type: string;
}
