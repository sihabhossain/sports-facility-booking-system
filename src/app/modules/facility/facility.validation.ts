import { z } from "zod";

// Schema for creating a new Facility
const createFacilityValidation = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    pricePerHour: z
      .number()
      .positive("Price per hour must be a positive number"),
    location: z.string().nonempty("Location is required"),
    isDeleted: z.boolean().default(false),
  }),
});

// Schema for updating an existing Facility
const updateFacilityValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive("Price per hour must be a positive number")
      .optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const facilityValidations = {
  createFacilityValidation,
  updateFacilityValidation,
};
