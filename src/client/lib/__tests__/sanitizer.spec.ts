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

    describe("sanitizeEntryTitle()", () => {
        it("removes all tags", () => {
            const ORIG =
                "<span>Test</span><h1>one</h1><h2>two</h2><h3>three</h3><h4>four</h4><h5>five</h5><img src='bling'/><a href='test.com'>link</a>";
            const EXPECTED = "Testonetwothreefourfivelink";

            const transformed = sanitizeEntryTitle(ORIG);
            expect(transformed).toBe(EXPECTED);
        });
    });
});
