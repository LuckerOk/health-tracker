// Core
import { makeAutoObservable } from 'mobx';

// API
import { api } from '../../api';
import { IResponseRecord, ValueType } from '../../types';

// Types
import { RootStore } from '.';

type Record = { [key: string]: IResponseRecord };

export class TrackerStore {
    root: RootStore;
    records: Record;
    score: number | null;

    constructor(root: RootStore) {
        this.root = root;
        this.records = {};
        this.score = null;

        makeAutoObservable(this);
    }

    * createRecord(type: string, record: ValueType) {
        try {
            this.root.uiStore.setIsLoading(true);

            const data: IResponseRecord
                = yield api.tracker.createRecord(
                    { type, record },
                    this.root.userStore.token,
                );

            this.records[ type ] = data;
            yield this.fetchScore();
        } catch (error) {
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * updateRecord(type: string, record: ValueType, hash: string) {
        try {
            this.root.uiStore.setIsLoading(true);

            const data: IResponseRecord
                = yield api.tracker.updateRecord(
                    { type, record },
                    hash,
                    this.root.userStore.token,
                );

            this.records[ type ] = data;
            yield this.fetchScore();
        } catch (error) {
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * removeAllRecords() {
        try {
            this.root.uiStore.setErrorStatusCode(null);
            this.root.uiStore.setIsLoading(true);

            yield api.tracker.removeAllRecords(this.root.userStore.token);
            yield this.fetchScore();
        } catch (error) {
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * getRecord(type: string) {
        try {
            this.root.uiStore.setIsLoading(true);

            const record: IResponseRecord
                = yield api.tracker.getRecord(type, this.root.userStore.token);

            this.records[ type ] = record;
        } catch (error) {
            this.root.uiStore.setErrorStatusCode(error.response.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }

    * fetchScore() {
        try {
            this.root.uiStore.setIsLoading(true);

            const data: number
                = yield api.tracker.getScore(this.root.userStore.token);

            this.score = data;
        } catch (error) {
            if (error?.response?.status === 401) {
                this.root.userStore.token = '';
                localStorage.removeItem('token');
            }
            this.root.uiStore.setErrorStatusCode(error.response?.status);
        } finally {
            this.root.uiStore.setIsLoading(false);
        }
    }
}
