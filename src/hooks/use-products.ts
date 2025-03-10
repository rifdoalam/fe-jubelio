import { productStore } from "@/stores/product-store";
import {
  createProductApi,
  deleteProductApi,
  fetchProductApi,
  fetchProductDetailApi,
  importProductApi,
  updateProductApi,
} from "@/services/product-api";
import { toast } from "sonner";
import { Pagination } from "@/stores/types/product";

export default function useProduct() {
  const { product, setProduct, pagination, setPagination, productList, setProductList, productCreate, setProductCreate, loading, setLoading } =
    productStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductCreate({ ...productCreate, [name]: value });
  };
  const handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductCreate({ ...productCreate, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createProductApi(productCreate);
      toast.success("Product added successfully", {
        position: "top-right",
      });
      await hanldeFetchProduct(pagination);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  const hanldeFetchProduct = async (paginate: Pagination) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout 5 detik
    try {
      const response = await fetchProductApi(paginate);
      setProductList(response?.data?.data);
    } catch (error) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };
  const handleFetchDetail = async (sku: string) => {
    try {
      const response = await fetchProductDetailApi(sku);
      setProduct(response?.data?.data);
    } catch (error: unknown) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  const handleUpdateProduct = async (sku: string) => {
    try {
      await updateProductApi(sku, product);
      toast.success("Product update successfully", {
        position: "top-right",
      });
      await handleFetchDetail(sku);
      await hanldeFetchProduct(pagination);
    } catch (error: unknown) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };

  const handleDeleteProduct = async (sku: string) => {
    try {
      await deleteProductApi(sku);
      toast.success("Product deleted successfully", {
        position: "top-right",
      });
      await hanldeFetchProduct(pagination);
    } catch (error: unknown) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };

  const handleImportProduct = async () => {
    setLoading(true);
    try {
      await importProductApi();
      toast.success("Product imported successfully", {
        position: "top-right",
      });
      await hanldeFetchProduct(pagination);
      setLoading(false);
    } catch (error: unknown) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  return {
    product,
    setProduct,
    handleOnChange,
    handleOnChangeTextArea,
    handleSubmit,
    hanldeFetchProduct,
    pagination,
    setPagination,
    productList,
    setProductList,
    handleFetchDetail,
    productCreate,
    setProductCreate,
    handleUpdateProduct,
    handleDeleteProduct,
    handleImportProduct,
    loading,
  };
}
