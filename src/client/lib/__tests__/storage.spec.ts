import storage from "../storage";

describe("lib/storage.ts", () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it("set() and has() work", () => {
        storage.set("test", "CONTENT");
        expect(storage.has("test")).toBe(true);
    });

    it("get() retrieves a stored item", () => {
        storage.set("testget", "get CONTENT");
        expect(storage.get("testget")).toBe("get CONTENT");
    });
});
