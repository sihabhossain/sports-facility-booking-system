import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { FacilityServices } from "./facility.services";

// create facility
const createFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

// update facilty
const updateFacilty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "Facility updated successfully",
    data: result,
  });
});

// delete facilty
const deleteFacilty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacilityServices.deleteFacilityIntoDB(id);

  res.status(200).json({
    success: true,
    message: "Facility deleted successfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.getAllFacilities();

  res.status(200).json({
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const getSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacilityServices.getSingleFacility(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Facility not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Facility retrieved successfully",
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacilty,
  deleteFacilty,
  getAllFacilities,
  getSingleFacility,
};
