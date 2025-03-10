import clientSideApi from "./api/client-side";
import { Pagination } from "@/stores/types/product";
export const createProductApi = async (data: object) => {
  try {
    const res = await clientSideApi.post("/products", data);
    return res;
  } catch (error: unknown) {
    console.log(error);
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const fetchProductApi = async (pagination: Pagination) => {
  try {
    const res = await clientSideApi.get(`/products?page=${pagination?.page}&limit=${pagination?.limit}`);
    return res;
  } catch (error) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const fetchProductDetailApi = async (sku: string) => {
  try {
    const res = await clientSideApi.get(`/products/${sku}`);
    return res;
  } catch (error) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const updateProductApi = async (sku: string, data: object) => {
  try {
    const res = await clientSideApi.put(`/products/${sku}`, data);
    return res;
  } catch (error) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const deleteProductApi = async (sku: string) => {
  try {
    const res = await clientSideApi.delete(`/products/${sku}`);
    return res;
  } catch (error) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};
export const importProductApi = async () => {
  try {
    const res = await clientSideApi.get(`/products/import`);
    return res;
  } catch (error) {
    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || "service error";
    throw new Error(errorMessage);
  }
};
