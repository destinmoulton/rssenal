import express from "express";
const router = express.Router();

router.use('/entries', require("./entries.route"));
router.use('/feeds', require("./feeds.route"));
router.use('/folders', require("./folders.route"));
router.use('/validatefeedurl', require("./validatefeedurl.route"));

module.exports = router;