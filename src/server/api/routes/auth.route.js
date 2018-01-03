import express from "express";
const router = express.Router();

import CONFIG from "../../config/config";

router.post("/", (req, res) => {
    const { username, password } = req.body;

    if (
        CONFIG.auth.username === username &&
        CONFIG.auth.password === password
    ) {
        res.json({
            status: "success"
        });
    }
    res.json({
        status: "error",
        message: "Username or password invalid."
    });
});

module.exports = router;
