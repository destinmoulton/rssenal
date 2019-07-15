let INITIAL = {};
let EXPECTED = {};
let WITHOUT = {};

INITIAL["a"] = `
<a href="/local_address.html">Gizoogle</a>
<a target="_self" href="http://www.gizoogle.com">Gizoogle</a>
<a href="http://testurl.com"></a>
`;

EXPECTED["a"] = `
<span>Gizoogle</span>
<a href="http://www.gizoogle.com" target="_blank">Gizoogle</a>

`;

INITIAL["b"] = `
<b class="will-be-removed">Test Bold</b>
<strong class="will-be-removed">Test Bold</strong>
`;

EXPECTED["b"] = `
<strong>Test Bold</strong>
<strong>Test Bold</strong>
`;

INITIAL["br"] = `
<br/>
`;

EXPECTED["br"] = `
<br />
`;

INITIAL["blockquote"] = `
<blockquote class="will-be-removed">Test quotation</blockquote>
`;

EXPECTED["blockquote"] = `
<blockquote>Test quotation</blockquote>
`;

INITIAL["code"] = `
<pre><code class="will-be-removed">$("test").html();</code></pre>
`;

EXPECTED["code"] = `
<pre><code>$("test").html();</code></pre>
`;

INITIAL["h"] = `
<h1 class="test-class" id="test-id">Test h1</h1>
<h2 class="test-class" id="test-id">Test h2</h2>
<h3 class="test-class" id="test-id">Test h3</h3>
<h4 class="test-class" id="test-id">Test h4</h4>
<h5 class="test-class" id="test-id">Test h5</h5>
`;

EXPECTED["h"] = `
<strong>Test h1</strong>
<strong>Test h2</strong>
<strong>Test h3</strong>
<strong>Test h4</strong>
<strong>Test h5</strong>
`;

INITIAL["i"] = `
<i class="will-be-removed">Test i</i>
<em class="will-be-removed">Test em</em>
`;

EXPECTED["i"] = `
<em>Test i</em>
<em>Test em</em>
`;

INITIAL["img"] = `
<img src="/local_image.png" />
<img src="http://test.com/test_image.png" class="test-image-class" id="image-id" />
`;

EXPECTED["img"] = `
<span></span>
<img src="http://test.com/test_image.png" />
`;

WITHOUT["img"] = `
<span></span>

`;

INITIAL["l"] = `
<ol class="test-class id="test-id">
    <li class="test-class id="test-id">List Item</li>
</ol>
<ul class="test-class id="test-id">
    <li class="test-class id="test-id">List Item</li>
</ul>
`;

EXPECTED["l"] = `
<ol>
    <li>List Item</li>
</ol>
<ul>
    <li>List Item</li>
</ul>
`;

INITIAL["p"] = `
<p class="will-be-stripped">Test content</p>
`;

EXPECTED["p"] = `
<p>Test content</p>
`;

INITIAL["span"] = `
<span class="will-be-stripped">Test span</span>
`;

EXPECTED["span"] = `
<span>Test span</span>
`;

INITIAL["table"] = `
<table class="ok-class">
    <thead class="will-be-stripped">
        <tr class="will-be-stripped">
            <th class="will-be-stripped">Header Col 1</th>
        </tr>
    </thead>
    <tbody class="will-be-stripped">
        <tr class="will-be-stripped">
            <td class="will-be-stripped">Body Col 1</td>
        </tr>
    </tbody>
</table>
`;

EXPECTED["table"] = `
<table>
    <thead>
        <tr>
            <th>Header Col 1</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Body Col 1</td>
        </tr>
    </tbody>
</table>
`;

let INITIAL_HTML = "";
let EXPECTED_HTML_WITH_IMG = "";
let EXPECTED_HTML_WITHOUT_IMG = "";

const tags = Object.keys(INITIAL);
for (let tag of tags) {
    INITIAL_HTML += INITIAL[tag];
    EXPECTED_HTML_WITH_IMG += EXPECTED[tag];

    if (tag === "img") {
        EXPECTED_HTML_WITHOUT_IMG += WITHOUT[tag];
    } else {
        EXPECTED_HTML_WITHOUT_IMG += EXPECTED[tag];
    }
}

export { INITIAL_HTML, EXPECTED_HTML_WITH_IMG, EXPECTED_HTML_WITHOUT_IMG };
