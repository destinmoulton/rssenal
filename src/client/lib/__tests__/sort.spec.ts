import { propertyComparator } from "../sort";

const OBJECT_LESS = { name: "a", number: 1 }; // a is lower case on purpose to test string comp
const OBJECT_MORE = { name: "B", number: 2 };

describe("lib/sort.ts", () => {
    describe("propertyComparator()", () => {
        describe("asc non-string", () => {
            it("returns -1 for a lt b", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_MORE,
                    "asc",
                    "number",
                    false
                );

                expect(comp).toBe(-1);
            });
            it("returns 1 for a gt b", () => {
                const comp = propertyComparator(
                    OBJECT_MORE,
                    OBJECT_LESS,
                    "asc",
                    "number",
                    false
                );

                expect(comp).toBe(1);
            });
            it("returns 0 for equivalent", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_LESS,
                    "asc",
                    "number",
                    false
                );

                expect(comp).toBe(0);
            });
        });

        describe("desc non-string", () => {
            it("returns -1 when a gt b", () => {
                const comp = propertyComparator(
                    OBJECT_MORE,
                    OBJECT_LESS,
                    "desc",
                    "number",
                    false
                );

                expect(comp).toBe(-1);
            });
            it("returns 1 when a lt b", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_MORE,
                    "desc",
                    "number",
                    false
                );

                expect(comp).toBe(1);
            });
            it("returns 0 for equivalent", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_LESS,
                    "desc",
                    "number",
                    false
                );

                expect(comp).toBe(0);
            });
        });

        describe("asc string", () => {
            it("returns -1 for a before b", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_MORE,
                    "asc",
                    "name",
                    true
                );

                expect(comp).toBe(-1);
            });
            it("returns 1 for a after b", () => {
                const comp = propertyComparator(
                    OBJECT_MORE,
                    OBJECT_LESS,
                    "asc",
                    "name",
                    true
                );

                expect(comp).toBe(1);
            });
            it("returns 0 for equivalent", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_LESS,
                    "asc",
                    "name",
                    true
                );

                expect(comp).toBe(0);
            });
        });

        describe("desc string", () => {
            it("returns -1 when a gt b", () => {
                const comp = propertyComparator(
                    OBJECT_MORE,
                    OBJECT_LESS,
                    "desc",
                    "name",
                    true
                );

                expect(comp).toBe(-1);
            });
            it("returns 1 when a lt b", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_MORE,
                    "desc",
                    "name",
                    true
                );

                expect(comp).toBe(1);
            });
            it("returns 0 for equivalent", () => {
                const comp = propertyComparator(
                    OBJECT_LESS,
                    OBJECT_LESS,
                    "desc",
                    "name",
                    true
                );

                expect(comp).toBe(0);
            });
        });
    });
});
