import express from "express";
const router = express.Router();

import requireJWT from "../../lib/requireJWT";
import entries from "../controllers/Entries.controller";

router.get("/", requireJWT, entries.get.bind(entries));
router.put("/:entryId", requireJWT, entries.updateSingle);

module.exports = router;
