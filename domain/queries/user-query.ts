import { User } from "@/types/user";
import { api } from "../remote";
import { getData } from "../remote/response/data";

const USER_QUERY_KEY = "users";

export const userQuery = {
  key: (id: string) => [USER_QUERY_KEY, id],
  fnc: (id: string) => api.get<User>(`${USER_QUERY_KEY}/${id}`).then(getData),
};
