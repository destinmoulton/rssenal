const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const jestEnzyme = require("jest-enzyme");

enzyme.configure({
    adapter: new Adapter()
});
