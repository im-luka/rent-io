import { AxiosResponse } from "axios";

export const getData = <T>(response: AxiosResponse<T>) => response.data;
