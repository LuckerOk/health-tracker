// Core
import { makeAutoObservable } from 'mobx';

export class UiStore {
    errorStatusCode: number | null;
    isLoading: boolean;

    constructor() {
        this.errorStatusCode = null;
        this.isLoading = false;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setErrorStatusCode(statusCode: number | null) {
        this.errorStatusCode = statusCode;
    }

    setIsLoading(status: boolean) {
        this.isLoading = status;
    }
}
