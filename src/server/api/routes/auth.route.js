import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

import CONFIG from "../../config/config";

router.post("/", (req, res) => {
    const { username, password } = req.body;

    if (
        CONFIG.auth.username === username &&
        CONFIG.auth.password === password
    ) {
        const payload = {
            isAuthenticated: true
        };
        const expiration = { expiresIn: 86400 }; // 24 hour expiration

        // Generate the token
        const token = jwt.sign(payload, CONFIG.jwt.secret, expiration);
        res.json({
            status: "success",
            token
        });
    }
    res.json({
        status: "error",
        message: "Username or password invalid."
    });
});

module.exports = router;
