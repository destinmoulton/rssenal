import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.resolve(__dirname, '../public');

const app = express();

// Connect mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rssenal", { useMongoClient: true, promiseLibrary: global.Promise });

// Setup body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(PUBLIC_PATH));

// Setup the routes
app.use("/", require("./routes"));

// Allow all URI's; handle by react router
app.get('*', (req, res)=>{
    res.sendFile(path.join(PUBLIC_PATH, '/index.html'));
});

app.listen(PORT);

// Output the server listening message 
console.log("-".repeat(50));
console.log("--- rssenal server listening on http://127.0.0.1:" + PORT)
console.log("-".repeat(50));