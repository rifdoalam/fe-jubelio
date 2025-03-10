export interface Product {
  id: number;
  title: string;
  sku: string;
  description?: string;
  price: number;
  stock: 0;
  image: string;
}

export interface Pagination {
  page?: number;
  limit?: number;
}

export interface ProductCreate {
  title: string;
  sku: string;
  description?: string;
  price: number;
  image: string;
}

export interface CombinedState {
  product: Product;
  setProduct: (product: Product) => void;
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  productList: Product[];
  setProductList: (productList: Product[]) => void;
  productCreate: ProductCreate;
  setProductCreate: (productCreate: ProductCreate) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
