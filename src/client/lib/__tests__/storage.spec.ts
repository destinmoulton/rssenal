import storage from "../storage";

describe("lib/storage.ts", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.resetAllMocks();
    });
    it("set() and has() work", () => {
        storage.set("test", "CONTENT");
        expect(storage.has("test")).toBe(true);
    });

    it("get() retrieves a stored item", () => {
        storage.set("test", "CONTENT");
        expect(storage.get("test")).toBe("CONTENT");
    });
});
