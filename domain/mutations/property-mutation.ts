import { api } from "../remote";
import { PropertyData } from "../types/property-data";

export const propertyMutation = {
  fnc: (data: PropertyData) => api.post<PropertyData>("properties", data),
};
