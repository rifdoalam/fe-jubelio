export interface Adjustment {
  id: number;
  sku: string;
  qty: number;
  amount: number;
  created_at: string;
}

export interface AdjustmentCreate {
  sku: string;
  qty: number;
}
export interface AdjustmentList {
  data: Adjustment[];
  pagination: Pagination;
}
export interface Pagination {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}

export interface CombinedState {
  adjustmentLists: AdjustmentList;
  setAdjustmentLists: (adjustmentList: AdjustmentList) => void;
  adjustmentCreate: AdjustmentCreate;
  setAdjustmentCreate: (adjustmentCreate: AdjustmentCreate) => void;
  pagination: Pagination;
  setPagination: (paginationList: Pagination) => void;
  adjustment: Adjustment;
  setAdjustment: (adjustment: Adjustment) => void;
}
