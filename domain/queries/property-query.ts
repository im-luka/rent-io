import { Property } from "@/types/property";
import { api } from "../remote";
import { PROPERTIES_QUERY_KEY } from "./properties-query";
import { getData } from "../remote/response/data";

export const propertyQuery = {
  key: (id: string) => [PROPERTIES_QUERY_KEY, id],
  fnc: (id: string) =>
    api.get<Property>(`${PROPERTIES_QUERY_KEY}/${id}`).then(getData),
};
