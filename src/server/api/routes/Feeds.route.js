import express from "express";
const router = express.Router();

import feeds from "../controllers/Feeds.controller";

router.get('/', feeds.get_all);
router.post('/', feeds.add);

router.get('/:feedId', feeds.get_single);
router.delete('/:feedId', feeds.delete_single);

export default router;