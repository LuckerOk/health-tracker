// Core
import axios, { AxiosResponse } from 'axios';

// Config
import { root } from './config';

// Types
import { IProfile, IRecord, IResponseRecord } from '../types';

export const api = Object.freeze({
    users: {
        getMe: async (token: string | null): Promise<IProfile> => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const { data } = await axios.get<IProfile>(`${root}/profile`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        create: async (payload: IProfile): Promise<string> => {
            const { data } = await axios.post<AxiosResponse<string>>(`${root}/users`, payload);

            return data.data;
        },
        updateMe: async (payload: IProfile, token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const { data } = await axios.put<AxiosResponse<IProfile>>(`${root}/users`, payload, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        login: async (credentials: string): Promise<string> => {
            const { data } = await axios.get<AxiosResponse<string>>(`${root}/login`, {
                headers: {
                    authorization: `Basic ${credentials}`,
                },
            });

            return data.data;
        },
        logout: async (token: string | null): Promise<void> => {
            if (!token) {
                throw new Error('токен не указан');
            }

            await axios.get(`${root}/logout`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        },
    },
    tracker: {
        getScore: async (token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const { data } = await axios.get<AxiosResponse<number>>(`${root}/reports`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data.data;
        },
        getRecord: async (type: string, token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const params = new URLSearchParams({
                kind: type,
            });

            const { data } =  await axios.get<AxiosResponse<IResponseRecord>>(`${root}/records?${params}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        createRecord: async ({ type, record }: IRecord, token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const params = new URLSearchParams({
                kind: type,
            });

            const { data } = await axios.post(`${root}/records?${params}`, {
                value: record,
            }, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        updateRecord: async ({ type, record }: IRecord, hash: string, token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            const params = new URLSearchParams({
                kind: type,
            });

            const { data } = await axios.put(`${root}/records/${hash}/?${params}`, {
                value: record,
            }, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        removeAllRecords: async (token: string | null) => {
            if (!token) {
                throw new Error('токен не указан');
            }

            await axios.delete(`${root}/reports/reset`, {
                method:  'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        },
    },
});
