"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useAdjusment from "@/hooks/use-adjustments";
import { Dispatch, SetStateAction } from "react";

interface AdjustmentCreatePopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export function AdjustmentCreatePopup({ open, setOpen }: AdjustmentCreatePopupProps) {
  const { handleOnChange, handleCreateData } = useAdjusment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateData();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(open ? false : true)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Create Adjustment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Adjustment</DialogTitle>
          <DialogDescription>Create new adjustment</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>SKU </Label>
              <Input type="text" name="sku" placeholder="Input product sku" onChange={handleOnChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity</Label>
              <Input type="number" name="qty" placeholder="Input adjustment quantity" onChange={handleOnChange} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-3 w-full">
            <Button type="submit" className="w-full">
              Add Adjustment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
