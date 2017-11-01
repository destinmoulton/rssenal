import express from "express";
const router = express.Router();

import feedGroups from "../controllers/FeedGroups.controller";

router.get('/', feedGroups.get_all);
router.post('/', feedGroups.add);
router.put('/', feedGroups.update_multiple);

router.get('/:feedGroupId', feedGroups.get_single);
router.delete('/:feedGroupId', feedGroups.delete_single);
router.put('/:feedGroupId', feedGroups.update_single);

export default router;