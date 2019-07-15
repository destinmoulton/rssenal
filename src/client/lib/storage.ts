class Storage {
    get(key: string): string {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): boolean {
        localStorage.setItem(key, value);
        return this.has(key);
    }

    has(key: string): boolean {
        return null !== localStorage.getItem(key);
    }

    remove(key: string): boolean {
        localStorage.removeItem(key);
        return !this.has(key);
    }
}

export default new Storage();
