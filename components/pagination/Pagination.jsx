'use Client';

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  setCurrentPage,
  currentPage,
  goToNextPage,
  goToPreviousPage,
  totalPages,
  pageNumbers,
}) {
  return (
    <div className="flex w-fit h-12 lg:mt-10 gap-10 items-center">
      <div className="flex gap-3 items-center">
        <button
          style={{
            color: currentPage === 1 ? "#1D589E" : "#00000080",
          }}
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          className="left text-[0.84rem] border border-gray rounded-md h-9 px-3 flex items-center justify-center font-medium"
        >
          <ChevronLeft className="h-4 -mt-[1px]" /> Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            style={{
              backgroundColor: currentPage === page ? "#0000001A" : "",
              color: currentPage === page ? "#006699" : "#00000080",
            }}
            className="left font-medium h-9 w-9 text-sm flex items-center justify-center rounded-md"
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          style={{
            color: currentPage === totalPages ? "#1D589E" : "#00000080",
          }}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="right text-[0.84rem] border border-gray h-9 px-3 font-medium flex items-center justify-center rounded-md"
        >
          Next <ChevronRight className="h-4 -mt-[1px]" />
        </button>
      </div>
    </div>
  );
}
