import { Router } from "express";
import * as c from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { asyncHandler } from "../middleware/async-handler.js";

const r = Router();

r.use(authenticate);
r.get("/commercials", asyncHandler(c.commercials));
r.get("/", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.list));
r.get("/:id", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.getOne));
r.post("/", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.create));
r.put("/:id", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.update));
r.patch("/:id/toggle", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.toggle));
r.delete("/:id", authorize("SUPER_ADMIN"), asyncHandler(c.remove));
r.post(
  "/:id/reset-password",
  authorize("SUPER_ADMIN", "ADMIN"),
  asyncHandler(c.resetPassword)
);

export default r;
