import { TFacility } from "./facility.interface";
import Facility from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityIntoDB = async (_id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate({ _id }, payload);
  return result;
};

const deleteFacilityIntoDB = async (_id: string) => {
  const result = await Facility.findByIdAndUpdate({ _id }, { isDeleted: true });
  return result;
};

const getAllFacilities = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
  getAllFacilities,
};
