"use client";
import { Eye } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import useProduct from "@/hooks/use-products";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ProductDetailPopup({ sku }: { sku: string }) {
  const { handleFetchDetail, product, setProduct, handleUpdateProduct } = useProduct();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleUpdateProduct(product?.sku);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleFetchDetail(sku)}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-8/12">
        <DialogHeader>
          <DialogTitle>Detail Product</DialogTitle>
          <DialogDescription>Detail data product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full max-h-[80vh] overflow-auto">
          <div className="w-full flex flex-col md:flex-row gap-4 h-full ">
            <div className="w-full md:w-6/12 h-full bg-muted rounded-lg mb-4 overflow-hidden flex justify-center items-center relative">
              <div className="absolute top-4 left-2">
                <span className="bg-white px-4 py-2 rounded-lg border">{product?.stock} Stock</span>
              </div>
              {product?.image ? (
                <img src={product.image} width={300} height={300} className="object-cover" alt={product?.title} />
              ) : (
                <p className="text-sm text-gray-500">No image available</p>
              )}
            </div>
            <div className="w-full md:w-6/12 h-full flex flex-col gap-2  overflow-auto">
              <div className="w-full flex flex-col border-b py-2 gap-1">
                <Label className="font-bold text-2md">SKU</Label>
                <p className="text-sm">{product?.sku}</p>
              </div>
              <div className="w-full flex flex-col py-2 gap-1">
                <Label className="font-bold text-2md">Title</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Input product title"
                  value={product?.title}
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="w-full flex flex-col  py-2 gap-1">
                <Label className="font-bold text-2md">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Input product description"
                  rows={7}
                  value={product?.description}
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="w-full flex flex-col  py-2 gap-1">
                <Label className="font-bold text-2md">Price</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Input product price"
                  value={product?.price}
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="w-full flex flex-col  py-2 gap-1">
                <Label className="font-bold text-2md">Image (URL)</Label>
                <Input
                  type="url"
                  name="image"
                  placeholder="Input product image"
                  value={product?.image}
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0">
            <Button type="submit" className="w-full">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
