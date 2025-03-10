"use client";
import MainLayout from "@/components/layout/main-layout";
import { PaginationTable } from "@/components/pagination-table";
import { AdjustmentCreatePopup } from "@/components/popup/adjustment-create-popup";
import { AdjusmentDeletePopup } from "@/components/popup/adjustment-delete-popup";
import { AdjustmentEditPopup } from "@/components/popup/adjustment-edit-popup";
import useAdjusment from "@/hooks/use-adjustments";
import { useEffect } from "react";

export default function Adjustments() {
  const { handleFetchdata, adjustmentLists } = useAdjusment();

  useEffect(() => {
    handleFetchdata();
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex justify-end mb-5">
        <AdjustmentCreatePopup />
      </div>
      <div className="grid md:grid-cols-12 gap-3 ">
        <div className="col-span-12 relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {adjustmentLists?.data?.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item?.sku}
                  </th>
                  <td className="px-6 py-4">{item?.qty}</td>
                  <td className="px-6 py-4">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item?.amount)}</td>
                  <td className="px-6 py-4">
                    <div className="w-full flex gap-2 ">
                      <AdjustmentEditPopup id={item?.id} index={index} />
                      <AdjusmentDeletePopup id={item?.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-12 flex justify-center md:justify-between items-center mt-5">
        <div className="hidden md:flex justify-center items-center space-x-2">
          <span className="text-sm">
            Showing {adjustmentLists?.pagination?.page} to {adjustmentLists?.pagination?.totalPages} of {adjustmentLists?.pagination?.totalData}{" "}
            entries
          </span>
        </div>
        <PaginationTable />
      </div>
    </MainLayout>
  );
}
