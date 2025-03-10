import { create } from "zustand";
import { Adjustment, AdjustmentCreate, AdjustmentList, CombinedState, Pagination } from "./types/adjusment";

export const adjusmentStore = create<CombinedState>((set) => ({
  adjustmentLists: {
    data: [], // This should be an array of Adjustment items
    pagination: { page: 1, limit: 10, totalPages: 1, totalData: 0 }, // Default pagination object
  } as AdjustmentList,
  setAdjustmentLists: (lists: AdjustmentList) => set({ adjustmentLists: lists }),
  adjustmentCreate: {} as AdjustmentCreate,
  setAdjustmentCreate: (create: AdjustmentCreate) => set({ adjustmentCreate: create }),
  pagination: { page: 1, limit: 10, totalPages: 0, totalData: 0 },
  setPagination: (pagination: Pagination) => set({ pagination }),
  adjustment: { id: 0, sku: "", qty: 0, amount: 0, created_at: "" } as Adjustment,
  setAdjustment: (adjustment: Adjustment) =>
    set((state) => ({
      ...state,
      adjustment,
    })),
}));
