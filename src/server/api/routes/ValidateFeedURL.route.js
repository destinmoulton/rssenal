import express from "express";
const router = express.Router();

import validateFeedURL from "../controllers/ValidateFeedURL.controller";

router.get('/:feedUrl', validateFeedURL.validate_single);

export default router;