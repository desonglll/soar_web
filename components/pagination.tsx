"use client";

import { useState, useEffect, useRef } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [inputValue, setInputValue] = useState(String(page));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setInputValue(String(page));
    }
  }, [page]);

  function handleInputCommit() {
    let val = parseInt(inputValue, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > totalPages) val = totalPages;
    setInputValue(String(val));
    if (val !== page) onPageChange(val);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleInputCommit();
  }

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onPageSizeChange(Number(e.target.value));
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded border px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-100"
        >
          Previous
        </button>
        <div className="flex items-center gap-1 text-sm">
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={totalPages}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputCommit}
            onKeyDown={handleKeyDown}
            className="w-14 rounded border px-2 py-1 text-center text-sm"
          />
          <span>of {totalPages}</span>
        </div>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded border px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>Per page:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="rounded border px-2 py-1 text-sm"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span className="text-gray-500">({total} total)</span>
      </div>
    </div>
  );
}
