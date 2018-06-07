const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const jestEnzyme = require("jest-enzyme");

//
// Enzyme Globals
//
global.enzyme = enzyme;
global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.mount = enzyme.mount;

enzyme.configure({
    adapter: new Adapter()
});
