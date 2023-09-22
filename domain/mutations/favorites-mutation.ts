import { api } from "../remote";
import { getData } from "../remote/response/data";

export const favoritesMutation = {
  fnc: (id?: string) => api.put("favorites", JSON.stringify(id)).then(getData),
};
