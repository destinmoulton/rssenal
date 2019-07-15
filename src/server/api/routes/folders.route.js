import express from "express";
const router = express.Router();

import requireJWT from "../../lib/requireJWT";
import folders from "../controllers/Folders.controller";

router.get("/", requireJWT, folders.get_all);
router.post("/", requireJWT, folders.add);
router.put("/", requireJWT, folders.update_multiple);

router.get("/:folderId", requireJWT, folders.get_single);
router.delete("/:folderId", requireJWT, folders.delete_single);
router.put("/:folderId", requireJWT, folders.update_single);

module.exports = router;
