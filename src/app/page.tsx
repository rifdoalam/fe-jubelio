"use client";
import MainLayout from "@/components/layout/main-layout";
import { ProductCreatePopup } from "@/components/popup/product-create-popup";
import { ProductDeletePopup } from "@/components/popup/product-delete-popup";
import { ProductDetailPopup } from "@/components/popup/product-detail-popup";
import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import useProduct from "@/hooks/use-products";
import { Import } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { hanldeFetchProduct, pagination, setPagination, productList, handleImportProduct, loading } = useProduct();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    hanldeFetchProduct(pagination);
  }, [pagination]);

  const handleScroll = () => {
    if (sectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1 && !isFetching) {
        setIsFetching(true);
      }
    }
  };

  useEffect(() => {
    if (isFetching) {
      setPagination({ ...pagination, limit: (pagination?.limit ?? 0) + 8 });
      setIsFetching(false);
    }
  }, [isFetching, setPagination]);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (section) {
        section.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex justify-end mb-5 gap-2">
        <Button disabled={loading} type="button" onClick={() => handleImportProduct()}>
          <Import />
          Import Products
          {loading && <span className="loader"></span>}
        </Button>
        <ProductCreatePopup />
      </div>
      <div className="grid md:grid-cols-12 gap-3" style={{ overflowY: "auto", maxHeight: "80vh" }} ref={sectionRef}>
        {productList?.map((item, index) => (
          <Card className="col-span-3 min-h-[40vh] p-3 overflow-hidden" key={index}>
            <CardHeader className="bg-muted rounded-lg h-[20vh] mb-2 overflow-hidden flex justify-center items-center  relative p-1">
              <img src={`${item?.image}`} className="object-cover" width={150} height={150} alt="" />
              <div className="px-2 bg-white absolute rounded-lg top-1 left-2 ">
                <p className="text-[12px]">{item?.stock} stock</p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <h6 className="text-1md truncate">{item?.title}</h6>
              <span className="font-bold text-2md truncate">${item?.price}</span>
              <p className="truncate text-sm">{item?.description}</p>
            </CardContent>
            <CardFooter className="p-0 mt-2 flex gap-2">
              <ProductDetailPopup sku={item?.sku} />
              <ProductDeletePopup sku={item?.sku} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
