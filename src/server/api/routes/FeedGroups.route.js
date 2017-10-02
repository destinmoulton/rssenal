import express from "express";
const router = express.Router();

import feedGroups from "../controllers/FeedGroups.controller";

router.get('/', feedGroups.get_all);
router.post('/', feedGroups.add);

router.get('/:feedGroupId', feedGroups.get_single);
router.delete('/:feedGroupId', feedGroups.delete_single);

export default router;