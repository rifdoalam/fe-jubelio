"use client";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useAdjusment from "@/hooks/use-adjustments";
import React from "react";
interface AdjustmentEditProps {
  id: number;
  index: number;
}
export function AdjustmentEditPopup({ id, index }: AdjustmentEditProps) {
  const { handleFetchDetailData, adjustment, setAdjustment, hanldeUpdateData } = useAdjusment();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hanldeUpdateData();
  };
  const handleOpenDialog = async () => {
    await handleFetchDetailData(id);
  };
  return (
    <Dialog key={index}>
      <DialogTrigger asChild onClick={handleOpenDialog}>
        <Button variant={"outline"}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Adjustment </DialogTitle>
          <DialogDescription>Edit Adjustment</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>SKU </Label>
              <Input type="text" name="sku" className="bg-muted" placeholder="Input product sku" value={adjustment?.sku} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                name="qty"
                placeholder="Input adjustment quantity"
                value={Number(adjustment?.qty)}
                onChange={(e) => setAdjustment({ ...adjustment, [e.target.name]: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-3 w-full">
            <Button type="submit" className="w-full">
              Update Adjustment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
