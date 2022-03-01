export default class SessionStore {
    private store: { [ key: string ]: any };
    private static instance: SessionStore | null = null;

    constructor() {
        this.store = {};
    }

    public get(key: string) {
        return this.store[key];
    }

    public set(key: string, value: any) {
        this.store[key] = value;
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new SessionStore();
        }

        return this.instance;
    }
}