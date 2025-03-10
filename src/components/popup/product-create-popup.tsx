"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useProduct from "@/hooks/use-products";

interface FormEvent {
  preventDefault: () => void;
}

export function ProductCreatePopup() {
  const { handleOnChange, handleOnChangeTextArea, handleSubmit } = useProduct();

  const submited = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>Create new product</DialogDescription>
        </DialogHeader>
        <form onSubmit={submited} className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>SKU </Label>
              <Input type="text" name="sku" placeholder="Input product sku" onChange={handleOnChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input type="text" name="title" placeholder="Input product title" onChange={handleOnChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea className="w-full" name="description" placeholder="Input product description" onChange={handleOnChangeTextArea} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Price</Label>
              <Input type="number" name="price" placeholder="Input product price" onChange={handleOnChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <Input type="url" name="image" placeholder="Input product image link" onChange={handleOnChange} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-3 w-full">
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
