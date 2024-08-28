import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityControllers } from "./facility.controller";
import { facilityValidations } from "./facility.validation";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";

const router = express.Router();

router.post(
  "/facility",
  validateRequest(facilityValidations.createFacilityValidation),
  auth(USER_Role.ADMIN),
  FacilityControllers.createFacility
);

router.put(
  "/facility/:id",
  validateRequest(facilityValidations.updateFacilityValidation),
  auth(USER_Role.ADMIN),
  FacilityControllers.updateFacilty
);

router.delete(
  "/facility/:id",
  auth(USER_Role.ADMIN),
  FacilityControllers.deleteFacilty
);

router.get("/facility", FacilityControllers.getAllFacilities);

export const facilityRoutes = router;
