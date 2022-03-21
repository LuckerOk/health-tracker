// Core
import { makeAutoObservable } from 'mobx';

// API
import { api } from '../../api';

// Types
import { IProfile } from '../../types';
import { RootStore } from '.';

export class UserStore {
    root: RootStore;
    profile: IProfile | null;
    token: string | null;

    constructor(root: RootStore) {
        this.root = root;
        this.profile = null;
        this.token = null;

        makeAutoObservable(this);
    }

    * loginUser(credentials: string) {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            const token: string = yield api.users.login(credentials);

            localStorage.setItem('token', token);
            this.setToken(token);
        } catch (error) {
            if (error?.response?.status === 401) {
                this.token = '';
                localStorage.removeItem('token');
            }
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            yield this.root.uiStore.setIsLoading(false);
        }
    }

    * registerUser(user: IProfile) {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            const token: string = yield api.users.create(user);

            localStorage.setItem('token', token);
            this.setToken(token);
        } catch (error) {
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * getMe() {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            const profile: IProfile = yield api.users.getMe(this.token);

            this.profile = profile;
        } catch (error) {
            if (error?.response?.status === 401) {
                this.token = '';
                localStorage.removeItem('token');
            }
            this.root.uiStore.setErrorStatusCode(error.response?.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * logoutUser() {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            yield api.users.logout(this.token);
            localStorage.removeItem('token');
            this.token = null;
        } catch (error) {
            if (error?.response?.status === 401) {
                this.token = '';
                localStorage.removeItem('token');
            }
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * updateMe(user: IProfile) {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            const { data, token }: { data: IProfile, token: string }
                = yield api.users.updateMe(user, this.token);

            this.profile = data;
            this.token = token;
        } catch (error) {
            if (error?.response?.status === 401) {
                this.token = '';
                localStorage.removeItem('token');
            }
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    setToken(token: string) {
        this.token = token;
    }
}
