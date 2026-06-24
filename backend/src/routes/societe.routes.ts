import { Router } from "express";
import * as c from "../controllers/societe.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { asyncHandler } from "../middleware/async-handler.js";

const r = Router();

r.use(authenticate);
r.use(authorize("SUPER_ADMIN", "ADMIN"));

r.get("/", asyncHandler(c.getInfo));
r.put("/", asyncHandler(c.updateInfo));

export default r;
