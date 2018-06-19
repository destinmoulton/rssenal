import { sanitizeEntryContent, sanitizeEntryTitle } from "../sanitizer";

import {
    INITIAL_HTML,
    EXPECTED_HTML_WITH_IMG,
    EXPECTED_HTML_WITHOUT_IMG
} from "../../../../test/data/sanitizer.data";

describe("lib/sanitizer.ts", () => {
    describe("sanitizeEntryContent() cleans up HTML tags", () => {
        it("transforms tags, with images", () => {
            const transformed = sanitizeEntryContent(INITIAL_HTML, true);
            expect(transformed).toBe(EXPECTED_HTML_WITH_IMG);
            expect(transformed).toMatchSnapshot();
        });
        it("transforms tags, stripping images", () => {
            const transformed = sanitizeEntryContent(INITIAL_HTML, false);
            expect(transformed).toBe(EXPECTED_HTML_WITHOUT_IMG);
            expect(transformed).toMatchSnapshot();
        });
    });
});
