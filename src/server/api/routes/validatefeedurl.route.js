import express from "express";
const router = express.Router();

import requireJWT from "../../lib/requireJWT";
import validateFeedURL from "../controllers/ValidateFeedURL.controller";

router.post("/", requireJWT, validateFeedURL.validate_single);

module.exports = router;
