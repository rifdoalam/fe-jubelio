import { Pagination } from "@/stores/types/adjusment";
import clientSideApi from "./api/client-side";

export const fetchAdjustmentApi = async (pagination: Pagination) => {
  try {
    const res = await clientSideApi.get(`/adjusments?page=${pagination?.page}&limit=${pagination?.limit}`);
    return res;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const createAdjustmentApi = async (data: object) => {
  try {
    const res = await clientSideApi.post("/adjusments", data);
    return res;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const updateAdjustmentApi = async (id: number, data: object) => {
  try {
    const res = await clientSideApi.put(`/adjusments/${id}`, data);
    return res;
  } catch (error: unknown) {
    console.log(error);
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};
export const deleteAdjustmentApi = async (id: number) => {
  try {
    const res = await clientSideApi.delete(`/adjusments/${id}`);
    return res;
  } catch (error: unknown) {
    console.log(error);
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const fetchShowAdjustmentApi = async (id: number) => {
  try {
    const res = await clientSideApi.get(`/adjusments/show/${id}`);
    return res;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
