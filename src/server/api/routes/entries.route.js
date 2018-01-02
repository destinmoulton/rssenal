import express from "express";
const router = express.Router();

import entries from "../controllers/Entries.controller";

router.get("/", entries.get.bind(entries));
router.put("/:entryId", entries.updateSingle);

module.exports = router;
