import express from "express";
const router = express.Router();

import requireJWT from "../../lib/requireJWT";

import feeds from "../controllers/Feeds.controller";

router.get("/", requireJWT, feeds.get_all);
router.post("/", requireJWT, feeds.add);

router.get("/:feedId", requireJWT, feeds.get_single);
router.delete("/:feedId", requireJWT, feeds.delete_single);
router.put("/:feedId", requireJWT, feeds.update_single);
module.exports = router;
