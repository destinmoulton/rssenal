class Storage {
    get(key: string): string {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    has(key: string): boolean {
        return null !== localStorage.getItem(key);
    }
}

export default new Storage();
