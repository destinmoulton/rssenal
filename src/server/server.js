import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import ApiRoutes from "./api.routes";

const port = process.env.PORT || 3000;

const app = express();

// Connect mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rssenal", { useMongoClient: true, promiseLibrary: global.Promise });

// Setup body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup the api routes
ApiRoutes(app);

app.listen(port);

// Output the server listening message 
console.log("-".repeat(50));
console.log("--- rssenal server listening on http://127.0.0.1:"+port)
console.log("-".repeat(50));