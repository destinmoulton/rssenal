import storage from "../storage";

describe("lib/storage.ts", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("set() works", () => {
        expect(storage.set("test", "CONTENT")).toBe(true);
    });

    it("has() works", () => {
        storage.set("testhas", "TEST HAS");
        expect(storage.has("testhas")).toBe(true);
    });

    it("get() retrieves a stored item", () => {
        storage.set("testget", "TEST GET");
        expect(storage.get("testget")).toBe("TEST GET");
    });

    it("remove() works", () => {
        storage.set("testremove", "TEST REMOVE");
        expect(storage.remove("testremove")).toBe(true);
    });
});
