import {
    propertyComparator,
    comparatorAsc,
    comparatorDesc,
    stringComparatorAsc,
    stringComparatorDesc
} from "../sort";

const OBJECT_LESS = { name: "A", number: 1 };
const OBJECT_MORE = { name: "b", number: 2 }; // b is lower case on purpose to test string comp

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

        it("asc string", () => {});

        it("desc string", () => {});
    });
});
