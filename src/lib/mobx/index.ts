// Stores
import { TrackerStore } from './trackerStore';
import { UserStore } from './userStore';
import { UiStore } from './uiStore';

export class RootStore {
    trackerStore: TrackerStore;
    userStore: UserStore;
    uiStore: UiStore;

    constructor() {
        this.trackerStore = new TrackerStore(this);
        this.userStore = new UserStore(this);
        this.uiStore = new UiStore();
    }
}
