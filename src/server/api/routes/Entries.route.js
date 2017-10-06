import express from "express";
const router = express.Router();

import entries from "../controllers/Entries.controller";

router.get('/', entries.get_all);
router.put('/', entries.update_all);

export default router;