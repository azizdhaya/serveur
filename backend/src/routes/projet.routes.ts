import { Router } from "express";
import multer from "multer";
import * as c from "../controllers/projet.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { asyncHandler } from "../middleware/async-handler.js";

const r = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 },
});

r.use(authenticate);

r.get("/export/excel", asyncHandler(c.exportExcel));
r.post("/export/excel", asyncHandler(c.exportExcelPost));
r.get("/export/pdf/columns", asyncHandler(c.exportPdfColumnsMeta));
r.post("/export/pdf", asyncHandler(c.exportPdfPost));
r.get("/export/pdf", asyncHandler(c.exportPdf));
r.post(
  "/import",
  authorize("SUPER_ADMIN", "ADMIN", "TECHNICIEN"),
  upload.single("file"),
  asyncHandler(c.importExcel)
);
r.post("/archive", asyncHandler(c.archiveMany));
r.get("/", asyncHandler(c.list));
r.post("/", asyncHandler(c.create));

r.post("/:id/export/pdf", asyncHandler(c.exportOnePdfPost));
r.get("/:id/export/pdf", asyncHandler(c.exportOnePdf));
r.get("/:id", asyncHandler(c.getOne));
r.put("/:id", asyncHandler(c.update));
r.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), asyncHandler(c.remove));

export default r;
