import { Router } from "express";
import * as c from "../controllers/stats.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/async-handler.js";

const r = Router();
r.use(authenticate);

r.get("/dashboard", asyncHandler(c.dashboard));
r.get("/par-district", asyncHandler(c.parDistrict));
r.get("/par-etat", asyncHandler(c.parEtat));
r.get("/par-contrat-achat", asyncHandler(c.parContratAchat));
r.get("/par-mois", asyncHandler(c.parMois));
r.get("/financier", asyncHandler(c.financier));
r.get("/prosol-par-district", asyncHandler(c.prosolDistrict));
r.get("/par-deblocage", asyncHandler(c.parDeblocage));
r.get("/recoulement-par-district", asyncHandler(c.recoulementParDistrict));
r.get("/diligences-par-district", asyncHandler(c.diligencesParDistrict));

export default r;
