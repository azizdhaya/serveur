import { Router } from "express";
import * as c from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { asyncHandler } from "../middleware/async-handler.js";

const r = Router();

r.post("/login", asyncHandler(c.login));
r.post("/refresh", asyncHandler(c.refresh));
r.post("/logout", asyncHandler(c.logout));
r.get(
  "/activity",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  asyncHandler(c.activity)
);
r.get("/me", authenticate, asyncHandler(c.me));
r.patch("/change-password", authenticate, asyncHandler(c.changePassword));

export default r;
