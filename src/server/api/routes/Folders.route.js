import express from "express";
const router = express.Router();

import folders from "../controllers/Folders.controller";

router.get('/', folders.get_all);
router.post('/', folders.add);
router.put('/', folders.update_multiple);

router.get('/:folderId', folders.get_single);
router.delete('/:folderId', folders.delete_single);
router.put('/:folderId', folders.update_single);

export default router;