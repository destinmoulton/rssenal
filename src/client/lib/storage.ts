class Storage {
    get(key: string): string {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): void {
        return localStorage.setItem(key, value);
    }
}

export default new Storage();
