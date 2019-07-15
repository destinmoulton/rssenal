const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const jestEnzyme = require("jest-enzyme");
const fetchPonyFill = require("fetch-ponyfill");

const { Request, Response, Headers } = fetchPonyFill();

enzyme.configure({
    adapter: new Adapter()
});

global.Response = Response;
global.Headers = Headers;
global.Request = Request;
