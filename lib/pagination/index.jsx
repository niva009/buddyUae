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
    <div className="flex rounded-3xl w-fit h-12 text-zinc-700 bg-[#EBEDF4] mt-10 gap-10 items-center">
      <div className="flex gap-3 items-center px-5">
        <button
          style={{
            color: currentPage === 1 ? "#1D589E" : "#00000080",
          }}
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          className="left text-[0.84rem] flex items-center justify-center font-medium"
        >
          <ChevronLeft className="h-5" />
        </button>
        {pageNumbers.map((page) => (
          <button
            style={{
              backgroundColor: currentPage === page ? "#1D589E" : "",
              color: currentPage === page ? "#fff" : "",
            }}
            className="left text-lime-700 h-7 w-7 text-sm flex items-center justify-center rounded-full"
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
          className="right text-[0.84rem] font-medium flex items-center justify-center rounded-full"
        >
          <ChevronRight className="h-5" />
        </button>
      </div>
    </div>
  );
}
