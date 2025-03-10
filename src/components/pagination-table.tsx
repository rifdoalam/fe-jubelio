"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAdjusment from "@/hooks/use-adjustments";
import { useEffect, useState } from "react";

export function PaginationTable() {
  const { adjustmentLists, handleFetchdata, pagination, setPagination } = useAdjusment();
  const [startIndex, setStartIndex] = useState(1);

  const [endIndex, setEndIndex] = useState(adjustmentLists?.pagination?.totalPages || 5);
  const [isMobile, setIsMobile] = useState(false);
  const totalPages = adjustmentLists?.pagination?.totalPages || 1;

  const updatePagination = () => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
  };

  useEffect(() => {
    handleFetchdata();
    updatePagination(); // Call the function initially
    window.addEventListener("resize", updatePagination); // Update on window resize
    return () => window.removeEventListener("resize", updatePagination);
  }, []);

  useEffect(() => {
    handleFetchdata();
    const visiblePages = isMobile ? 3 : 5; // Show 3 pages on mobile, 5 on desktop
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let newStartIndex = Math.max(1, pagination?.page - halfVisiblePages);
    let newEndIndex = Math.min(totalPages, pagination?.page + halfVisiblePages);

    // Adjust pagination to ensure it doesn't exceed total pages
    if (newEndIndex - newStartIndex + 1 < visiblePages) {
      if (newStartIndex === 1) {
        newEndIndex = Math.min(totalPages, newStartIndex + visiblePages - 1);
      } else {
        newStartIndex = Math.max(1, newEndIndex - visiblePages + 1);
      }
    }
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [pagination?.page, totalPages, isMobile]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${pagination?.page <= 1 ? "pointer-events-none" : ""}`}
            href={`/adjustments`}
            onClick={() => setPagination({ ...pagination, page: pagination?.page - 1 })}
          />
        </PaginationItem>

        {/* Pagination number items */}
        {Array.from({ length: endIndex - startIndex + 1 }).map((_, i) => (
          <PaginationItem key={i + startIndex}>
            <PaginationLink
              href={`/adjustments`}
              onClick={() => setPagination({ ...pagination, page: startIndex + i })}
              isActive={pagination?.page === i + startIndex}>
              {i + startIndex}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endIndex < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={`${pagination?.page >= totalPages ? "pointer-events-none" : ""}`}
            href={`/adjustments`}
            onClick={() => setPagination({ ...pagination, page: pagination?.page + 1 })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
