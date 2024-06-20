import mongoose, { Schema } from "mongoose";
import { TFacility } from "./facility.interface";

const FacilitySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

// Create a Model.
const Facility = mongoose.model<TFacility>("Facility", FacilitySchema);

export default Facility;
