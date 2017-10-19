import express from "express";
const router = express.Router();

import entries from "../controllers/Entries.controller";

router.get('/', entries.getAll);
router.put('/:entryId', entries.updateSingle);

export default router;