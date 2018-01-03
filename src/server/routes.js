import express from "express";
import jwt from "express-jwt";
const router = express.Router();

import CONFIG from "./config/config";

router.use(
    "/api",
    jwt({
        secret: CONFIG.jwt.secret,
        credentialsRequired: false
    }),
    require("./api/routes")
);

module.exports = router;
