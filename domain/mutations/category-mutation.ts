import { Category } from "@prisma/client";
import { api } from "../remote";
import { CategoryData } from "../types/category-data";

export const categoryMutation = {
  fnc: (data: CategoryData) => api.post<Category>("categories", data),
};
