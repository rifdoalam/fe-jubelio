import { create } from "zustand";
import { Product, CombinedState, Pagination, ProductCreate } from "./types/product";

export const productStore = create<CombinedState>((set) => ({
  productList: [],
  product: {
    id: 0,
    sku: "",
    title: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  },
  loading: false,
  setLoading: (loading: boolean) =>
    set((state) => ({
      ...state,
      loading,
    })),
  setProduct: (product: Product) =>
    set((state) => ({
      ...state,
      product,
    })),
  pagination: {
    page: 1,
    limit: 8,
  },
  setPagination: (pagination: Pagination) =>
    set((state) => ({
      ...state,
      pagination,
    })),
  setProductList: (productList: Product[]) =>
    set((state) => ({
      ...state,
      productList,
    })),
  productCreate: {
    sku: "",
    title: "",
    description: "",
    price: 0,
    image: "",
  },
  setProductCreate: (productCreate: ProductCreate) =>
    set((state) => ({
      ...state,
      productCreate,
    })),
}));
