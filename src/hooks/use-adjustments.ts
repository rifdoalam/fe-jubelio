"use client";
import { createAdjustmentApi, fetchAdjustmentApi, fetchShowAdjustmentApi, updateAdjustmentApi, deleteAdjustmentApi } from "@/services/adjustment-api";
import { adjusmentStore } from "@/stores/adjustment-store";

import React from "react";
import { toast } from "sonner";

export default function useAdjusment() {
  const { adjustmentCreate, setAdjustmentCreate, setAdjustmentLists, adjustmentLists, setAdjustment, adjustment, pagination, setPagination } =
    adjusmentStore();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdjustmentCreate({ ...adjustmentCreate, [name]: value });
  };
  const handleCreateData = async () => {
    try {
      const res = await createAdjustmentApi(adjustmentCreate);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
        });
      }
      await handleFetchdata();
    } catch (error: unknown) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  const handleFetchdata = async () => {
    try {
      const res = await fetchAdjustmentApi(pagination);
      setAdjustmentLists({ data: res.data?.data, pagination: res.data.pagination });
    } catch (error) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  const handleFetchDetailData = async (id: number) => {
    try {
      const res = await fetchShowAdjustmentApi(id);
      const adjustmentData = res?.data?.data;
      if (!adjustmentData) throw new Error("No adjustment data found");
      setAdjustment(adjustmentData);
    } catch (error) {
      console.error(error);
      toast.error((error as Error)?.message || "Failed to fetch adjustment data", {
        position: "top-right",
      });
    }
  };

  const hanldeUpdateData = async () => {
    try {
      const res = await updateAdjustmentApi(adjustment?.id, { qty: Number(adjustment?.qty) });
      if (res.status === 200) {
        toast.success(res.data?.message, { position: "top-right" });
        handleFetchdata();
      }
    } catch (error) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  const hanldeDeleteData = async (id: number) => {
    try {
      const res = await deleteAdjustmentApi(id);
      if (res.status === 200) {
        toast.success(res.data?.message, { position: "top-right" });
        handleFetchdata();
      }
    } catch (error) {
      toast.error((error as Error)?.message, {
        position: "top-right",
      });
    }
  };
  return {
    adjustmentCreate,
    setAdjustmentCreate,
    handleOnChange,
    handleCreateData,
    handleFetchdata,
    setAdjustmentLists,
    adjustmentLists,
    handleFetchDetailData,
    setAdjustment,
    adjustment,
    hanldeUpdateData,
    hanldeDeleteData,
    pagination,
    setPagination,
  };
}
