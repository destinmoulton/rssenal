import express from "express";
const router = express.Router();

import validateFeedURL from "../controllers/ValidateFeedURL.controller";

router.post('/', validateFeedURL.validate_single);

module.exports = router;