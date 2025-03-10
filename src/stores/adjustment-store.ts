import { create } from "zustand";
import { Adjustment, AdjustmentCreate, CombinedState, Pagination } from "./types/adjusment";

export const adjusmentStore = create<CombinedState>((set) => ({
  adjustmentLists: [],
  setAdjustmentLists: (lists: Adjustment[]) => set({ adjustmentLists: lists }),
  adjustmentCreate: {} as AdjustmentCreate,
  setAdjustmentCreate: (create: AdjustmentCreate) => set({ adjustmentCreate: create }),
  pagination: { page: 1, limit: 10 },
  setPagination: (pagination: Pagination) => set({ pagination }),
  adjustment: { id: 0, sku: "", qty: 0, amount: 0, created_at: "" } as Adjustment,
  setAdjustment: (adjustment: Adjustment) =>
    set((state) => ({
      ...state,
      adjustment,
    })),
}));
